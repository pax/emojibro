
var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'data/full-emoji-list-v11.0.html'))
var Xray = require('x-ray');
var x = Xray()

// let pathToOutput='tools/data/unicode.org.json';
let pathToHtml='tools/data/unicode.org_emoji-list.html';

x(html, 'table ', [{
  tds: x('tr',[{

    ctg:'th a',
    class:'th@class',
    no: 'td.rchars',
    chars: 'td.chars',
    code: 'td.code',
    name: 'td.name',
    appl: 'td:nth-child(4).miss',
    win: 'td:nth-child(10).miss'
  }])
}])(function(err, data){
  if(err)
    console.log(err);
  else {
    emojis = data[0].tds
  }
});


let emojiObj=[]
let ctg = subctg = null

emojis.forEach(function(element) {
  ctg = (element.class=='bighead') ? element.ctg : ctg;
  subctg = (element.class=='mediumhead') ? element.ctg : subctg;
  if (element.code){
    emojiObj[element.code]=[];
    emojiObj[element.code]['no']=element.no;
    emojiObj[element.code]['code']=element.code;
    emojiObj[element.code]['chars']=element.chars;
    emojiObj[element.code]['name']=element.name;
    emojiObj[element.code]['ctg']=ctg;
    emojiObj[element.code]['subctg']=subctg;
  }
});


/*

  Build ze HTML

 */

let out ='';

Object.entries(emojiObj).forEach(([key, val]) => {
    out = out + '<li class="ctg_' +
  val.ctg +
  ' sub_' +
  val.subctg +
  '" title="' +  val.name + 
  '" ctg="' + val.ctg +  '" subctg="' + val.subctg + '" unicode="' + val.code + '">' + val.chars + '</li>';
});

out = '<ul>' + out+ '</ul>';

/*
  write HTML to file
 */

var fs = require('fs');
fs.writeFile(pathToHtml, out, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("saved to >>> " + pathToHtml);
});
