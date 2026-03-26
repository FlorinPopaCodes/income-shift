#!/usr/bin/env bun

import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const OUTPUT_DIR = path.resolve("../output");

const HEROES = [
  { composition: "landscape", frame: 449, name: "hero-landscape.png" },
  { composition: "landscape", frame: 89, name: "hero-1971.png" },
];

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Bundling...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
  });
  console.log("Bundle ready.\n");

  for (const { composition: id, frame, name } of HEROES) {
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id,
    });

    const outPath = path.join(OUTPUT_DIR, name);
    console.log(`Rendering ${name} (${id} frame ${frame})...`);
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outPath,
      frame,
    });
    console.log(`  Done: ${outPath}`);
  }

  console.log("\nAll hero images rendered.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
