#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FULL_SHA_ACTION = /^[^@\s]+@[a-f0-9]{40}$/;
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
const EXPECTED_SMOKE_ROUTES = [
  "/",
  "/about/",
  "/about/projects/",
  "/about/experiences/",
  "/about/skills/",
  "/blog/",
  "/series/",
  "/posts/",
  "/til/",
  "/tags/",
  "/categories/",
];
const EXPECTED_JOB_SNIPPETS = new Map([
  [
    "build",
    [
      "Verify successful private source CI run",
      "Upload public Pages artifact only",
      "actions/upload-pages-artifact@",
    ],
  ],
  ["deploy", ["name: github-pages", "actions/deploy-pages@"]],
  [
    "smoke_post_deploy",
    ["Verify core endpoints availability", "ROUTES=(", "curl --fail"],
  ],
]);

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
  return [...permissions]
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
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
  if (uses.length === 0) errors.push("workflow must use pinned official actions");
  for (const use of uses) {
    if (!FULL_SHA_ACTION.test(use)) {
      errors.push(`action is not pinned to a full commit SHA: ${use}`);
    }
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
    const actualNeeds = block.match(/^    needs:\s*([^\s#]+)\s*$/m)?.[1] ?? null;
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
  const smokeRoutes = [
    ...(smokeBlock.match(/ROUTES=\(\s*([\s\S]*?)\s*\)/)?.[1] ?? "").matchAll(
      /^\s*"([^"]+)"\s*$/gm,
    ),
  ].map((match) => match[1]);
  if (
    smokeRoutes.length !== EXPECTED_SMOKE_ROUTES.length ||
    smokeRoutes.some(
      (route, index) => route !== EXPECTED_SMOKE_ROUTES[index],
    )
  ) {
    errors.push(
      `smoke routes must be exactly ${EXPECTED_SMOKE_ROUTES.join(", ")}`,
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
