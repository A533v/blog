<?php 
require "db.php";
	$images = R::getAll('SELECT *
	FROM `images`
	ORDER BY id DESC');
	$data = $images;
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>