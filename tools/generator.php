<?php

$out='';

$emojis = json_decode(file_get_contents("data/Full Emoji List-v11.0.json"), true);
foreach ($emojis['emojis'] as $ctg) {
  foreach ($ctg['subs'] as $subctg) {
    foreach ($subctg['elements'] as $emoji) {
      $out.='<tr>';
      $out.='<td class="chars">'.$emoji['chars'].'</td>';
      $out.='<td class="unicode">'.$emoji['unicode'].'</td>';
      $out.='<td class="name">'.$emoji['name'].'</td>';
      $out.='<td class="ctg">'.$ctg['ctg'].'</td>';
      $out.='<td class="subctg">'.$subctg['subctg'].'</td>';
      $out.='</tr>';
    }
  }
}

?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>😇Emoji generator</title>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>char</th>
          <th>unicode</th>
          <th>name</th>
          <th>ctg</th>
          <subctg></subctg>
        </tr>
      </thead>
      <tbody>
        <?=$out;?>
        </tbody>
      </table>
  </body>
</html>
