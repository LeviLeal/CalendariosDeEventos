<?php 
include "banco.php";

$banco = new Banco();

session_start();

if(isset($_POST["dia"]) &&
	isset($_POST["mes"]) &&
	isset($_POST["ano"])
)
{
	$dia = $_POST["dia"];
	$mes = $_POST["mes"];
	$ano = $_POST["ano"];

	$eventDate = new DateTime($ano . "-" . $mes . "-" . $dia);

	$eventDados = $banco->select("cal_eventos", ["*"], "WHERE id_users = " . $_SESSION["id"] . " AND YEAR(data_hora) = " . $ano . " AND MONTH(data_hora) = " . $mes . " AND DAY(data_hora) = " . $dia);

	$eventoToNotif = [];

	foreach ($eventDados as $event) 
	{
		$notifDados = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"] . " AND status = 'p'");

		if(count($notifDados) > 0)
		{
			array_push($eventoToNotif, $event);
		}
	}

	$valores = "";

	if (!empty($eventoToNotif))
	{
		foreach ($eventoToNotif as $event)
		{
			echo $event["titulo"] . "/////";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			echo str_replace(" ", "_____", str_replace("\r\n", "-----", $event["mensagem"])) . "=====";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event) 
		{
			echo $event["id"] . "#####";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			$notifcs = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"] . " AND YEAR(data_hora) = " . $ano . " AND MONTH(data_hora) = " . $mes . " AND DAY(data_hora) = " . $dia);

			$pessoas = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"]);

			if(count($notifcs) != 0)
			{
				echo count($pessoas) / count($notifcs) . "*****";
			}

			else
			{
				$pessoaDate = explode(" ", $pessoas[0]["data_hora"]);
				$notifDate = new DateTime($pessoaDate[0]);
				$interval = $notifDate->diff($eventDate);

				echo $interval->d + 1 . "*****";
			}
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			$notifs = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"]);

			$horario = explode(" ", $notifs[0]["data_hora"]);
			$horarioExp = explode(":", $horario[1]);
			$hora = $horarioExp[0];
			$minuto = $horarioExp[1];
			$segundo = $horarioExp[2];

			$notifsToCompare = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"] . " AND data_hora != " . $ano . $mes . $dia . $hora . $minuto . $segundo);

			if (count($notifs) == count($notifsToCompare))
				echo "s¢¢¢¢¢";
			else
				echo "n¢¢¢¢¢";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			$notifcs = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"]);
			$dataHora = explode(" ", $notifcs[0]["data_hora"]);
			$dataHora = explode(":", $dataHora[1]);
			$dataHora = $dataHora[0] . ":" . $dataHora[1];

			echo $dataHora . "£££££";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			$notifs = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"]);

			$pessoas = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"] . " AND YEAR(data_hora) = " . $ano . " AND MONTH(data_hora) = " . $mes . " AND DAY(data_hora) = " . $dia);


			if(count($pessoas) == 0)
			{
				foreach ($notifs as $pes)
				{
					echo str_replace(" ", "₢", $pes["nome"]) . "₢-₢" . $pes["email"] . "₢-₢" . $pes["telefone"] . "@@@@@";
				}
			}

			else
			{
				for($i = 0; $i < count($pessoas); $i++)
				{
					echo str_replace(" ", "₢", $pessoas[$i]["nome"]) . "₢-₢" . 
					$pessoas[$i]["email"] . "₢-₢" . 
					$pessoas[$i]["telefone"] . "@@@@@";
				}
			}

			echo "§§§§§";
		}

		echo "&&&&&";

		foreach ($eventoToNotif as $event)
		{
			echo $event["mensal"] . "¬¬¬¬¬";
		}
	}
}
?>