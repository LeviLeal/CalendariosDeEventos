<?php 
	include "banco.php";
	session_start();
	$banco = new Banco();

	$eventos = $banco->select("cal_eventos", ["id" ,"DAY(data_hora) as dia",
	 "MONTH(data_hora) as mes",
	  "YEAR(data_hora) as ano"], "WHERE id_users = " . $_SESSION["id"]);

	$textDias = "";

	foreach ($eventos as $event) 
	{
		$notifDados = $banco->select("cal_notificacoes", ["*"], "WHERE id_evento = " . $event["id"] . " AND status = 'p'");

		if(count($notifDados) > 0)
		{
			$textDias .= $event["dia"] . " " . $event["mes"] . " " . $event["ano"] . "&&&&&";
		}
	}

	echo $textDias;
?>