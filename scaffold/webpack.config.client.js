const path = require('path')

const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const resolve = dir => path.resolve(__dirname, dir)

const clientConfig = {
  mode: 'development',
  target: 'web',
  entry: resolve('../src/client/index'),
  output: {
    path: resolve('../public'),
    filename: 'client.js',
    publicPath: '/',
  },
}

module.exports = merge(baseConfig, clientConfig)
