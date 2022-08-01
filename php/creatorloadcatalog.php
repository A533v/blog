<?php 
require "db.php";
$idcatalog = $_POST['idcat'];
if ($_POST['p'] == '755create533lla') {
	$catalog = R::getAll('SELECT * FROM `catalogs`
		WHERE catalogs.id = ? LIMIT 1 ', [$idcatalog]);
	$data = $catalog;
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>