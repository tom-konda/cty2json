import buble from 'rollup-plugin-buble';

export default {
  input: './lib/cty2json.js',
  output: [
    {file: 'lib/cty2json.legacy.js', format: 'iife'},
  ],
  legacy: true,
  name: 'Cty2JSON',
  plugins: [
    buble({
      ie: 8,
    })
  ]
}