const config = require('./config/webpack.dev.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const path = require('path')

const port = 8089
const compiler = webpack(config)
const app = express()

const debug = process.env.NODE_ENV !== 'production'

if (debug) {
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  })
  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.listen(port, () => {
  console.log('server start')
})
