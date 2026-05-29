import fs from "fs";
import path from "path";

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`[Consolidate] Warning: Source folder ${from} does not exist.`);
    return;
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    const stat = fs.lstatSync(fromPath);
    if (stat.isFile()) {
      fs.copyFileSync(fromPath, toPath);
      console.log(`[Consolidate] Copied: ${element} to ${to}`);
    }
  });
}

const publicWebpPath = path.join(process.cwd(), "public", "webp");
if (!fs.existsSync(publicWebpPath)) {
  fs.mkdirSync(publicWebpPath, { recursive: true });
}

// Ensure source folders are consolidated into public/webp
copyFolderSync(path.join(process.cwd(), "src", "data", "webp"), publicWebpPath);
copyFolderSync(path.join(process.cwd(), "Downloadables", "webp"), publicWebpPath);
copyFolderSync(path.join(process.cwd(), "temp"), publicWebpPath);

console.log("[Consolidate] Assets consolidated successfully!");
