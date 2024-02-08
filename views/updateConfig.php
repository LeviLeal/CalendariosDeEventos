<?php
include("banco.php");
session_start();
$idUser = $_SESSION["id"];


$bancoObj = new Banco();
if (isset($_POST["Nome"])) {
    $nameVer = $bancoObj->select("cal_usuarios", ["*"], "WHERE BINARY nome = '" . $_POST['Nome'] . "' AND id != " . $idUser);
    if (!count($nameVer) == 0) {
        $_SESSION["mensagem"] = "nome-existe";
    } else {
        $bancoObj->update("cal_usuarios", "nome", filter_input(INPUT_POST, "Nome", FILTER_DEFAULT), "WHERE id = " . $idUser);
        $_SESSION["nome"] = filter_input(INPUT_POST, "Nome", FILTER_DEFAULT);
        $_SESSION["mensagem"] = "nome-trocado";
    }
} else if (isset($_POST["Senha"])) {
    $senha = hash("sha256", filter_input(INPUT_POST, "Senha", FILTER_DEFAULT));
    $bancoObj->update("cal_usuarios", "senha", $senha, "WHERE id = " . $idUser);
    $_SESSION["mensagem"] = "senha-trocada";
} else if (isset($_POST["Email"])) {
    $bancoObj->update("cal_usuarios", "email", filter_input(INPUT_POST, "Email", FILTER_DEFAULT), "WHERE id = " . $idUser);
    $_SESSION["email"] = $_POST["Email"];
    $_SESSION["mensagem"] = "email-trocado";
} else if (isset($_POST["Telefone"])) {
    $bancoObj->update("cal_usuarios", "telefone", filter_input(INPUT_POST, "Telefone", FILTER_DEFAULT), "WHERE id = " . $idUser);
    $_SESSION["tel"] = $_POST["Telefone"];
    $_SESSION["mensagem"] = "telefone-trocado";
}

header("location: page_config.php");
