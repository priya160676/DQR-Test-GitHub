// .github/scripts/log-deployment.js

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const logFilePath = path.join(process.cwd(), ".github/data/deployments.json");

// Create log entry
const log = {
  deployment_id: `${Date.now()}`,
  repo: process.env.GITHUB_REPOSITORY || "unknown-repo",
  status: getArg("--status") || "unknown",
  rollback: getArg("--rollback") === "true",
  reverted_to: getArg("--reverted_to") || null,
  version: getArg("--version") || "n/a",
  timestamp: new Date().toISOString(),
};

// Read existing logs (if any)
let logs = [];

if (fs.existsSync(logFilePath)) {
  try {
    const existing = fs.readFileSync(logFilePath, "utf-8");
    logs = JSON.parse(existing);
    if (!Array.isArray(logs)) {
      logs = [];
    }
  } catch (err) {
    console.warn("⚠️ Failed to read or parse existing log file. Starting fresh.");
    logs = [];
  }
}

// Append new log and write
logs.push(log);

fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

console.log("✅ Deployment log updated:");
console.log(log);
