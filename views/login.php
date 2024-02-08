<?php 
	session_start();

	include "banco.php";
	include "filtros.php";

	$filtro = new Filters();
	$banco = new Banco();

	$user;

	if(isset($_POST["Nome"]) && isset($_POST["Senha"])){
		$senha = hash("sha256", $_POST["Senha"]);
		$user = $banco->select("cal_usuarios", ["id", "nome", "senha", "telefone", "email"], "WHERE BINARY nome = '" . $filtro->filterString($_POST["Nome"]) . "' AND senha = '" . $senha . "'");
	}

	if(!empty($user))
	{
		header("Location: index.php");
		$_SESSION["id"] = $user[0]["id"];
		$_SESSION["tel"] = $user[0]["telefone"];
		$_SESSION["email"] = $user[0]["email"];
		$_SESSION["nome"] = $user[0]["nome"];
	}else
		header("Location: page_login.html");
?>