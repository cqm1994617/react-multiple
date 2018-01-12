const config = require('./../config/webpack.dev.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const path = require('path')

const port = 8089
const compiler = webpack(config)
const app = express()

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
})
app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

app.get('/:viewName', function(req, res, next) {
  if (req.params.viewName === 'favicon.ico')  return
  
  const viewName = req.params.viewName ? req.params.viewName + '.html' : 'index.html';
  const filePath = path.join(compiler.outputPath, viewName);

  compiler.outputFileSystem.readFile(filePath, function(err, result) {
    if (err) {
      res.send(err)
      return next(err)
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
})

app.listen(port)
