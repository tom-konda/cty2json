import buble from 'rollup-plugin-buble';

export default {
  input: './lib/cty2json.js',
  external: ['fs'],
  output: [
    { file: 'lib/cty2json.cjs.js', format: 'cjs' },
    { file: 'index.js', format: 'cjs' },
  ],
  plugins: [
    buble({
      node: 4,
    })
  ]
}