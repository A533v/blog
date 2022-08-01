<?php 
require "db.php";

$catalogs = R::getAll('SELECT 
		catalogs.id, catalogs.headerc, catalogs.coverc, catalogs.counterc,
		catalogs.headera, catalogs.datea
	FROM `catalogs`
	WHERE catalogs.openc = ? AND catalogs.counterc > ?
	ORDER BY catalogs.datea DESC', [1, 0]);

$data = $catalogs;
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();?>
?>