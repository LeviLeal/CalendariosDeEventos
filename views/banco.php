<?php

include("logs.php");
date_default_timezone_set('America/Fortaleza');

class Banco
{

	//private $nomeBanco = "organ523_calendario_eventos";
	//private $nomeServer = "localhost";
	//private $username = "organ523_calendario_user";
	//private $senha = "9-n(CfZeoSbO";

	private $nomeBanco = "calendario_eventos";
	private $nomeServer = "localhost";
	private $username = "root";
	private $senha = "";

	private $con;

	function __construct()
	{
		try {
			$this->con = new PDO("mysql:host=" . $this->nomeServer . ";dbname=" . $this->nomeBanco, $this->username, $this->senha);
			$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			echo ("erro no pdo: " . $e);
		} catch (Exception $e) {
			echo ("erro comum: " . $e);
		}
	}

	/* Recebe uma tabela e um array bidemensional com os campos os valores [[senha][123]]
		@return nothing */
	function insert($table, $camposvalores)
	{
		try {
			$campos = "(" . implode(", ", $camposvalores[0]) . ")";
			$paramCompare = "(";

			$index = 0;

			foreach ($camposvalores[1] as $valor) {
				$paramCompare .= ":" . $index . ", ";
				$index++;
			}

			//colocar parentese no final
			$paramCompare .= ")";

			//tirar a virgula do final
			$paramCompare = str_replace(", )", ")", $paramCompare);
			//formação do sql
			$sql = "INSERT INTO {$table} {$campos} VALUES {$paramCompare};";
			$stmt = $this->con->prepare($sql);

			//comparacao de valor
			for ($i = 0; $i < count($camposvalores[1]); $i++) {
				$stmt->bindParam(":" . $i, $camposvalores[1][$i]);
			}

			$stmt->execute();
		} catch (PDOException $e) {
			$logMaker = new LogMaker();
			$logMaker->createErrorLogFile($e);
		}
	}

	function delete($tabela, $campo, $value)
	{
		try {
			$sql = "DELETE FROM {$tabela} WHERE {$campo} = :value";
			$stmt = $this->con->prepare($sql);
			$stmt->bindValue(":value", $value);
			$stmt->execute();
		} catch (PDOException $e) {
			$logMaker = new LogMaker();
			$logMaker->createErrorLogFile($e);
		}
	}

	function update($tabela, $campo, $value, $condition)
	{
		try {
			$sql = "UPDATE {$tabela} SET {$campo} = :value {$condition}";
			$stmt = $this->con->prepare($sql);
			$stmt->bindValue(":value", $value);
			$stmt->execute();
		} catch (PDOException $e) {
			$logMaker = new LogMaker();
			$logMaker->createErrorLogFile($e);
		}
	}

	//recebe uma string tabela, um array de valores, e uma string condicao
	function select($tabela, array $valores, $condicao = "")
	{
		try {
			$todosValores = "";

			for ($i = 0; $i < count($valores); $i++) {
				if ($i == count($valores) - 1) {
					$todosValores .= $valores[$i];
					break;
				}

				$todosValores .= $valores[$i] . ", ";
			}

			$sql = "SELECT {$todosValores} FROM {$tabela} {$condicao}";
			$stmt = $this->con->prepare($sql);
			$stmt->execute();

			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			$logMaker = new LogMaker();
			$logMaker->createErrorLogFile($e);
		}
	}
}
