import buble from 'rollup-plugin-buble';

export default {
  entry: './temp/lib/cty2json.class.js',
  targets: [
    { dest: 'lib/cty2json.cjs.js', format: 'cjs' },
    { dest: 'lib/cty2json.class.js', format: 'es' },
  ],
  plugins: [
    buble(
      {
        target: {
          chrome: 52,
          firefox: 48,
          safari: 9,
          edge: 13,
          ie: 11,
        }
      }
    )
  ]
}