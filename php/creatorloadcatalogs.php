<?php 
require "db.php";
if ($_POST['p'] == '755create533lla') {
	$catalogs = R::getAll('SELECT 
	catalogs.id, catalogs.headerc, catalogs.coverc, catalogs.datec,
		catalogs.counterc, catalogs.openc,catalogs.headera, catalogs.datea
	FROM `catalogs`
	ORDER BY catalogs.id DESC');
$data = $catalogs;
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>