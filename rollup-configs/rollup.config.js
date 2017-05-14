import buble from 'rollup-plugin-buble';

export default {
  entry: './lib/cty2json.js',
  targets: [
    { dest: 'lib/cty2json.cjs.js', format: 'cjs' },
    { dest: 'index.js', format: 'cjs' },
  ],
  plugins: [
    buble({
      node: 4,
    })
  ]
}