<?php 
require "db.php";
if ($_POST['p'] == '755create533lla') {
	$catalog = R::dispense('catalogs');
	$catalog->headerc = 'New catalog';
	$catalog->coverc = 'img/codeseela.webp';
	$catalog->counterc = '0';
	$catalog->openc = '0';
	$catalog->headera = '0';
	R::store($catalog);
	$data = 'Новый каталог создан.';
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>