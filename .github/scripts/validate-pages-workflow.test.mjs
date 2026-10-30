import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateWorkflowText } from "./validate-pages-workflow.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workflowPath = path.resolve(
  scriptDir,
  "../workflows/pages-build-deploy.yml",
);
const validationWorkflowPath = path.resolve(
  scriptDir,
  "../workflows/validate-pages-contract.yml",
);

function readWorkflow() {
  return fs.readFileSync(workflowPath, "utf8");
}

function extractStepScript(text, name) {
  const start = text.indexOf(`      - name: ${name}\n`);
  assert.notEqual(start, -1, `${name} step must exist`);

  const nextStep = text.indexOf("\n      - name:", start + 1);
  const step = text.slice(start, nextStep === -1 ? undefined : nextStep);
  const runMarker = "        run: |\n";
  const runStart = step.indexOf(runMarker);
  assert.notEqual(runStart, -1, "validation step must have a Bash run block");

  return step
    .slice(runStart + runMarker.length)
    .split("\n")
    .map((line) => line.replace(/^ {10}/, ""))
    .join("\n");
}

function runDispatchValidation(sourceWebDir, overrides = {}) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pages-inputs-"));
  const githubEnvPath = path.join(tempDir, "github-env");
  const env = {
    ...process.env,
    PRIVATE_REPO_DIR: "__private_blog_data",
    GITHUB_ENV: githubEnvPath.replaceAll("\\", "/"),
    SOURCE_REPO: "buenhyden/blog-data",
    SOURCE_REF_NAME: "main",
    SOURCE_SHA: "a".repeat(40),
    SOURCE_EVENT: "push",
    SOURCE_RUN_ID: "123",
    SOURCE_RUN_ATTEMPT: "1",
    HTML_SIGNATURE: "quiet-editorial-notebook:v1",
    ...overrides,
  };
  if (sourceWebDir !== undefined) env.SOURCE_WEB_DIR = sourceWebDir;
  else delete env.SOURCE_WEB_DIR;

  try {
    const result = spawnSync(
      "bash",
      ["-c", extractStepScript(readWorkflow(), "Validate dispatch inputs")],
      { env, encoding: "utf8" },
    );
    assert.ifError(result.error);
    assert.equal(result.signal, null);
    assert.ok(
      result.status === 0 || result.status === 1,
      `Bash did not execute validation normally: ${result.status}`,
    );
    const githubEnv = fs.existsSync(githubEnvPath)
      ? fs.readFileSync(githubEnvPath, "utf8")
      : "";
    return { ...result, githubEnv };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("canonical Pages workflow satisfies the private/public contract", () => {
  assert.deepEqual(validateWorkflowText(readWorkflow()), []);
});

test("legacy callers and both supported source web directories select the expected private path", () => {
  const cases = [
    [undefined, "PRIVATE_WEB_DIR=__private_blog_data/web\n"],
    ["", "PRIVATE_WEB_DIR=__private_blog_data/web\n"],
    ["web", "PRIVATE_WEB_DIR=__private_blog_data/web\n"],
    ["site/web", "PRIVATE_WEB_DIR=__private_blog_data/site/web\n"],
  ];

  for (const [sourceWebDir, expectedEnv] of cases) {
    const result = runDispatchValidation(sourceWebDir);
    assert.equal(
      result.status,
      0,
      `expected ${JSON.stringify(sourceWebDir)} to pass: ${result.stderr}`,
    );
    assert.equal(result.githubEnv, expectedEnv);
  }
});

test("absolute, traversal, arbitrary, and shell-significant source web directories are rejected", () => {
  const invalidValues = [
    "/web",
    "../web",
    "site/../web",
    "frontend",
    " web",
    "web ",
    "site\\web",
    "web\nsite/web",
    "web;echo injected",
  ];

  for (const sourceWebDir of invalidValues) {
    const result = runDispatchValidation(sourceWebDir);
    assert.equal(
      result.status,
      1,
      `expected ${JSON.stringify(sourceWebDir)} to fail`,
    );
    assert.equal(result.githubEnv, "");
  }
});

test("source web directory contract rejects missing defaults and weakened validation", () => {
  const missingInput = readWorkflow().replace(
    [
      "      source_web_dir:",
      '        description: "Source web directory"',
      "        required: false",
      '        default: "web"',
      "        type: string",
      "",
    ].join("\n"),
    "",
  );
  assert.ok(
    validateWorkflowText(missingInput).some((error) =>
      error.includes("workflow input source_web_dir"),
    ),
  );

  const wrongDefault = readWorkflow().replace(
    '        default: "web"',
    '        default: "site/web"',
  );
  assert.ok(
    validateWorkflowText(wrongDefault).some((error) =>
      error.includes("source_web_dir default"),
    ),
  );

  const weakenedAllowlist = readWorkflow().replace(
    '[[ "${SOURCE_WEB_DIR}" == "web" || "${SOURCE_WEB_DIR}" == "site/web" ]]',
    '[[ "${SOURCE_WEB_DIR}" == "web" || "${SOURCE_WEB_DIR}" == site/* ]]',
  );
  assert.ok(
    validateWorkflowText(weakenedAllowlist).some((error) =>
      error.includes("source_web_dir allowlist"),
    ),
  );
});

test("source web directory cannot construct a job path before validation", () => {
  const mutant = readWorkflow().replace(
    "      PRIVATE_REPO_DIR: __private_blog_data\n",
    "      PRIVATE_REPO_DIR: __private_blog_data\n" +
      "      PRIVATE_WEB_DIR: __private_blog_data/${{ inputs.source_web_dir }}\n",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("PRIVATE_WEB_DIR must be exported after validation"),
    ),
  );
});

test("source web directory cannot be interpolated directly into validation shell", () => {
  const mutant = readWorkflow().replace(
    'SOURCE_WEB_DIR="${SOURCE_WEB_DIR:-web}"',
    'SOURCE_WEB_DIR="${{ inputs.source_web_dir }}"',
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("direct shell interpolation"),
    ),
  );
});

test("public build, deploy, and smoke permission boundaries cannot be consolidated", () => {
  const renamedJob = readWorkflow().replace(
    "\n  smoke_post_deploy:\n",
    "\n  build_deploy_smoke:\n",
  );
  assert.ok(
    validateWorkflowText(renamedJob).some((error) =>
      error.includes("job ids must be exactly"),
    ),
  );

  const broadenedBuild = readWorkflow().replace(
    "    permissions:\n      contents: read\n",
    "    permissions:\n      contents: read\n      pages: write\n",
  );
  assert.ok(
    validateWorkflowText(broadenedBuild).some((error) =>
      error.includes("build permissions"),
    ),
  );

  const broadenedSmoke = readWorkflow().replace(
    "  smoke_post_deploy:\n    name: Verify deployed provenance and public routes\n    needs: deploy\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    permissions: {}\n",
    "  smoke_post_deploy:\n    name: Verify deployed provenance and public routes\n    needs: deploy\n    runs-on: ubuntu-latest\n    timeout-minutes: 10\n    permissions:\n      contents: read\n",
  );
  assert.ok(
    validateWorkflowText(broadenedSmoke).some((error) =>
      error.includes("smoke_post_deploy permissions"),
    ),
  );

  const deployUse = readWorkflow().match(
    /uses:\s*(actions\/deploy-pages@[a-f0-9]{40})/,
  )?.[1];
  assert.ok(deployUse);
  const movedDeployAction = readWorkflow().replace(
    /uses:\s*actions\/checkout@[a-f0-9]{40}/,
    `uses: ${deployUse}`,
  );
  assert.ok(
    validateWorkflowText(movedDeployAction).some((error) =>
      error.includes("only deploy may invoke"),
    ),
  );
});

test("mutable source branch checkout is rejected", () => {
  const mutant = readWorkflow().replace(
    "ref: ${{ inputs.source_sha }}",
    "ref: ${{ inputs.source_ref_name }}",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("moving branch checkout"),
    ),
  );
});

test("dynamic private repository checkout is rejected", () => {
  const mutant = readWorkflow().replace(
    "repository: buenhyden/blog-data",
    "repository: ${{ inputs.source_repo }}",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("fixed private source repository"),
    ),
  );
});

test("workflow-run listing cannot replace exact run attestation", () => {
  const mutant = readWorkflow().replace(
    "actions/runs/${SOURCE_RUN_ID}",
    "actions/workflows/trigger-pages-build.yml/runs",
  );
  assert.ok(
    validateWorkflowText(mutant).some(
      (error) =>
        error.includes("exact source run attestation API") ||
        error.includes("exact dispatched run"),
    ),
  );
});

test("mutable action tags are rejected", () => {
  const mutant = readWorkflow().replace(
    /actions\/checkout@[a-f0-9]{40}/,
    "actions/checkout@v6",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("not pinned to a full commit SHA"),
    ),
  );
});

test("unapproved full-SHA actions are rejected", () => {
  const mutant = readWorkflow().replace(
    /actions\/deploy-pages@[a-f0-9]{40}/,
    `actions/deploy-pages@${"0".repeat(40)}`,
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("workflow actions must be exactly"),
    ),
  );
});

test("duplicate public quality checks are rejected", () => {
  const mutant = `${readWorkflow()}\n# npm run test:unit\n`;
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("must not duplicate"),
    ),
  );
});

test("smoke routes must match exported public surfaces", () => {
  const staleSearchRoute = readWorkflow().replace(
    '            "/series/|ko"',
    '            "/stale-route/|ko"',
  );
  assert.ok(
    validateWorkflowText(staleSearchRoute).some((error) =>
      error.includes("smoke route records must be exactly"),
    ),
  );
});

test("public rebuild installs Chromium before export verification", () => {
  const command = "npx playwright install --with-deps chromium";
  const withoutInstall = readWorkflow().replace(command, "true");
  assert.ok(
    validateWorkflowText(withoutInstall).some((error) =>
      error.includes("public export browser install"),
    ),
  );

  const movedAfterExport = readWorkflow()
    .replace(command, "true")
    .replace(
      'echo "::error::Export verification failed. Inspect private source run ${ATTESTED_RUN_ID}."',
      `${command}\n            echo "::error::Export verification failed. Inspect private source run \${ATTESTED_RUN_ID}."`,
    );
  assert.ok(
    validateWorkflowText(movedAfterExport).some((error) =>
      error.includes("must be installed before"),
    ),
  );
});

test("repository metadata scan rejects files as well as directories", () => {
  const mutant = readWorkflow().replace(
    'find "${PRIVATE_WEB_DIR}/out" \\',
    'find "${PRIVATE_WEB_DIR}/out" -type d \\',
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("metadata scan must reject files and directories"),
    ),
  );
});

test("artifact cleanup rejects legacy and migrated private directory wrappers", () => {
  const withoutLegacyGuard = readWorkflow().replace(
    'test ! -e "${PAGES_ARTIFACT_DIR}/web"',
    "true # legacy wrapper guard removed",
  );
  assert.ok(
    validateWorkflowText(withoutLegacyGuard).some((error) =>
      error.includes("legacy private directory wrapper exclusion"),
    ),
  );

  const withoutMigratedGuard = readWorkflow().replace(
    'test ! -e "${PAGES_ARTIFACT_DIR}/site/web"',
    "true # migrated wrapper guard removed",
  );
  assert.ok(
    validateWorkflowText(withoutMigratedGuard).some((error) =>
      error.includes("migrated private directory wrapper exclusion"),
    ),
  );
});

test("unsupported hidden-file inputs are rejected", () => {
  const mutant = readWorkflow().replace(
    "retention-days: 1",
    "retention-days: 1\n          include-hidden-files: true",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("must not opt into hidden entries"),
    ),
  );
});

test("public setup cannot cache private dependency metadata", () => {
  const mutant = readWorkflow().replace(
    "package-manager-cache: false",
    "package-manager-cache: true",
  );
  assert.ok(
    validateWorkflowText(mutant).some((error) =>
      error.includes("missing public cache disable"),
    ),
  );
});

test("public contract validation workflow is pinned and secret-free", () => {
  const text = fs.readFileSync(validationWorkflowPath, "utf8");
  const uses = [...text.matchAll(/^\s*uses:\s*([^\s#]+)\s*$/gm)].map(
    (match) => match[1],
  );
  const jobsText = text.slice(text.indexOf("\njobs:\n"));
  const jobIds = [...jobsText.matchAll(/^  ([A-Za-z0-9_-]+):\s*$/gm)].map(
    (match) => match[1],
  );

  assert.deepEqual(jobIds, ["validate"]);
  assert.ok(uses.length > 0);
  for (const use of uses) {
    assert.match(use, /^[^@\s]+@[a-f0-9]{40}$/);
  }
  assert.match(text, /permissions:\n\s+contents: read/);
  assert.match(text, /runs-on: ubuntu-latest/);
  assert.match(text, /package-manager-cache: false/);
  assert.doesNotMatch(text, /secrets\./);
  for (const command of [
    "node --version",
    "bash --version",
    "python3 --version",
    "jq --version",
  ]) {
    assert.ok(
      text.indexOf(command) < text.indexOf("run: node --test"),
      command,
    );
    assert.ok(text.includes(command), command);
  }
});

const sourceSha = "a".repeat(40);
const sourceBefore = "b".repeat(40);
const expectedIdentity = {
  source_repository: "buenhyden/blog-data",
  source_ref_name: "main",
  source_sha: sourceSha,
  source_run_id: "123",
  source_run_attempt: "2",
  builder_repository: "buenhyden/buenhyden.github.io",
  builder_run_id: "456",
  builder_run_attempt: "3",
  html_signature: "quiet-editorial-notebook:v1",
};

function runPredicate(step, fileVariable, args, data, env = process.env) {
  const script = extractStepScript(readWorkflow(), step);
  const match = script.match(
    new RegExp(`\\n\\s*'\\n([\\s\\S]*?)\\n\\s*' "\\$\\{${fileVariable}\\}"`),
  );
  assert.ok(match, `${step} must contain its jq predicate`);
  const options = Object.entries(args).flatMap(([key, value]) => [
    "--arg",
    key,
    value,
  ]);
  const result = spawnSync("jq", ["--exit-status", ...options, match[1]], {
    env,
    input: JSON.stringify(data),
    encoding: "utf8",
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  assert.ok(result.status === 0 || result.status === 1, result.stderr);
  return result.status;
}

function liveManifest() {
  return {
    schemaVersion: 1,
    source: {
      repository: expectedIdentity.source_repository,
      refName: "main",
      sha: sourceSha,
      event: "push",
      runId: "123",
      runAttempt: "2",
    },
    builder: {
      repository: expectedIdentity.builder_repository,
      runId: "456",
      runAttempt: "3",
    },
    artifact: { htmlSignature: expectedIdentity.html_signature },
  };
}

test("live manifest predicate rejects mismatched source and builder attempts", () => {
  const check = (data) =>
    runPredicate(
      "Verify live manifest and HTML identity",
      "LIVE_MANIFEST",
      expectedIdentity,
      data,
    );
  assert.equal(check(liveManifest()), 0);
  for (const group of ["source", "builder"]) {
    for (const attempt of [undefined, "1", 2]) {
      const data = liveManifest();
      data[group].runAttempt = attempt;
      assert.equal(check(data), 1, `${group} attempt ${attempt} must fail`);
    }
  }
});

test("live manifest predicate rejects forged identities and non-push source", () => {
  const changes = [
    ["source", "repository", "other/repo"],
    ["source", "refName", "dev"],
    ["source", "sha", sourceBefore],
    ["source", "runId", "124"],
    ["source", "event", "pull_request"],
    ["builder", "repository", "other/builder"],
    ["builder", "runId", "457"],
    ["artifact", "htmlSignature", "other:v1"],
  ];
  for (const [group, field, value] of changes) {
    const data = liveManifest();
    data[group][field] = value;
    assert.equal(
      runPredicate(
        "Verify live manifest and HTML identity",
        "LIVE_MANIFEST",
        expectedIdentity,
        data,
      ),
      1,
      `${group}.${field}`,
    );
  }
});

test("source attestation predicate rejects forged, failed and cancelled runs", () => {
  const run = {
    repository: { full_name: "buenhyden/blog-data" },
    head_repository: { full_name: "buenhyden/blog-data" },
    status: "completed",
    conclusion: "success",
    event: "push",
    head_branch: "main",
    path: ".github/workflows/trigger-pages-build.yml",
    head_sha: sourceSha,
    id: 123,
    run_attempt: 2,
  };
  const check = (data) =>
    runPredicate(
      "Verify successful private source CI run",
      "SOURCE_ATTESTATION_FILE",
      { source_sha: sourceSha, source_run_id: "123", source_run_attempt: "2" },
      data,
    );
  assert.equal(check(run), 0);
  for (const [key, value] of [
    ["repository", { full_name: "other/repo" }],
    ["head_repository", { full_name: "other/repo" }],
    ["status", "in_progress"],
    ["conclusion", "failure"],
    ["conclusion", "cancelled"],
    ["event", "pull_request"],
    ["head_branch", "dev"],
    ["path", "other.yml"],
    ["head_sha", sourceBefore],
    ["id", 124],
    ["run_attempt", 1],
  ])
    assert.equal(check({ ...run, [key]: value }), 1, key);
});

test("dispatch rejects unapproved repository ref event SHA run attempt and signature", () => {
  for (const overrides of [
    { SOURCE_REPO: "other/repo" },
    { SOURCE_REF_NAME: "dev" },
    { SOURCE_EVENT: "pull_request" },
    { SOURCE_SHA: "main" },
    { SOURCE_RUN_ID: "0" },
    { SOURCE_RUN_ID: "123\n456" },
    { SOURCE_RUN_ATTEMPT: "0" },
    { HTML_SIGNATURE: "other:v1" },
  ]) {
    const result = runDispatchValidation("site/web", overrides);
    assert.equal(result.status, 1);
    assert.equal(result.githubEnv, "");
  }
});

test("workflow validator rejects removal of exact context and attempt boundaries", () => {
  const original = readWorkflow();
  const start = original.indexOf(
    "      - name: Retrieve exact private source context\n",
  );
  const end = original.indexOf(
    "      - name: Checkout exact private source commit\n",
    start,
  );
  const withoutContext = original.slice(0, start) + original.slice(end);
  assert.ok(
    validateWorkflowText(withoutContext).some((x) =>
      x.includes("source context"),
    ),
  );
  for (const boundary of [
    '.head_repository.full_name == "buenhyden/blog-data" and',
    "(.run_attempt | tostring) == $source_run_attempt",
    ".source.runAttempt == $source_run_attempt and",
    ".builder.runAttempt == $builder_run_attempt and",
  ]) {
    assert.ok(original.includes(boundary), boundary);
    assert.ok(
      validateWorkflowText(original.replace(boundary, "true")).length > 0,
      boundary,
    );
  }
});

test("workflow validator rejects shell interpolation of every dispatch input", () => {
  for (const input of [
    "source_repo",
    "source_ref_name",
    "source_sha",
    "source_event",
    "source_run_id",
    "source_run_attempt",
    "html_signature",
  ]) {
    const mutant = readWorkflow().replace(
      "          set -euo pipefail",
      `          set -euo pipefail\n          echo "\${{ inputs.${input} }}"`,
    );
    assert.ok(
      validateWorkflowText(mutant).some((x) =>
        x.includes("shell interpolation"),
      ),
      input,
    );
  }
});

test("workflow validator requires canonical HTTP status, time bounds and retry identity bindings", () => {
  const original = readWorkflow();
  for (const boundary of [
    '[[ "${MANIFEST_STATUS}" == "200" ]]',
    '[[ "${ROUTE_STATUS}" == "200" ]]',
    "SOURCE_RUN_ATTEMPT: ${{ inputs.source_run_attempt }}",
    "BUILDER_RUN_ATTEMPT: ${{ github.run_attempt }}",
    "--connect-timeout 10 --max-time 30",
  ]) {
    const smokeStart = original.indexOf("  smoke_post_deploy:");
    const mutant =
      original.slice(0, smokeStart) +
      original.slice(smokeStart).replace(boundary, "");
    assert.ok(mutant !== original, boundary);
    assert.ok(validateWorkflowText(mutant).length > 0, boundary);
  }
});

test("workflow validator preserves context digest workflow revision and actual upload identity", () => {
  const original = readWorkflow();
  for (const boundary of [
    "SOURCE_CONTEXT_FILE: ${{ runner.temp }}/source-context.json",
    "BUILDER_WORKFLOW_REVISION: ${{ github.workflow_sha }}",
    'sha256sum "${SOURCE_CONTEXT_FILE}"',
    "id: pages_artifact",
    "ARTIFACT_ID: ${{ steps.pages_artifact.outputs.artifact_id }}",
  ]) {
    const mutant = original.replaceAll(boundary, "");
    assert.ok(mutant !== original, boundary);
    assert.ok(validateWorkflowText(mutant).length > 0, boundary);
  }
});

test("workflow validator rejects disabled context guards cleanup and failure propagation", () => {
  for (const boundary of [
    "object_pairs_hook=unique",
    ".total_count <= 100 and ($matches | length) == 1",
    ".expired == false and .size_in_bytes <= 16384",
    ".workflow_run.head_sha == env.SOURCE_SHA",
    'len(entries) != 1 or entries[0].filename != "source-context.json"',
    "entry.file_size > 2048 or stat.S_ISLNK",
    'type(data.get("schema_version")) is not int',
    'set(data) != set(expected) | {"source_before"}',
    'before == "0" * 40 or before == data["source_sha"]',
    "        if: always()\n",
  ]) {
    const original = readWorkflow();
    assert.ok(original.includes(boundary), boundary);
    assert.ok(
      validateWorkflowText(original.replace(boundary, "")).length > 0,
      boundary,
    );
  }
  for (const extra of ["    continue-on-error: true\n", "    if: always()\n"]) {
    const mutant = readWorkflow().replace("  deploy:\n", "  deploy:\n" + extra);
    assert.ok(validateWorkflowText(mutant).length > 0, extra);
  }
  const mutant = readWorkflow().replace(
    "      - name: Retrieve exact private source context\n",
    "      - name: Retrieve exact private source context\n        if: false\n",
  );
  assert.ok(validateWorkflowText(mutant).length > 0);
});

test("live smoke executes exact HTTP and retry identity rejection with synthetic responses", () => {
  const prefix = `
sleep() { :; }
curl() {
  local output="" url="" write_status=0 fail=0 status file
  while [[ "$#" -gt 0 ]]; do
    case "$1" in
      --output) output="$2"; shift 2 ;;
      --write-out) write_status=1; shift 2 ;;
      --fail) fail=1; shift ;;
      --silent|--show-error) shift ;;
      -H|--connect-timeout|--max-time) shift 2 ;;
      https:*) url="$1"; shift ;;
      *) return 2 ;;
    esac
  done
  case "$url" in
    */build-manifest.json) status="$MOCK_MANIFEST_STATUS"; file=manifest.json ;;
    */definitely-missing-redesign-route/) status="$MOCK_MISSING_STATUS"; file=ko.html ;;
    */en/*) status="$MOCK_ROUTE_STATUS"; file=en.html ;;
    *) status="$MOCK_ROUTE_STATUS"; file=ko.html ;;
  esac
  cp "$FIXTURE_DIR/$file" "$output"
  if [[ "$write_status" -eq 1 ]]; then printf '%s' "$status"; fi
  if [[ "$fail" -eq 1 && "$status" -ge 400 ]]; then return 22; fi
}
`;
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pages-live-"));
  try {
    for (const lang of ["ko", "en"])
      fs.writeFileSync(
        path.join(tempDir, `${lang}.html`),
        `<html lang="${lang}" data-site-signature="quiet-editorial-notebook:v1" data-source-sha="${sourceSha}">` +
          `<meta name="blog-source-sha" content="${sourceSha}"></html>`,
      );
    for (const change of [
      {},
      { MOCK_MANIFEST_STATUS: "301" },
      { MOCK_ROUTE_STATUS: "204" },
      { MOCK_ROUTE_STATUS: "302" },
      { MOCK_MISSING_STATUS: "200" },
      { wrongAttempt: true },
    ]) {
      const manifest = liveManifest();
      if (change.wrongAttempt) manifest.builder.runAttempt = "1";
      fs.writeFileSync(
        path.join(tempDir, "manifest.json"),
        JSON.stringify(manifest),
      );
      const result = spawnSync(
        "bash",
        [
          "-c",
          prefix +
            extractStepScript(
              readWorkflow(),
              "Verify live manifest and HTML identity",
            ),
        ],
        {
          encoding: "utf8",
          timeout: 10000,
          env: {
            ...process.env,
            SOURCE_REPOSITORY: expectedIdentity.source_repository,
            SOURCE_REF_NAME: "main",
            SOURCE_SHA: sourceSha,
            SOURCE_RUN_ID: "123",
            SOURCE_RUN_ATTEMPT: "2",
            BUILDER_REPOSITORY: expectedIdentity.builder_repository,
            BUILDER_RUN_ID: "456",
            BUILDER_RUN_ATTEMPT: "3",
            HTML_SIGNATURE: expectedIdentity.html_signature,
            RUNNER_TEMP: tempDir.replaceAll("\\", "/"),
            FIXTURE_DIR: tempDir.replaceAll("\\", "/"),
            GITHUB_STEP_SUMMARY: path
              .join(tempDir, "summary")
              .replaceAll("\\", "/"),
            MOCK_MANIFEST_STATUS: "200",
            MOCK_ROUTE_STATUS: "200",
            MOCK_MISSING_STATUS: "404",
            ...change,
          },
        },
      );
      assert.ifError(result.error);
      assert.equal(result.signal, null);
      assert.equal(
        result.status,
        Object.keys(change).length === 0 ? 0 : 1,
        result.stderr,
      );
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("exact source context accepts producer schema and rejects malformed archives and tuples", () => {
  const script = extractStepScript(
    readWorkflow(),
    "Retrieve exact private source context",
  );
  const validator = script.match(/python3 - <<'PY'\n([\s\S]*?)\nPY/)?.[1];
  assert.ok(validator);
  const context = {
    schema_version: 1,
    source_repository: "buenhyden/blog-data",
    event: "push",
    ref: "refs/heads/main",
    source_sha: sourceSha,
    source_before: sourceBefore,
    source_run_id: "123",
    source_run_attempt: "2",
  };
  const raw = JSON.stringify(context);
  const fixtures = [
    { raw, valid: true },
    ...Object.entries({
      schema_version: true,
      source_repository: "other/repo",
      event: "pull_request",
      ref: "refs/heads/dev",
      source_sha: sourceBefore,
      source_run_id: "124",
      source_run_attempt: "1",
      source_before: "0".repeat(40),
    }).map(([key, value]) => ({
      raw: JSON.stringify({ ...context, [key]: value }),
    })),
    { raw: JSON.stringify({ ...context, source_before: sourceSha }) },
    { raw: JSON.stringify({ ...context, source_before: "main" }) },
    { raw: JSON.stringify({ ...context, unexpected: true }) },
    {
      raw: raw.replace(
        '"schema_version":1',
        '"schema_version":1,"schema_version":1',
      ),
    },
    { raw: "[]" },
    { raw: raw + " ".repeat(2049) },
    { raw, name: "../source-context.json" },
    { raw, name: "/source-context.json" },
    { raw, duplicate: true },
    { raw, mode: 0o120777 },
    { raw, mode: 0o40755 },
  ];
  for (const fixture of fixtures) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pages-context-"));
    const output = path.join(tempDir, "context.json");
    try {
      const result = spawnSync(
        process.platform === "win32" ? "python" : "python3",
        [
          "-c",
          [
            "import json, os, sys, zipfile",
            "fixture = json.loads(sys.stdin.read())",
            "entry = zipfile.ZipInfo(fixture.get('name', 'source-context.json'))",
            "entry.create_system = 3",
            "entry.external_attr = fixture.get('mode', 0o100644) << 16",
            "with zipfile.ZipFile(os.environ['SOURCE_CONTEXT_ZIP'], 'w') as archive:",
            "    archive.writestr(entry, fixture['raw'])",
            "    if fixture.get('duplicate'): archive.writestr(entry, fixture['raw'])",
            validator,
          ].join("\n"),
        ],
        {
          encoding: "utf8",
          input: JSON.stringify(fixture),
          env: {
            ...process.env,
            SOURCE_SHA: sourceSha,
            SOURCE_RUN_ID: "123",
            SOURCE_RUN_ATTEMPT: "2",
            SOURCE_CONTEXT_ZIP: path.join(tempDir, "context.zip"),
            SOURCE_CONTEXT_FILE: output,
          },
        },
      );
      assert.ifError(result.error);
      assert.equal(result.signal, null);
      assert.equal(result.status, fixture.valid ? 0 : 1, result.stderr);
      if (fixture.valid) assert.equal(fs.readFileSync(output, "utf8"), raw);
      else {
        assert.match(result.stderr, /ValueError/);
        assert.equal(fs.existsSync(output), false);
      }
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
});
