const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, dir)

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

const config = {
  mode: 'development',
  target: 'node',
  devtool: '#eval-source-map',
  entry: './src/server/index.js',
  output: {
    path: resolve('build'),
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: true
    })
  ]
}

module.exports = config