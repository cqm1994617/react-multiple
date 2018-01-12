const express = require('express')
const path = require('path')
const fs = require('fs')

const port = 8089
const app = express()

app.use(express.static(path.join(__dirname, '../build')));

app.get('/:viewName', function (req, res, next) {
  if (req.params.viewName === 'favicon.ico')  return

  const viewName = req.params.viewName ? req.params.viewName + '.html' : 'index.html'
  const pathName = path.join(__dirname, '../build', viewName)

  fs.readFile(pathName, function (err, data) {
    if (err) {
      res.send(err)
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(data)
    res.end()
  });

})

app.listen(port)
