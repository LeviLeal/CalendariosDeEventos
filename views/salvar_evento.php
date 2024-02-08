<?php 

include "sendZap.php";
include "filtros.php";

session_start();

$filter = new Filters();
$banco = new ZapNotifier();

if(isset($_POST["data_hora"]))
{
	$exData = explode(" ", $_POST["data_hora"]);
}

$dia = $exData[0];
$mes = $exData[1];
$ano = $exData[2];

$dataToNotifInsert = $ano . "-" . $mes . "-" . $dia;
$dataInsert = $ano . $mes . $dia . "000000";

if(isset($_POST["action"]))
{
	if($_POST["action"] == "Salvar")
	{
		if(
			isset($_POST["data_hora"]) &&
			isset($_POST["mensagem"]) &&
			isset($_POST["titulo"]) &&
			isset($_POST["dayInterval"]) &&
			isset($_POST["horarioNotif"]) &&
			isset($_POST["dadosPessoa"]) &&
			isset($_POST["apenasUmDia"]) &&
			isset($_POST["mensal"]))
		{	
			$mensagem = $filter->filterString($_POST["mensagem"]);
			$titulo = $filter->filterString($_POST["titulo"]);
			$mensal = $_POST["mensal"];

			$dataToReplace = [];
			$dia;
			$horario = str_replace(":", "", $_POST["horarioNotif"]) . "00";

			for ($i = -1; $i < $_POST["dayInterval"]; $i++) 
			{ 
				array_push($dataToReplace, date("Y/m/d", mktime(0, 0, 0, $mes, $dia, $ano)));
				$dia -= 1;
			}

			$dataNotifInsert = [];

			foreach ($dataToReplace as $data) {
				$data = str_replace("/", "", $data) . $horario;
				array_push($dataNotifInsert, $data);
			}

			$dadosPessoa = explode(",", $_POST["dadosPessoa"][0]);
			$pessoas = [];

			foreach ($dadosPessoa as $pessoa) {
				$exPessoa = explode(" - ", $pessoa);

				array_push($pessoas, ["nome" => $filter->filterString($exPessoa[0]), 
					"email" => $filter->filterString($exPessoa[1]), 
					"telefone" => $filter->filterString($exPessoa[2])]);
			}

			$onlyAtDay = ($_POST["apenasUmDia"] == "true") ? true : false;

			if($banco->titleUsed($titulo, $_SESSION["id"], $dataInsert) == false)
			{
				$banco->insertNotification(
					$_SESSION["id"], 
					$pessoas, 
					$titulo, 
					$mensagem, 
					$dataNotifInsert, 
					$dataInsert,
					$onlyAtDay, 
					$mensal
				);

				echo "true";
			}

			else
				echo "false";
		}
	}

	if($_POST["action"] == "Atualizar")
	{
		if(
			isset($_POST["data_hora"]) &&
			isset($_POST["mensagem"]) &&
			isset($_POST["titulo"]) &&
			isset($_POST["dayInterval"]) &&
			isset($_POST["horarioNotif"]) &&
			isset($_POST["dadosPessoa"]) &&
			isset($_POST["eventId"]) &&
			isset($_POST["apenasUmDia"]))
		{
			$mensagem = $filter->filterString($_POST["mensagem"]);
			$titulo = $filter->filterString($_POST["titulo"]);
			$mensal = $_POST["mensal"];

			$dataToReplace = [];
			$dia;
			$horario = str_replace(":", "", $_POST["horarioNotif"]) . "00";

			for ($i = -1; $i < $_POST["dayInterval"]; $i++) 
			{ 
				array_push($dataToReplace, date("Y/m/d", mktime(0, 0, 0, $mes, $dia, $ano)));
				$dia -= 1;
			}

			$dataNotifInsert = [];

			foreach ($dataToReplace as $data) {
				$data = str_replace("/", "", $data) . $horario;
				array_push($dataNotifInsert, $data);
			}

			$dadosPessoa = explode(",", $_POST["dadosPessoa"][0]);
			$pessoas = [];

			foreach ($dadosPessoa as $pessoa) {
				$exPessoa = explode(" - ", $pessoa);

				array_push($pessoas, ["nome" => $exPessoa[0], "email" => $exPessoa[1], "telefone" => $exPessoa[2]]);
			}

			$onlyAtDay = ($_POST["apenasUmDia"] == "true") ? true : false;

			$banco->deleteNotif("cal_eventos", "id", $_POST["eventId"]);

			$banco->insertNotification(
				$_SESSION["id"], 
				$pessoas, 
				$titulo, 
				$mensagem, 
				$dataNotifInsert, 
				$dataInsert,
				$onlyAtDay,
				$mensal
			);

			echo "true";
		}

		else
		{
			echo "false";
		}
	}
}

if($_POST["action"] == "Deletar" && isset($_POST["eventId"]))
{	
	$banco->deleteNotif("cal_eventos", "id", $_POST["eventId"]);
}
?>