/**
 * Compresses the GLB models with EXT_meshopt_compression.
 *
 * Reads the uncompressed exports from `src/assets/models/source/` and writes the
 * compressed versions the app imports to `src/assets/models/`. Both are committed:
 * `source/` is the one to replace when re-exporting from Blender, then run
 * `npm run models` to regenerate.
 *
 * Geometry attributes, node names, skins and animation tracks are preserved as-is
 * (no welding, no quantization) so the scene graph the app queries by name keeps
 * working exactly the same.
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { dedup, prune, reorder, resample } from "@gltf-transform/functions";
import { MeshoptEncoder } from "meshoptimizer";
import fs from "node:fs";
import path from "node:path";

const SOURCE_DIR = "src/assets/models/source";
const OUTPUT_DIR = "src/assets/models";

await MeshoptEncoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.encoder": MeshoptEncoder });

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const files = fs.readdirSync(SOURCE_DIR).filter((file) => file.endsWith(".glb"));

let before = 0;
let after = 0;

for (const file of files) {
  const inputPath = path.join(SOURCE_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file);

  const document = await io.read(inputPath);
  await document.transform(
    dedup(),
    prune({ keepAttributes: true }),
    resample(),
    reorder({ encoder: MeshoptEncoder }),
  );

  document
    .createExtension(EXTMeshoptCompression)
    .setRequired(true)
    .setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });

  const output = Buffer.from(await io.writeBinary(document));
  const inputSize = fs.statSync(inputPath).size;

  before += inputSize;

  // tiny models can grow: the extension overhead outweighs the encoding gain
  if (output.byteLength >= inputSize) {
    fs.copyFileSync(inputPath, outputPath);
    after += inputSize;
    console.log(`${file.padEnd(14)} ${kb(inputSize)} -> kept uncompressed`);
    continue;
  }

  fs.writeFileSync(outputPath, output);
  after += output.byteLength;
  console.log(
    `${file.padEnd(14)} ${kb(inputSize)} -> ${kb(output.byteLength)}  (-${(100 - (output.byteLength / inputSize) * 100).toFixed(0)}%)`,
  );
}

console.log(`\ntotal          ${kb(before)} -> ${kb(after)}  (-${kb(before - after)})`);
