import * as fs from 'fs';

const packageInfo = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString())
const bannerText = `
/**
 * Cty2JSON ver ${packageInfo.version}
 * Copyright (C) 2015-${new Date().getUTCFullYear()} Tom Konda
 * Released under the GPLv3 license
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
`

export default {
  input: './lib/cty2json.js',
  external: ['fs'],
  output: [
    {
      banner: bannerText,
      file: 'lib/cty2json.js',
      format: 'es',
    },
  ],
}