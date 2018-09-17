  
var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'data/full-emoji-list-v11.0.html'))
var Xray = require('x-ray');
var x = Xray()

let pathToOutput='tools/data/unicode.org.json';

x(html, 'table ', [{
  tds: x('tr',[{
    // tr:'tr',
    // celass:'class',
    ctg:'th a',
    class:'th@class',
    no: 'td.rchars',
    chars: 'td.chars',
    code: 'td.code',
    name: 'td.name',
    appl: 'td:nth-child(4).miss',
    win: 'td:nth-child(10).miss'
  }])
}]).write(pathToOutput)

console.log('written to >>> ' + pathToOutput);