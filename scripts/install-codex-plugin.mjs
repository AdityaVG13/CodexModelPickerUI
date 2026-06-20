#!/usr/bin/env node
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const pluginName = "worst-model-picker";
const home = homedir();
const pluginsDir = join(home, "plugins");
const pluginDir = join(pluginsDir, pluginName);
const marketplacePath = join(home, ".agents", "plugins", "marketplace.json");
const packagedPaths = [
  ".codex-plugin",
  "assets",
  "skills",
  "scripts",
  "README.md",
  "index.html",
  "demo.gif",
  "install-codex-plugin.sh"
];

async function readMarketplace() {
  try {
    return JSON.parse(await readFile(marketplacePath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return {
      name: "personal",
      interface: {
        displayName: "Personal"
      },
      plugins: []
    };
  }
}

await mkdir(pluginsDir, { recursive: true });
await mkdir(dirname(marketplacePath), { recursive: true });
await rm(pluginDir, { recursive: true, force: true });
await mkdir(pluginDir, { recursive: true });

for (const relativePath of packagedPaths) {
  await cp(join(repoRoot, relativePath), join(pluginDir, relativePath), {
    recursive: true,
    force: true
  });
}

const marketplace = await readMarketplace();
marketplace.interface ??= { displayName: "Personal" };
marketplace.plugins ??= [];

const entry = {
  name: pluginName,
  source: {
    source: "local",
    path: `./plugins/${pluginName}`
  },
  policy: {
    installation: "AVAILABLE",
    authentication: "ON_INSTALL"
  },
  category: "Fun"
};

const existingIndex = marketplace.plugins.findIndex((plugin) => plugin.name === pluginName);
if (existingIndex === -1) {
  marketplace.plugins.push(entry);
} else {
  marketplace.plugins[existingIndex] = entry;
}

await writeFile(marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`);

console.log(`Packaged ${pluginName} to ${pluginDir}`);
console.log(`Updated ${marketplacePath}`);
console.log(`Install in Codex with: codex plugin add ${pluginName}@${marketplace.name}`);
