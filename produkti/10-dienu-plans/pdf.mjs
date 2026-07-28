import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const directory = dirname(fileURLToPath(import.meta.url));
const html = join(directory, "dist", "index.html");
const output = join(directory, "dist", "10-Dienu-Uztura-Plans.pdf");
const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find(existsSync);

if (!browser) {
  throw new Error("Nav atrasta Edge vai Chrome pārlūkprogramma PDF ģenerēšanai.");
}

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  `--print-to-pdf=${output}`,
  "--no-pdf-header-footer",
  pathToFileURL(html).href,
], { stdio: "inherit" });

if (!existsSync(output)) {
  throw new Error("PDF netika izveidots.");
}

console.log(`PDF -> ${output}`);
