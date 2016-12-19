import buble from 'rollup-plugin-buble';

export default {
  entry: './lib/cty2json.js',
  dest: 'lib/cty2json.legacy.js',
  format: 'iife',
  legacy: true,
  moduleName: 'Cty2JSON',
  plugins: [
    buble({
      ie: 8,
    })
  ]
}