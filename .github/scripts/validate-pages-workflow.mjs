#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FULL_SHA_ACTION = /^[^@\s]+@[a-f0-9]{40}$/;

const REQUIRED_SNIPPETS = new Map([
  ["workflow input source_repo", "source_repo:"],
  ["workflow input source_ref_name", "source_ref_name:"],
  ["workflow input source_sha", "source_sha:"],
  ["workflow input source_event", "source_event:"],
  ["workflow input source_run_id", "source_run_id:"],
  ["workflow input source_run_attempt", "source_run_attempt:"],
  ["deny-by-default workflow permissions", "permissions: {}"],
  ["fixed private source repository", "repository: buenhyden/blog-data"],
  ["immutable private source checkout", "ref: ${{ inputs.source_sha }}"],
  ["quiet private source checkout", "show-progress: false"],
  ["source workflow attestation API", "actions/workflows/trigger-pages-build.yml/runs"],
  ["source run success check", '.conclusion == "success"'],
  ["source run event check", '.event == "push"'],
  ["source run branch check", '.head_branch == "main"'],
  ["source run path check", '.path == ".github/workflows/trigger-pages-build.yml"'],
  ["source run SHA check", ".head_sha == $source_sha"],
  ["source run completion wait", "for attestation_attempt in {1..24}"],
  ["private build command", "npm run build:ci"],
  ["private export verification", "npm run verify:export"],
  ["public cache disable", "package-manager-cache: false"],
  ["private log redirection", '>"${PRIVATE_BUILD_LOG}" 2>&1'],
  ["source cleanup", 'rm -rf "${PRIVATE_REPO_DIR}"'],
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
    "upload-pages-artifact v4 excludes hidden entries and does not accept include-hidden-files",
  ],
];

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
  if (uses.length === 0) errors.push("workflow must use pinned official actions");
  for (const use of uses) {
    if (!FULL_SHA_ACTION.test(use)) {
      errors.push(`action is not pinned to a full commit SHA: ${use}`);
    }
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
