const path = require('path')

// const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config.base')

const resolve = dir => path.resolve(__dirname, dir)

const serverConfig = {
  mode: 'development',
  target: 'node',
  entry: resolve('../src/server/index'),
  output: {
    path: resolve('../build'),
    filename: 'server.js',
    publicPath: '/',
  },
  externals: [nodeExternals()],
  // plugins: [
  //   new webpack.BannerPlugin({
  //     banner: 'require("source-map-support").install();',
  //     raw: true,
  //     entryOnly: true
  //   })
  // ],
  node: {
    __dirname: true,
    __filename: true,
  },
}

module.exports = merge(baseConfig, serverConfig)
