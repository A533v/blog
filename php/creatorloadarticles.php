<?php 
require "db.php";
if ($_POST['p'] == '755create533lla') {
	$articles = R::getAll('SELECT articles.id, articles.headera, articles.covera, articles.datea, articles.opena, articles.idc, articles.pretexta, catalogs.headerc FROM `articles`
		LEFT JOIN `catalogs`
		ON articles.idc = catalogs.id
		ORDER BY catalogs.datea DESC');
	$data = $articles;
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>