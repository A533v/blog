<?php 
require "db.php";

if ($_POST['p'] == '755create533lla') {
	$id = $_POST['idarticle'];
	$texta = $_POST['texta'];
	$article = R::load('articles',$id);
	$article->texta = $texta;
	R::store($article);
	$data = 'Сохранено.';
}

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>