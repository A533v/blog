<?php 
require "db.php";

if ($_POST['p'] == '755create533lla') {
	$article = R::dispense('articles');
	$article->headera = 'New article';
	$article->covera = 'img/codeseela.webp';
	$article->opena = '0';
	$article->texta = 'Текст статьи.';
	$article->pretexta = 'Описание статьи.';
	$article->idc = '0';
	R::store($article);
	$data = 'Новая статья создана.';
}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
exit();
?>