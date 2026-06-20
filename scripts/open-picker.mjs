#!/usr/bin/env node
import { execFile } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { platform } from "node:process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = join(scriptDir, "..");
const pickerUrl = pathToFileURL(join(pluginRoot, "index.html")).href;

const opener =
  platform === "darwin"
    ? ["open", [pickerUrl]]
    : platform === "win32"
      ? ["cmd", ["/c", "start", "", pickerUrl]]
      : ["xdg-open", [pickerUrl]];

execFile(opener[0], opener[1], (error) => {
  if (error) {
    console.error(`Open this URL manually: ${pickerUrl}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Opened Worst Model Picker: ${pickerUrl}`);
});
