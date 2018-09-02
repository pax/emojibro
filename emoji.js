/*

    TODO save to LocalStorage

*/

if (localStorage.getItem("activity")) {
  // console.log('has storage');
  zz=JSON.parse(localStorage.getItem("activity"));
  var sortable = [];
  for (var element in zz) {
      sortable.push([element, zz[element]]);
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  var display=''
  // console.log(sortable)
  for (var element in sortable) {
    // zx+='x' + element;
    console.log(sortable[element][0])
    display += '<span>' + sortable[element][0] + '<sub> '  + sortable[element][1] +  '</sub></span>';
  }


// console.log(zx)
  document.getElementById("activity").innerHTML=display;
}
else {
  console.log('localStorage.getItem("activity") = null' );
}




// https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
function encode (str) {
  if (str ){
  var buf = [];
  for (var i=str.length-1;i>=0;i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
  }
  else {
    return '';
  }
}

function decode (str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}


function doClick(){
  var ul = document.getElementById("them_all");
  var items = ul.getElementsByTagName("li");

  Array.from(items).forEach(function(element) {
    element.addEventListener('click', showinfo);
  });
}


function showinfo(){
  var name = this.title ? '<span class="title">' + this.title + '</span>' : '';
  var unicode = this.getAttribute('unicode') ? '<span class="unicode"><input type="text" value="' + this.getAttribute('unicode') + '" /></span>' : '';
  var xhtml = this.getAttribute('xhtml') ?   '<span class="html"><input type="text" value="' + encode(encode(this.getAttribute('xhtml'))) + '" />'  : '';
  var ctg = this.getAttribute('ctg') ? '<span class="ctg">' + this.getAttribute('ctg') + '</span>' : '';
  document.getElementById("status").innerHTML='<span class="emoji"><input id="input_emoji" type="text" value="' +  this.innerHTML + '" onclick="copyToClipboard(\'input_emoji\')"/></span>' + name + unicode + xhtml + ctg + '</span>';
}

function copyToClipboard(targetID) {

var target= document.getElementById(targetID);
  /* Select the text field */
  target.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
target.blur();

  // target.focus();
document.getElementById("msg").innerHTML='copied';
document.getElementById("msg").classList.toggle('show');
document.getElementById("msg").classList.toggle('hide');


// var storedActivity = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
var storedActivity = localStorage.getItem("activity") ? JSON.parse(localStorage.getItem("activity")) : {};
storedActivity[target.value] = storedActivity[target.value] ? storedActivity[target.value] + 1 : 1;
// storedActivity['this']=storedActivity[target.value];
console.log(storedActivity);
localStorage.setItem("activity", JSON.stringify(storedActivity));
// localStorage.clear();
// console.log(storedActivity);
// console.log(target.value + ' → localStorage');
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function filter(className){
  document.getElementById("them_all").className="";
  document.getElementById("them_all").className=className;
  document.getElementById("panel-wrapper").className=className;

}