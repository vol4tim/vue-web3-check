var path = require('path')
var { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    // library: '[name]',

    // libraryExport: 'default',
    // libraryTarget: 'commonjs'
    libraryTarget: 'umd'

  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
