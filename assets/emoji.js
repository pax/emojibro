showActivity();

function showActivity(){
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

  // show top 20 most used
  sortable=sortable.slice(0, 20);
// if (sortable.length >> 20){
//   sortable.splice(Math.round(sortable.length/2)-2,2);
// }
// TODO show at most top 10 most used and last 10 clicked
  // xtop=sortable.slice(0, Math.round(sortable.length/2));
  // ztop=xtop.slice(0, 10);
  // last=sortable.slice(Math.round(sortable.length/2) -1, Math.round(sortable.length/2) + 9);
// console.log(sortable)
  // sortable=ztop.concat(last);

  var display='';
  // console.log(sortable)
  for (var element in sortable) {
    // zx+='x' + element;
    // console.log(sortable[element][0])
    display += '<span>' + sortable[element][0] + '<sub> '  + sortable[element][1] +  '</sub></span>';
  }


// console.log(zx)
  document.getElementById("activity").innerHTML=display;
}
else {
  console.log('localStorage.getItem("activity") = null' );
}
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
  var ctg = this.getAttribute('ctg') ? '<a href="#" class="ctg" onclick="filter(\'' +   slugify('ctg_' + this.getAttribute('ctg')) + '\')">' + this.getAttribute('ctg') + '</span>' : '';
  var subctg = this.getAttribute('subctg') ? ' &rarr;&nbsp;<a href="#" class="subctg" onclick="filter(\'' +   slugify('sub_' + this.getAttribute('subctg')) + '\')">' + this.getAttribute('subctg') + '</span>' : '';
  document.getElementById("status").innerHTML='<span class="emoji"><input id="input_emoji" type="text" value="' +  this.innerHTML + '" onclick="copyToClipboard(\'input_emoji\')"/></span>' + name + unicode + xhtml + ctg + subctg + '</span>';
  copyToClipboard(this.innerHTML)
}


function copyToClipboard(stringToCopy) {

    var resultField = document.getElementById("plain-copy-result");

    clipboard.writeText(stringToCopy).then(function(){
      document.getElementById("msg").innerHTML='copied';
      document.getElementById("msg").classList.toggle('show');
      document.getElementById("msg").classList.toggle('hide');
      var storedActivity = localStorage.getItem("activity") ? JSON.parse(localStorage.getItem("activity")) : {};
      storedActivity[stringToCopy] = storedActivity[stringToCopy] ? storedActivity[stringToCopy] + 1 : 1;
      localStorage.setItem("activity", JSON.stringify(storedActivity));
      // localStorage.clear();
      console.log(stringToCopy + ' → localStorage');
      showActivity(); // update
    }, function(err){
      resultField.textContent = err;
    });
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function filter(className){

// ckear searchbox
  document.getElementById('emoji-search').value = ''
  emojiTitleSearch('emoji-search','them_all');

  document.getElementById("them_all").className="";
  document.getElementById("them_all").className=className;
  document.getElementById("panel-wrapper").className=className;

}

function selectFilter(){
  // alert ('x');
  var selected_val=document.getElementById("nav_selector").value;

  // console.log(selected_val);
// ckear searchbox
  document.getElementById('emoji-search').value = ''
  emojiTitleSearch('emoji-search','them_all');

  document.getElementById("them_all").className="";
  document.getElementById("them_all").className=selected_val;
  document.getElementById("panel-wrapper").className=selected_val;

}

// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function emojiTitleSearch(inputID, targetID) {
  // show all emoji
  document.getElementById("them_all").className="showall";
  document.getElementById("panel-wrapper").className='showall';


  var input, filter, ul, li, a, i;
  input = document.getElementById(inputID);
  // console.log(input.value)
  filter = input.value.toUpperCase();

  // change selected option to show all
  if (filter && filter !='') {
    document.getElementById('nav_selector').getElementsByTagName('option')[0].selected = 'selected'
  }
  ul = document.getElementById(targetID);
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    // a = li[i].getElementsByTagName("a")[0];
    a = li[i];
    // search by title, ctg, subctg TODO: add search by keywords
    if (a.title.toUpperCase().indexOf(filter) > -1 || a.getAttribute("subctg").toUpperCase().indexOf(filter) > -1 || a.getAttribute("ctg").toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// https://gist.github.com/mathewbyrne/1280286
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
