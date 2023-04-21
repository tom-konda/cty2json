import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageInfo = JSON.parse(readFileSync(`${__dirname}/../package.json`).toString());
const bannerText = `
#!/usr/bin/env node
/**
 * Cty2JSON ver ${packageInfo.version}
 * Copyright (C) 2015-${new Date().getUTCFullYear()} Tom Konda
 * Released under the GPLv3 license
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
`

/** @type {import('vite').UserConfig} */
export default defineConfig({
  esbuild: {
    banner: bannerText.trim(),
  },
  build: {
    outDir: '../../../bin',
    lib: {
      entry: './cli.ts',
      formats: ['es'],
      fileName: 'cli',
    },
    rollupOptions: {
      external: ['commander', 'fs', 'fs/promises', 'path', 'url'],
    },
    minify: false,
  },
});