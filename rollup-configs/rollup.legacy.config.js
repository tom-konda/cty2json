import buble from 'rollup-plugin-buble';

export default {
  input: './lib/cty2json.js',
  output: [
    {
      legacy: true,
      file: 'lib/cty2json.legacy.js',
      name: 'Cty2JSON',
      format: 'iife'
    },
  ],
  plugins: [
    buble({
      ie: 8,
    })
  ]
}