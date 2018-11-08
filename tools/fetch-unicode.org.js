
var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'data/full-emoji-list-v11.0.html'))
var Xray = require('x-ray');
var x = Xray()

// let pathToOutput='tools/data/unicode.org.json';
let pathToHtml='tools/data/unicode.org_emoji-list.html';



let htmlHeader = `
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>EmojiBro✋</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../../assets/emoji.css">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/favicon-16x16.png">
    <link rel="manifest" href="assets/favicons/site.webmanifest.json">
    <link rel="mask-icon" href="assets/favicons/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="assets/favicons/favicon.ico">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125250291-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-125250291-1');
    </script>

    <meta name="msapplication-TileColor" content="#ffc40d">
    <meta name="msapplication-config" content="assets/favicons/browserconfig.xml">
    <meta name="theme-color" content="#fff0f5">
</head>`;



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

out = htmlHeader + '<body><ul id="them_all" class="showall" onmouseover="doClick()">' + out+ '</ul></body>' + '</html>';

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




