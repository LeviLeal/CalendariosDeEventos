function hideThisShowAnother(elementHide, elementShow)
{
	elementHide.toggle();
	elementShow.toggle();
}

function showPopup(dia, mes, ano)
{
	$("#box").css('transform','scaleY(1) translate(-50%, -50%)');
	$("#list-events").show();
	$("#form-evento").hide();
	$("#datetime").val(dia + " " + mes + " " + ano);
}

function hidePopup()
{
	$("#box").css('transform','scaleY(0) translate(-50%, -50%)');
}

function appendTitle(title, mensagem, id, dayInterval, oneNotif, notifHour, peoples, mensal, index)
{
	if(title != "" && mensagem != "" && id != "")
	{
		$("#events").append("<p id='e_" + index + "'class='evento' data-mensagem=" + mensagem + 
			" data-id=" + id + " data-dayinterval=" + dayInterval + 
			" data-onenotif=" + oneNotif + 
			" data-notifhour=" + notifHour + 
			" data-peoples=" + peoples + 
			" data-mensal=" + mensal + ">" + title +
			"</p>");
	}
}

function removeMask(tel)
{
	tel = tel.replace("-", "");
	tel = tel.replace("(", "");
	tel = tel.replace(")", "");
	tel = tel.replace(" ", "");

	return tel;
}

function clearFormEvent()
{	
	$("#list-pessoas").empty();

	$("#title").val("");
	$("#message").val("");
	$("#dia_interval").val(parseInt("0"));
	$("#oneNotif").prop( "checked", false);
	$("#notifHour").val("00:00");
}