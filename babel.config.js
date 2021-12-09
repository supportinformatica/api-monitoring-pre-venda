module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@src': './src'
      }
    }],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    "babel-plugin-parameter-decorator"
  ],
  ignore: [
    './test',
    '**/*.spec.ts',
    '**/*.test.ts'
  ]
}