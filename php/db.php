<?php
require "../php/rb-mysql.php";
R::ext('xdispense', function($table_name){
return R::getRedBean()->dispense($table_name);});
R::setup( 'mysql:host=localhost;dbname=codeseella', 'root', 'root' ); //for both mysql or mariaDB
R::freeze(true);
session_start();
?>