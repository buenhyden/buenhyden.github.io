#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FULL_SHA_ACTION = /^[^@\s]+@[a-f0-9]{40}$/;
const EXPECTED_ACTION_USES = [
  "actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803",
  "actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38",
  "actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9",
  "actions/deploy-pages@cd2ce8fcbc39b97be8ca5fce6e763baed58fa128",
];
const EXPECTED_JOB_PERMISSIONS = new Map([
  ["build", new Map([["contents", "read"]])],
  [
    "deploy",
    new Map([
      ["pages", "write"],
      ["id-token", "write"],
    ]),
  ],
  ["smoke_post_deploy", new Map()],
]);
const EXPECTED_JOB_NEEDS = new Map([
  ["build", null],
  ["deploy", "build"],
  ["smoke_post_deploy", "deploy"],
]);
const EXPECTED_SMOKE_ROUTE_RECORDS = [
  "/|ko",
  "/posts/|ko",
  "/blog/|ko",
  "/til/|ko",
  "/search/|ko",
  "/about/|ko",
  "/categories/|ko",
  "/tags/|ko",
  "/series/|ko",
  "/en/search/|en",
];
const EXPECTED_JOB_SNIPPETS = new Map([
  [
    "build",
    [
      "Verify successful private source CI run",
      "Install export verification browser quietly",
      "Upload public Pages artifact only",
      "actions/upload-pages-artifact@",
    ],
  ],
  ["deploy", ["name: github-pages", "actions/deploy-pages@"]],
  [
    "smoke_post_deploy",
    [
      "Verify live manifest and HTML identity",
      "build-manifest.json",
      "data-site-signature",
      "data-source-sha",
      "ROUTES=(",
      "curl --fail",
    ],
  ],
]);

// These checks bind the existing executable guards to their owning steps.
// Behavioral fixtures below the workflow boundary exercise the actual jq/Python.
const REQUIRED_STEP_BOUNDARIES = new Map([
  [
    "Verify successful private source CI run",
    [
      '.repository.full_name == "buenhyden/blog-data" and',
      '.head_repository.full_name == "buenhyden/blog-data" and',
      '.status == "completed" and',
      "(.id | tostring) == $source_run_id and",
      "(.run_attempt | tostring) == $source_run_attempt",
    ],
  ],
  [
    "Retrieve exact private source context",
    [
      'ARTIFACT_NAME="source-context-${SOURCE_RUN_ID}-${SOURCE_RUN_ATTEMPT}"',
      ".total_count <= 100 and ($matches | length) == 1",
      ".expired == false and .size_in_bytes <= 16384",
      "(.workflow_run.id | tostring) == env.SOURCE_RUN_ID",
      ".workflow_run.head_sha == env.SOURCE_SHA",
      "--max-filesize 16384",
      'len(entries) != 1 or entries[0].filename != "source-context.json"',
      "entry.file_size > 2048 or stat.S_ISLNK",
      "stat.S_ISDIR(entry.external_attr >> 16)",
      'raise ValueError("duplicate source context key")',
      "object_pairs_hook=unique",
      'type(data.get("schema_version")) is not int',
      'set(data) != set(expected) | {"source_before"}',
      "any(data[key] != value for key, value in expected.items())",
      're.fullmatch(r"[0-9a-f]{40}", before)',
      'before == "0" * 40 or before == data["source_sha"]',
    ],
  ],
  [
    "Record verified deployment identity",
    [
      "SOURCE_CONTEXT_FILE: ${{ runner.temp }}/source-context.json",
      "BUILDER_WORKFLOW_REVISION: ${{ github.workflow_sha }}",
      'sha256sum "${SOURCE_CONTEXT_FILE}"',
      "Source context JSON SHA-256:",
      "Builder workflow revision:",
    ],
  ],
  ["Upload public Pages artifact only", ["id: pages_artifact"]],
  [
    "Record uploaded Pages artifact identity",
    [
      "ARTIFACT_ID: ${{ steps.pages_artifact.outputs.artifact_id }}",
      '[[ "${ARTIFACT_ID}" =~ ^[1-9][0-9]*$ ]]',
      "Pages upload artifact ID:",
    ],
  ],
]);

const REQUIRED_SNIPPETS = new Map([
  ["workflow input source_repo", "source_repo:"],
  ["workflow input source_ref_name", "source_ref_name:"],
  ["workflow input source_sha", "source_sha:"],
  ["workflow input source_event", "source_event:"],
  ["workflow input source_run_id", "source_run_id:"],
  ["workflow input source_run_attempt", "source_run_attempt:"],
  ["workflow input html_signature", "html_signature:"],
  ["deny-by-default workflow permissions", "permissions: {}"],
  ["fixed private source repository", "repository: buenhyden/blog-data"],
  ["immutable private source checkout", "ref: ${{ inputs.source_sha }}"],
  ["quiet private source checkout", "show-progress: false"],
  ["exact source run attestation API", "actions/runs/${SOURCE_RUN_ID}"],
  ["source run success check", '.conclusion == "success"'],
  ["source run event check", '.event == "push"'],
  ["source run branch check", '.head_branch == "main"'],
  [
    "source run path check",
    '.path == ".github/workflows/trigger-pages-build.yml"',
  ],
  ["source run SHA check", ".head_sha == $source_sha"],
  ["source run completion wait", "for attestation_attempt in {1..24}"],
  [
    "exact source checkout verification",
    'test "$(git rev-parse HEAD)" = "${SOURCE_SHA}"',
  ],
  ["private build command", "npm run build:ci"],
  ["build manifest command", "npm run build:manifest"],
  ["deployment provenance verification", "npm run verify:provenance"],
  ["HTML signature verification", "npm run verify:html-signature"],
  [
    "public export browser install",
    "npx playwright install --with-deps chromium",
  ],
  ["private export verification", "npm run verify:export"],
  ["public cache disable", "package-manager-cache: false"],
  ["private log redirection", '>"${PRIVATE_BUILD_LOG}" 2>&1'],
  ["source cleanup", 'rm -rf "${PRIVATE_REPO_DIR}"'],
  [
    "legacy private directory wrapper exclusion",
    'test ! -e "${PAGES_ARTIFACT_DIR}/web"',
  ],
  [
    "migrated private directory wrapper exclusion",
    'test ! -e "${PAGES_ARTIFACT_DIR}/site/web"',
  ],
  ["Pages upload permission", "contents: read"],
  ["Pages deploy permission", "pages: write"],
  ["Pages OIDC permission", "id-token: write"],
  ["Pages environment", "name: github-pages"],
  ["cross-repository read secret", "secrets.BLOG_DEPLOY_TOKEN"],
]);

const FORBIDDEN_PATTERNS = [
  [
    /ref:\s*\$\{\{\s*inputs\.source_ref_name\s*\}\}/,
    "moving branch checkout is forbidden; checkout source_sha",
  ],
  [
    /\b(?:npm run lint|npm run typecheck|npm run test:unit)\b/,
    "public workflow must not duplicate private quality-gate commands",
  ],
  [
    /\becho\s+["']?(?:expected|actual)=/i,
    "public logs must not print private checkout diagnostics",
  ],
  [
    /find\s+"\$\{PRIVATE_WEB_DIR\}\/out"\s+-type\s+d/,
    "repository metadata scan must reject files and directories",
  ],
  [
    /include-hidden-files|touch\s+.*\.nojekyll/,
    "Pages artifacts must not opt into hidden entries or synthesize .nojekyll",
  ],
  [
    /actions\/workflows\/trigger-pages-build\.yml\/runs/,
    "source attestation must read the exact dispatched run instead of listing workflow runs",
  ],
];

function extractJobBlocks(text) {
  const blocks = new Map();
  let inJobs = false;
  let currentJob = null;

  for (const line of text.split(/\r?\n/)) {
    if (line === "jobs:") {
      inJobs = true;
      continue;
    }
    if (!inJobs) continue;
    if (/^[A-Za-z_][A-Za-z0-9_-]*:\s*$/.test(line)) break;

    const jobMatch = line.match(/^  ([A-Za-z0-9_-]+):\s*$/);
    if (jobMatch) {
      currentJob = jobMatch[1];
      blocks.set(currentJob, []);
      continue;
    }
    if (currentJob) blocks.get(currentJob).push(line);
  }

  return new Map(
    [...blocks].map(([jobId, lines]) => [jobId, lines.join("\n")]),
  );
}

function extractWorkflowInputBlock(text, inputName) {
  const escapedName = inputName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    text.match(
      new RegExp(
        `^      ${escapedName}:\\s*\\r?\\n((?:^        .*\\r?\\n?)*)`,
        "m",
      ),
    )?.[1] ?? null
  );
}

function extractNamedStepBlock(jobBlock, stepName) {
  const marker = `      - name: ${stepName}`;
  const start = jobBlock.indexOf(marker);
  if (start === -1) return null;

  const nextStep = jobBlock.indexOf("\n      - name:", start + marker.length);
  return jobBlock.slice(start, nextStep === -1 ? undefined : nextStep);
}

function extractRunBlock(stepBlock) {
  const marker = "        run: |\n";
  const start = stepBlock?.indexOf(marker) ?? -1;
  return start === -1 ? null : stepBlock.slice(start + marker.length);
}

function readJobPermissions(block) {
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) =>
    /^    permissions:(?:\s*\{\})?\s*$/.test(line),
  );
  if (start === -1) return null;
  if (/\{\}/.test(lines[start])) return new Map();

  const permissions = new Map();
  for (const line of lines.slice(start + 1)) {
    const match = line.match(/^      ([A-Za-z0-9_-]+):\s*(\S+)\s*$/);
    if (!match) break;
    permissions.set(match[1], match[2]);
  }
  return permissions;
}

function sameEntries(actual, expected) {
  return (
    actual instanceof Map &&
    actual.size === expected.size &&
    [...expected].every(([key, value]) => actual.get(key) === value)
  );
}

function formatPermissions(permissions) {
  if (permissions.size === 0) return "empty";
  return [...permissions].map(([key, value]) => `${key}: ${value}`).join(", ");
}

export function validateWorkflowText(text) {
  const errors = [];

  for (const [label, snippet] of REQUIRED_SNIPPETS) {
    if (!text.includes(snippet)) errors.push(`missing ${label}: ${snippet}`);
  }

  for (const [pattern, message] of FORBIDDEN_PATTERNS) {
    if (pattern.test(text)) errors.push(message);
  }

  const uses = [...text.matchAll(/^\s*uses:\s*([^\s#]+)\s*$/gm)].map(
    (match) => match[1],
  );
  if (uses.length === 0)
    errors.push("workflow must use pinned official actions");
  for (const use of uses) {
    if (!FULL_SHA_ACTION.test(use)) {
      errors.push(`action is not pinned to a full commit SHA: ${use}`);
    }
  }
  if (
    uses.length !== EXPECTED_ACTION_USES.length ||
    uses.some((use, index) => use !== EXPECTED_ACTION_USES[index])
  ) {
    errors.push(
      `workflow actions must be exactly ${EXPECTED_ACTION_USES.join(", ")}`,
    );
  }

  const jobBlocks = extractJobBlocks(text);
  const actualJobIds = [...jobBlocks.keys()];
  const expectedJobIds = [...EXPECTED_JOB_PERMISSIONS.keys()];
  if (
    actualJobIds.length !== expectedJobIds.length ||
    actualJobIds.some((jobId, index) => jobId !== expectedJobIds[index])
  ) {
    errors.push(`job ids must be exactly ${expectedJobIds.join(", ")}`);
  }

  for (const [jobId, expectedPermissions] of EXPECTED_JOB_PERMISSIONS) {
    const block = jobBlocks.get(jobId);
    if (block === undefined) continue;

    const actualPermissions = readJobPermissions(block);
    if (!sameEntries(actualPermissions, expectedPermissions)) {
      errors.push(
        `${jobId} permissions must be exactly ${formatPermissions(expectedPermissions)}`,
      );
    }

    const expectedNeeds = EXPECTED_JOB_NEEDS.get(jobId);
    const actualNeeds =
      block.match(/^    needs:\s*([^\s#]+)\s*$/m)?.[1] ?? null;
    if (actualNeeds !== expectedNeeds) {
      errors.push(
        `${jobId} needs must be ${expectedNeeds ?? "absent"}; got ${actualNeeds ?? "absent"}`,
      );
    }

    if (jobId !== "build" && block.includes("secrets.")) {
      errors.push(`${jobId} must not receive repository secrets`);
    }

    for (const snippet of EXPECTED_JOB_SNIPPETS.get(jobId) ?? []) {
      if (!block.includes(snippet)) {
        errors.push(`${jobId} is missing required boundary step: ${snippet}`);
      }
    }
  }

  const buildBlock = jobBlocks.get("build") ?? "";
  const deployBlock = jobBlocks.get("deploy") ?? "";
  const smokeBlock = jobBlocks.get("smoke_post_deploy") ?? "";
  for (const [name, snippets] of REQUIRED_STEP_BOUNDARIES) {
    const step = extractNamedStepBlock(buildBlock, name);
    for (const snippet of snippets) {
      if (!step?.includes(snippet)) {
        errors.push(`missing ${name} boundary: ${snippet}`);
      }
    }
  }
  const orderedSteps = [
    "Validate dispatch inputs",
    "Verify successful private source CI run",
    "Retrieve exact private source context",
    "Checkout exact private source commit",
    "Rebuild attested source without public logs",
    "Prepare public Pages artifact",
    "Record verified deployment identity",
    "Remove private source before artifact upload",
    "Upload public Pages artifact only",
    "Record uploaded Pages artifact identity",
    "Final cleanup",
  ];
  let previousStep = -1;
  for (const name of orderedSteps) {
    const index = buildBlock.indexOf(`      - name: ${name}\n`);
    if (index <= previousStep)
      errors.push(`source context/build boundary order: ${name}`);
    previousStep = index;
  }
  for (const [jobId, block] of jobBlocks) {
    if (/^\s+continue-on-error:/m.test(block) || /^    if:/m.test(block)) {
      errors.push(`${jobId} must retain default failure propagation`);
    }
    for (const step of block.split(/(?=^      - name:)/m)) {
      const run = extractRunBlock(step);
      if (run && /\$\{\{/.test(run)) {
        errors.push(
          `${jobId} direct shell interpolation is forbidden; use env bindings`,
        );
      }
      if (
        /^        if:/m.test(step) &&
        !step.startsWith("      - name: Final cleanup\n")
      ) {
        errors.push(`${jobId} boundary steps must execute on success`);
      }
    }
  }
  const cleanupStep = extractNamedStepBlock(buildBlock, "Final cleanup");
  if (!cleanupStep?.includes("        if: always()\n")) {
    errors.push("final private cleanup must run with always()");
  }
  const liveStep =
    extractNamedStepBlock(
      smokeBlock,
      "Verify live manifest and HTML identity",
    ) ?? "";
  for (const snippet of [
    "SOURCE_RUN_ATTEMPT: ${{ inputs.source_run_attempt }}",
    "BUILDER_RUN_ATTEMPT: ${{ github.run_attempt }}",
    '--arg source_run_attempt "${SOURCE_RUN_ATTEMPT}"',
    '--arg builder_run_attempt "${BUILDER_RUN_ATTEMPT}"',
    '.source.event == "push" and',
    ".source.runAttempt == $source_run_attempt and",
    ".builder.runAttempt == $builder_run_attempt and",
    '[[ "${MANIFEST_STATUS}" == "200" ]]',
    '[[ "${ROUTE_STATUS}" == "200" ]]',
    '[[ "${NOT_FOUND_STATUS}" == "404" ]]',
    "--connect-timeout 10 --max-time 30",
    '-H "Cache-Control: no-cache"',
  ]) {
    if (!liveStep.includes(snippet))
      errors.push(`missing live identity boundary: ${snippet}`);
  }
  if (/--location|(?:^|\s)-L(?:\s|$)/m.test(liveStep)) {
    errors.push("live canonical status must not follow redirects");
  }
  const liveRun = extractRunBlock(liveStep) ?? "";
  const liveRequests = [
    ...liveRun.matchAll(/\bcurl\b([\s\S]*?)(?:\)"|\n\s*\))/g),
  ];
  if (
    liveRequests.length !== 3 ||
    liveRequests.some(
      ([, request]) =>
        !request.includes("--connect-timeout 10 --max-time 30") ||
        !request.includes('-H "Cache-Control: no-cache"') ||
        !request.includes('--write-out "%{http_code}"'),
    )
  ) {
    errors.push("every live request must be bounded and check its HTTP status");
  }
  const sourceWebDirInput = extractWorkflowInputBlock(text, "source_web_dir");
  if (sourceWebDirInput === null) {
    errors.push("missing workflow input source_web_dir");
  } else {
    if (!/^        required: false\s*$/m.test(sourceWebDirInput)) {
      errors.push("source_web_dir must be optional");
    }
    if (!/^        default: "web"\s*$/m.test(sourceWebDirInput)) {
      errors.push('source_web_dir default must be exactly "web"');
    }
    if (!/^        type: string\s*$/m.test(sourceWebDirInput)) {
      errors.push("source_web_dir type must be string");
    }
  }

  if (/^\s+PRIVATE_WEB_DIR:/m.test(text)) {
    errors.push("PRIVATE_WEB_DIR must be exported after validation");
  }

  const validationStep = extractNamedStepBlock(
    buildBlock,
    "Validate dispatch inputs",
  );
  const validationRun = extractRunBlock(validationStep);
  const sourceWebDirEnvBinding =
    "          SOURCE_WEB_DIR: ${{ inputs.source_web_dir }}";
  if (!validationStep?.includes(sourceWebDirEnvBinding)) {
    errors.push("source_web_dir must use the validation step env binding");
  }
  const sourceWebDirExpressionLines = text
    .split(/\r?\n/)
    .filter((line) => line.includes("${{ inputs.source_web_dir }}"));
  if (
    sourceWebDirExpressionLines.some((line) => line !== sourceWebDirEnvBinding)
  ) {
    errors.push("source_web_dir direct shell interpolation is forbidden");
  }

  const sourceWebDirFallback = 'SOURCE_WEB_DIR="${SOURCE_WEB_DIR:-web}"';
  const sourceWebDirAllowlist =
    '[[ "${SOURCE_WEB_DIR}" == "web" || "${SOURCE_WEB_DIR}" == "site/web" ]]';
  const privateWebDirExport =
    'echo "PRIVATE_WEB_DIR=${PRIVATE_REPO_DIR}/${SOURCE_WEB_DIR}" >> "${GITHUB_ENV}"';
  const fallbackIndex = validationRun?.indexOf(sourceWebDirFallback) ?? -1;
  const allowlistIndex = validationRun?.indexOf(sourceWebDirAllowlist) ?? -1;
  const exportIndex = validationRun?.indexOf(privateWebDirExport) ?? -1;
  if (fallbackIndex === -1) {
    errors.push("source_web_dir must fall back to web when missing or empty");
  }
  if (allowlistIndex === -1) {
    errors.push("source_web_dir allowlist must be exactly web and site/web");
  }
  if (exportIndex === -1) {
    errors.push("PRIVATE_WEB_DIR must derive from validated source_web_dir");
  }
  if (
    fallbackIndex !== -1 &&
    allowlistIndex !== -1 &&
    exportIndex !== -1 &&
    !(fallbackIndex < allowlistIndex && allowlistIndex < exportIndex)
  ) {
    errors.push("PRIVATE_WEB_DIR must be exported after validation");
  }

  const smokeRouteRecords = [
    ...(smokeBlock.match(/ROUTES=\(\s*([\s\S]*?)\s*\)/)?.[1] ?? "").matchAll(
      /^\s*"([^"]+)"\s*$/gm,
    ),
  ].map((match) => match[1]);
  if (
    smokeRouteRecords.length !== EXPECTED_SMOKE_ROUTE_RECORDS.length ||
    smokeRouteRecords.some(
      (record, index) => record !== EXPECTED_SMOKE_ROUTE_RECORDS[index],
    )
  ) {
    errors.push(
      `smoke route records must be exactly ${EXPECTED_SMOKE_ROUTE_RECORDS.join(", ")}`,
    );
  }
  const browserInstallIndex = buildBlock.indexOf(
    "npx playwright install --with-deps chromium",
  );
  const exportVerificationIndex = buildBlock.indexOf("npm run verify:export");
  if (
    browserInstallIndex === -1 ||
    exportVerificationIndex === -1 ||
    browserInstallIndex >= exportVerificationIndex
  ) {
    errors.push(
      "public export verification browser must be installed before npm run verify:export",
    );
  }
  if (
    deployBlock.includes("actions/upload-pages-artifact@") ||
    smokeBlock.includes("actions/upload-pages-artifact@")
  ) {
    errors.push("only build may upload the Pages artifact");
  }
  if (
    buildBlock.includes("actions/deploy-pages@") ||
    smokeBlock.includes("actions/deploy-pages@")
  ) {
    errors.push("only deploy may invoke actions/deploy-pages");
  }

  return errors;
}

export function validateWorkflowFile(workflowPath) {
  return validateWorkflowText(fs.readFileSync(workflowPath, "utf8"));
}

function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const defaultWorkflow = path.resolve(
    scriptDir,
    "../workflows/pages-build-deploy.yml",
  );
  const workflowPath = path.resolve(process.argv[2] ?? defaultWorkflow);
  const errors = validateWorkflowFile(workflowPath);

  if (errors.length > 0) {
    for (const error of errors) console.error(`${workflowPath}: ${error}`);
    process.exit(1);
  }

  console.log(`Pages workflow policy: PASS (${workflowPath})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
