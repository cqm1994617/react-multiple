const config = require('./webpack.config.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const path = require('path')

const port = 8089
const compiler = webpack(config)
const app = express()

const debug = process.env.NODE_ENV !== 'production'

if (debug) {
  const devMiddleware = webpackDevMiddleware(compiler, {
    inline: true,
    disableHostCheck: true,
    contentBase: './',
    hot: true
  })

  app.use(devMiddleware)
} else {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.listen(port, () => {
  console.log('server start')
})
