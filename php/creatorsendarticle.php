<?php 
require "db.php";
if ($_POST['p'] == '755create533lla') {
	$id = $_POST['idarticle'];
	$headera = $_POST['headera'];
	$covera = $_POST['covera'];
	$datea = $_POST['datea'];
	$opena = $_POST['opena'];
	$texta = $_POST['texta'];
	$pretexta = $_POST['pretexta'];
	$idc = $_POST['idc'];

	$articleold = R::load('articles',$id);
	$catalogold = R::load('catalogs',$articleold['idc']);
	$openold = $articleold['opena'];

	$articleold->headera = $headera;
	$articleold->covera = $covera;
	$articleold->datea = $datea;
	$articleold->opena = $opena;
	$articleold->pretexta = $pretexta;
	$articleold->idc = $idc;
	$data = 'Статья сохранена, каталог не обновлен.';
	R::store($articleold);

	if( ($openold == '0') && ($opena == '1') ) {
		$catalogold->datea = $datea;
		$catalogold->counterc = $catalogold['counterc'] + 1;
		$catalogold->headera = $headera;
		$data = 'Статья сохранена, данные каталога обновлены.';
		R::store($catalogold);
	}
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();?>
?>