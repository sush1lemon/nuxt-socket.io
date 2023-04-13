#!/usr/bin/env node
import mri from 'mri';
import { resolve } from 'pathe';
import { a as createNitro, w as writeTypes, g as createDevServer, p as prepare, b as build, c as copyPublicAssets, i as prerender } from './shared/nitro.1000a535.mjs';
import 'node:worker_threads';
import 'node:fs';
import 'perfect-debounce';
import 'h3';
import 'http-proxy';
import 'listhen';
import 'serve-placeholder';
import 'serve-static';
import 'ufo';
import 'chokidar';
import 'node:url';
import 'chalk';
import 'radix3';
import 'defu';
import 'hookable';
import 'unimport';
import 'consola';
import 'c12';
import 'klona/full';
import 'scule';
import 'mlly';
import 'escape-string-regexp';
import 'std-env';
import 'pkg-types';
import 'node:module';
import 'node:fs/promises';
import 'jiti';
import 'dot-prop';
import 'archiver';
import 'globby';
import 'unstorage';
import 'pathe/utils';
import 'rollup';
import 'fs-extra';
import 'knitwork';
import 'pretty-bytes';
import 'gzip-size';
import '@rollup/plugin-commonjs';
import '@rollup/plugin-node-resolve';
import '@rollup/plugin-alias';
import '@rollup/plugin-json';
import '@rollup/plugin-wasm';
import '@rollup/plugin-inject';
import 'rollup-plugin-visualizer';
import 'unenv';
import 'unimport/unplugin';
import 'ohash';
import '@rollup/plugin-replace';
import 'node:os';
import '@vercel/nft';
import 'semver';
import 'etag';
import 'mime';
import 'esbuild';
import '@rollup/pluginutils';
import 'node:zlib';

async function main() {
  const args = mri(process.argv.slice(2));
  const command = args._[0];
  const rootDir = resolve(args._[1] || ".");
  if (command === "prepare") {
    const nitro = await createNitro({ rootDir });
    await writeTypes(nitro);
    return;
  }
  if (command === "dev") {
    const nitro = await createNitro({
      rootDir,
      dev: true,
      preset: "nitro-dev"
    });
    const server = createDevServer(nitro);
    await server.listen({});
    await prepare(nitro);
    await build(nitro);
    return;
  }
  if (command === "build") {
    const nitro = await createNitro({
      rootDir,
      dev: false
    });
    await prepare(nitro);
    await copyPublicAssets(nitro);
    await prerender(nitro);
    await build(nitro);
    await nitro.close();
    process.exit(0);
  }
  console.error(
    `Unknown command ${command}! Usage: nitro dev|build|prepare [rootDir]`
  );
  process.exit(1);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
