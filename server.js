const config = require('./webpack.config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const Koa = require('koa')
const Router = require('koa-router')

const port = 8088
const compiler = webpack(config)
const app = new Koa()
const router = new Router()

router.get()

const devMiddleware = new WebpackDevServer(compiler, {
  inline: true,
  disableHostCheck: true,
  contentBase: './',
  hot: true
})

app.use(devMiddleware).use(Router)

app.listen(port, () => {
  console.log('dev start')
})
