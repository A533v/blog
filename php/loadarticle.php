<?php 
require "db.php";

$idarticle = $_POST['idart'];


$article = R::getAll('SELECT 
	articles.id, articles.headera, articles.covera, articles.datea,articles.opena, articles.texta, articles.pretexta, articles.idc, catalogs.headerc 
	FROM `articles` 
	LEFT JOIN `catalogs` 
	ON articles.idc = catalogs.id 
	WHERE catalogs.openc = ? AND articles.opena = ? AND articles.id = ? 
	ORDER BY catalogs.datea DESC LIMIT 1 ', [1, 1, $idarticle]);
$data = $article[0];
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();?>
?>