<?php 
require "db.php";

$idcatalog = $_POST['idcat'];

if ( $idcatalog == 0 ) {
	$articles = R::getAll('SELECT 
		articles.id, articles.headera, articles.covera, articles.datea, articles.idc,
		articles.pretexta, catalogs.coverc, catalogs.headerc
	FROM `articles`
	LEFT JOIN `catalogs`
	ON articles.idc = catalogs.id
	WHERE catalogs.openc = ? AND articles.opena = ?
	ORDER BY catalogs.datea DESC', [1, 1]);
} else {
	$articles = R::getAll('SELECT 
		articles.id, articles.headera, articles.covera, articles.datea, articles.idc,
		articles.pretexta, catalogs.coverc, catalogs.headerc
	FROM `articles`
	LEFT JOIN `catalogs`
	ON articles.idc = catalogs.id
	WHERE catalogs.openc = ? AND articles.opena = ? AND articles.idc = ?
	ORDER BY catalogs.datea DESC', [1, 1, $idcatalog]);
}
$data = $articles;
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();?>
?>