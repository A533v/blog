<?php 
require "db.php";

if ($_POST['p'] == '755create533lla') {
	$id = $_POST['idcatalog'];
	$headerc = $_POST['headerc'];
	$coverc = $_POST['coverc'];
	$datec = $_POST['datec'];
	$counterc = $_POST['counterc'];
	$openc = $_POST['openc'];
	$headera = $_POST['headera'];
	$datea = $_POST['datea'];

	$catalog = R::load('catalogs',$id);

	$catalog->headerc = $headerc;
	$catalog->coverc = $coverc;
	$catalog->counterc = $counterc;
	$catalog->openc = $openc;
	$catalog->headera = $headera;
	$catalog->datea = $datea;
	R::store($catalog);

	$data = 'Сохранено.';
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>