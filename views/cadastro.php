<?php 
include "banco.php";

$banco = new Banco();

$nome = filter_input(INPUT_POST, "Nome", FILTER_SANITIZE_SPECIAL_CHARS); 
$email = filter_input(INPUT_POST, "Email", FILTER_SANITIZE_EMAIL); 
$telefone = filter_input(INPUT_POST, "Telefone", FILTER_SANITIZE_SPECIAL_CHARS); 
$senha = filter_input(INPUT_POST, "Senha", FILTER_DEFAULT); 
$senha = hash('sha256',  $senha);
if($nome && $email && $telefone && $senha)
{
	$telefone = str_replace("(", "", $telefone);
	$telefone = str_replace(")", "", $telefone);
	$telefone = str_replace("-", "", $telefone);
	$telefone = str_replace(" ", "", $telefone);
	$banco->insert("cal_usuarios", [["nome", "email", "telefone", "senha"], [$nome, $email, $telefone, $senha]]);

	header("Location: page_cad.php");
}

$emailVer = $banco->select("cal_usuarios", ["*"], "WHERE email = '" . $email . "'");
$nameVer = $banco->select("cal_usuarios", ["*"], "WHERE nome = '" . $nome . "'");
$camposIguais = $nameVer ? "Nome" : '';
$camposIguais .= $emailVer ? "Email" : '';
