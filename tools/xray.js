
var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'data/full-emoji-list-v11.0.html'))
var Xray = require('x-ray');
var x = Xray()


x(html, 'table ', [{
  zz:'ss',
  tds: x('tr',['td.chars'])
}])(console.log)