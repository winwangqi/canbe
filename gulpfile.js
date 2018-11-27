const path = require('path')

const gulp = require('gulp')
const nodemon = require('nodemon')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, dir)

const config = require('./webpack.config')

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
  webpack(config).run(onBuild(done))
})

gulp.task('server-watch', () => {
  webpack(config).watch(1000, (err, stats) => {
    onBuild(err, stats)
    nodemon.restart()
  })
})

gulp.task('run', ['server-build', 'server-watch'], () => {
  nodemon({
    script: resolve('./build/server'),
    watch: ['build'],
    execMap: {
      js: 'node',
    },
    ignore: ['*'],
    ext: 'noop',
  }).on('restart', function() {
    console.log('Restarted!');
  })
})