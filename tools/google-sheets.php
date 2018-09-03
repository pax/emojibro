<title>📊 get emoji from gSheets</title>
<style>
  #wrapper{
    margin: 1em 10vw; 
  }
  .list-unstyled{
    padding-left: 0;
  }
  .list-unstyled li {
    display: inline-block;
    font-size: 18px;
  }
  #nav a {
    margin: .5ex;
  }
   #nav a.ctg{
    font-weight: bold;
   }
   #nav a.ctg:before{
    display: block;
    content: ' ';
   }
</style>
<?php
// https://docs.google.com/spreadsheets/d/e/2PACX-1vRh_-WKROzuhydiuXjo5tQYeeYSf-ecSwykQYEXacDCMGXwkF3hpbMwLAOPccv8HAWHxL413oXP9Xd7/pubhtml

$zeFile='data/emoji-ctgs.json';
$docID='2PACX-1vRh_-WKROzuhydiuXjo5tQYeeYSf-ecSwykQYEXacDCMGXwkF3hpbMwLAOPccv8HAWHxL413oXP9Xd7';
$sheets=array(
  'emoji' => 0,
  'ctgs'=>'1840029070'
);

date_default_timezone_set('Europe/Bucharest');
setlocale(LC_ALL, "ro_RO.UTF-8");

$out='';
$navArray=[];
// GET DATA
  foreach ($sheets as $sheet_name => $sheet_id) {
    $spreadsheet_url='https://docs.google.com/spreadsheets/d/e/'.$docID.'/pub?gid='.$sheets[$sheet_name].'&single=true&output=csv';
    $spreadsheet_data[$sheet_name]=fetchGoogleSheets($spreadsheet_url);
  }

// print_r($spreadsheet_data['emoji']);



//  <li class="ctg_p" title="nerd_face" xhtml="&#129299;" unicode="1f913" ctg="p" o="36">🤓 </li>

foreach ($spreadsheet_data['emoji'] as $emoji) {
  if ( ($emoji['show'] != '0')){
    $classes=$ctg=$subctg='';
    if (isset($emoji['ctg'])) {
      $classes.='ctg_'.createSlug($emoji['ctg']).' ';
      $ctg='ctg="'.$emoji['ctg'].'" ';
    }
    if (isset($emoji['subctg'])) {
      $classes.='sub_'.createSlug($emoji['subctg']).' ';
      $subctg='subctg="'.$emoji['subctg'].'" ';
    }
    $unicode=isset($emoji['unicode']) ? 'unicode="'.$emoji['unicode'].'" ' : null;
    $title=isset($emoji['name']) ? 'title="'.$emoji['name'].'" ' : null;
    $out.='<li class="'.$classes.'" '.$title.$ctg.$subctg.$unicode.'>'.$emoji['char'].'</li>' ;
  }
}

foreach ($spreadsheet_data['ctgs'] as $ctg) {
  // print_r($ctg);
  // echo $ctg['Ctg'].' - '.$ctg['Subctg'].'<br>';
  $navArray[createSlug($ctg['Ctg'])]['name']=$ctg['Ctg'];
  $navArray[createSlug($ctg['Ctg'])]['icon']  = $ctg['icon'] ? $ctg['icon'] : 'x';
  $navArray[createSlug($ctg['Ctg'])]['subctgs'][]  = array(
    'slug' => createSlug($ctg['Subctg']), 
    'name' => $ctg['Subctg']
  );
}
// print_r($navArray);
$nav='';

// SELECT
foreach ($navArray as $ctg_slug => $one_ctg) {
  $nav.="\n\t\t\t\t".'<option></option>'."\n\t\t\t\t".'<option class="ctg ctg_'.$ctg_slug.'"  value="ctg_'.$ctg_slug.'">'.$one_ctg['icon'].strtoupper($one_ctg['name']).' '.$one_ctg['icon'].'</option>';
  foreach ($one_ctg['subctgs'] as $subctg_slug => $one_subctg) {
    // print_r($one_subctg);
    $nav.="\n\t\t\t\t".'<option class="subctg sub_'.$one_subctg['slug'].'"  value="sub_'.$one_subctg['slug'].'"> &nbsp; &nbsp; '.$one_subctg['name'].'</option>';
  }
}
/*
  // a list
 foreach ($navArray as $ctg_slug => $one_ctg) {
  $nav.='<a href="#" class="ctg ctg_'.$ctg_slug.'"  onclick="filter(\'ctg_'.$ctg_slug.'\')" >'.$one_ctg['name'].'</a>';
  foreach ($one_ctg['subctgs'] as $subctg_slug => $one_subctg) {
    // print_r($one_subctg);
    $nav.='<a href="#" class="subctg sub_'.$one_subctg['slug'].'" onclick="filter(\'sub_'.$one_subctg['slug'].'\')">'.$one_subctg['name'].'</a>';
  }
}*/

/*
   - - - - - - - - - FUNCTIONS - - - - - - - - -
 */


function fetchGoogleSheets($spreadsheet_url){
    if (!ini_set('default_socket_timeout', 40)) {
      $msg.= "<p>unable to change socket timeout</p>";
    }
    $firstPass=false;
    $columnNames='';
    if (($handle = fopen($spreadsheet_url, "r")) !== false) {
      while (($data = fgetcsv($handle, 0, ",")) !== false) {
        // echo '<hr><pre>'; print_r($data).'</pre>';
        if (!$firstPass) {
           $columnNames=$data;
           $firstPass=true;
        }
        else {
          $row=array();
          foreach ($data as $i => $cellValue) {
            $row[$columnNames[$i]]=$cellValue;
          }
           $spreadsheet_data[] = $row;}
      }
      fclose($handle);
    } else {
      die("Problem reading csv");
    }
  return $spreadsheet_data; //json
}

function createSlug($str, $delimiter = '-'){

    $slug = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
    return $slug;
}

// echo '<pre>'; print_r($navArray); echo '</pre>';
?>
<div id="wrapper"><h1>📊 get emoji from gSheets</h1>
<div id="nav">
  <select id="nav_selector" onchange="selectFilter()">
    <option class="xshowall" onchange="filter('showall')" value="showall" selected="">ALL CATEGORIES ⬇</option>
    <?=$nav;?>
    </select>
</div>
<ul class="list-unstyled"><?=$out;?></ul></div>
