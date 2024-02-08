<?php
include("banco.php");

$banco = new Banco();
$nameVer = $banco->select("cal_usuarios", ["*"], "WHERE BINARY nome = '" . $_POST['username'] . "'");
$camposIguais = $nameVer ? "Sendo usado" : '';
$camposIguais = $camposIguais == '' ? "Ok" : 'Este nome de usuáro já esta sendo usado.';
echo $camposIguais . '|';
echo $_POST['username'];