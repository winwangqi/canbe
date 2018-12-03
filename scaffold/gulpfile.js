const path = require('path')

const gulp = require('gulp')
const nodemon = require('nodemon')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, dir)

const serverConfig = require('./webpack.config.server')
const clientConfig = require('./webpack.config.client')

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log(stats.toString())
    }

    done && done()
  }
}

gulp.task('server-build', done => {
  webpack(serverConfig).run(onBuild(done))
})

gulp.task('server-watch', () => {
  webpack(serverConfig).watch(1000, (err, stats) => {
    onBuild(err, stats)
    nodemon.restart()
  })
})

gulp.task('client-build', done => {
  webpack(clientConfig).run(onBuild(done))
})

gulp.task('client-watch', () => {
  webpack(clientConfig).watch(1000, onBuild())
})

gulp.task('default', ['server-build', 'server-watch', 'client-build', 'client-watch'], () => {
  nodemon({
    script: resolve('../build/server'),
    watch: [resolve('../build')],
    execMap: {
      js: 'node',
    },
    ignore: ['*'],
    ext: 'noop',
  }).on('restart', function() {
    console.log('Restarted!');
  })
})