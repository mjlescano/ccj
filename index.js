var express = require('express')
var path = require('path')
var fs = require('fs')

var app = express()

var indexPath = path.resolve(__dirname, 'app', 'index.html')
var indexHtml = fs.readFileSync(indexPath, 'utf8')
app.get('/', function(req, res) {
  res.send(indexHtml)
})

app.use(express.static('app'))

app.listen(process.env.PORT || 3000)
