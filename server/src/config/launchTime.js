import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const launchFilePath = path.join(__dirname, "launch-time.txt");

let launchTime;

if (fs.existsSync(launchFilePath)) {
  const raw = fs.readFileSync(launchFilePath, "utf-8");
  launchTime = new Date(raw);
} else {
  launchTime = new Date();
  fs.writeFileSync(launchFilePath, launchTime.toISOString());
}

export function getLaunchTime() {
  return launchTime;
}

