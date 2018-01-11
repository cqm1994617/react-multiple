const config = require('./webpack.config')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const path = require('path')

const port = 8089
const compiler = webpack(config)
const app = express()

const devMiddleware = webpackDevMiddleware(compiler, {
  inline: true,
  disableHostCheck: true,
  contentBase: './',
  hot: true
})

app.use(devMiddleware)

app.get('/:viewname', function (req, res, next) {

  const viewname = req.params.viewname ? req.params.viewname + '.html' : 'index.html';
  const filepath = path.join(compiler.outputPath, viewname)

  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) {
      res.send(err)
      return next(err)
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
})

app.listen(port, () => {
  console.log('dev start')
})
