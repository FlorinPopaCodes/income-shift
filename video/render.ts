#!/usr/bin/env bun

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const COMPOSITIONS = ["landscape", "square", "vertical"];
const OUTPUT_DIR = path.resolve("../output");

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Bundling...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
  });
  console.log("Bundle ready.\n");

  for (const id of COMPOSITIONS) {
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id,
    });

    // MP4
    const mp4Path = path.join(OUTPUT_DIR, `${id}.mp4`);
    console.log(`Rendering ${id}.mp4...`);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: mp4Path,
    });
    console.log(`  Done: ${mp4Path}`);

    // WebM
    const webmPath = path.join(OUTPUT_DIR, `${id}.webm`);
    console.log(`Rendering ${id}.webm...`);
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "vp8",
      outputLocation: webmPath,
    });
    console.log(`  Done: ${webmPath}`);
  }

  console.log("\nAll renders complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
