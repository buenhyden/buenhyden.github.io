import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
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

test("canonical Pages workflow satisfies the private/public contract", () => {
  assert.deepEqual(validateWorkflowText(readWorkflow()), []);
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
});
