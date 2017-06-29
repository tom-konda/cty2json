import * as fs from 'fs';

const packageInfo = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString())
const bannerText = `
#!/usr/bin/env node
/**
 * Cty2JSON ver ${packageInfo.version}
 * Copyright (C) 2015-${new Date().getUTCFullYear()} Tom Konda
 * Released under the GPLv3 license
 * See https://www.gnu.org/licenses/gpl-3.0.en.html
 */
`

export default {
  banner: bannerText.trim(),
  entry: './bin/cli.js',
  external: ['fs'],
  targets: [
    { dest: 'bin/cli.js', format: 'cjs' },
  ],
}