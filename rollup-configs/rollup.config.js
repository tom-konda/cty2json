import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageInfo = JSON.parse(readFileSync(`${__dirname}/../package.json`).toString())
const bannerText = `
/**
 * Cty2JSON ver ${packageInfo.version}
 * Copyright (C) 2015-${new Date().getUTCFullYear()} Tom Konda
 * Released under the GPLv3 license
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
`

export default {
  input: './temp/lib/cty2json.js',
  external: ['fs'],
  output: [
    {
      banner: bannerText,
      file: 'lib/cty2json.js',
      format: 'es',
    },
    {
      banner: bannerText,
      file: 'lib/cty2json.cjs',
      format: 'commonjs',
    },
  ],
}