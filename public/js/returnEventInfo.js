$('.calendar').on('jqyc.dayChoose', function(event) {
    let titulo = document.getElementById("title");
    let mensagem = document.getElementById("message");
    let eventId = document.getElementById("event-id");
    let dayInterval = document.getElementById("dia_interval");
    let oneNotif = document.getElementById("oneNotif");
    let notifHour = document.getElementById("notifHour");

    $("#event-id").val("nenhum");

    var choosenYear = $(this).data('year');

    var choosenMonth = $(this).data('month');
    if(choosenMonth < 10)
        choosenMonth = "0" + choosenMonth;

    var choosenDay = $(this).data('day-of-month');
    if(choosenDay < 10)
        choosenDay = "0" + choosenDay;

    $("#eventDay").text(choosenDay + "/" + choosenMonth + "/" + choosenYear);

    let dados = new FormData();
    dados.append("dia", choosenDay);
    dados.append("mes", choosenMonth);
    dados.append("ano", choosenYear);

    let retorno;

    //Retorna os dados dos eventos do dia//
    $.ajax({
        url: "return_event_info.php",
        method: "post",
        data: dados,
        processData: false,
        contentType: false,
        success: function(resposta) {
            console.log(resposta);
            //Remove os <p> e <hr>
            $(".hr_evento").remove();
            $(".evento").remove();

            //Verifica se o retorno não foi vazio//
            if(resposta != "")
            {
                $("#events").append("<hr class='hr_evento' style='background-color: white;'>");
                //Divide a resposta por categorias: titulos, mensagens, ids, dayIntervals, oneNotifs, notifHours, Pessoas//
                resposta = resposta.split("&&&&&");
                console.log(resposta);
                let titulos = resposta[0].split("/////");
                let mensagens = resposta[1].split("=====");
                let ids = resposta[2].split("#####");
                let dayInterval = resposta[3].split("*****");
                let oneNotif = resposta[4].split("¢¢¢¢¢");
                let notifHour = resposta[5].split("£££££");
                let eventosPessoas = resposta[6].split("§§§§§");
                let mensal = resposta[7].split("¬¬¬¬¬");
                console.log(mensal);

                let pessoas = [];

                eventosPessoas.forEach(eventPes =>{
                    pessoas.push(eventPes.split("@@@@@"));
                });

                let event = [];

                //Adiciona os dados dos eventos no array event por ordem//
                for(let i = 0; i + 1 < titulos.length; i++)
                {
                    event.push(titulos[i], mensagens[i], ids[i], dayInterval[i], oneNotif[i], notifHour[i], eventosPessoas[i], mensal[i]);
                }

                let index = 0;

                //Adiciona ao popup uma tabela com todos os titulos dos eventos no formulário #list-events//
                for(let i = 0; i + 1 < titulos.length; i++)
                {   
                    if(i + 2 < titulos.length)
                    {
                        appendTitle(event[0 + index], event[1 + index], event[2 + index], event[3 + index], event[4 + index], event[5 + index], event[6 + index], event[7 + index], i);

                        $("#events").append("<hr class='hr_evento' style='background-color: white;'>");
                    }

                    else
                    {
                        appendTitle(event[0 + index], event[1 + index], event[2 + index], event[3 + index], event[4 + index], event[5 + index], event[6 + index], event[7 + index], i);
                    }

                    index += 8;
                }

                let eventos = document.getElementsByClassName("evento");

                //Seta os valores dos inputs do formulário #form-evento com as informações do evento selecionado//
                for(let i = 0; i < eventos.length; i++)
                {
                    eventos[i].addEventListener("click", function()
                    {
                        hideThisShowAnother($("#list-events"), $("#form-evento"));
                        $("#save").val("Atualizar");
                        $("#delete").show();

                        let pessoas;
                        pessoas = $("#e_" + i).attr("data-peoples").replace(/[#₢]/g, " ");

                        pessoas = pessoas.split("@@@@@");

                        $(titulo).val($("#e_" + i).text());

                        let rawMessage = $("#e_" + i).attr("data-mensagem");
                        let newMessage = rawMessage.replace(/-----/g, "\n");
                        newMessage = newMessage.replace(/_____/g, " ");

                        $(mensagem).val(newMessage);
                        $(eventId).val($("#e_" + i).attr("data-id"));
                        $("#dia_interval").val(parseInt($("#e_" + i).attr("data-dayinterval"), 10) - 1);

                        if($("#e_" + i).attr("data-onenotif") == "s")
                            $("#oneNotif").prop( "checked", true);
                        else
                            $("#oneNotif").prop( "checked", false);

                        if($("#e_" + i).attr("data-mensal") == "s")
                            $("#mensalNotif").prop( "checked", true);
                        else
                            $("#mensalNotif").prop( "checked", false);

                        $("#notifHour").val($("#e_" + i).attr("data-notifhour"));

                        $("#list-pessoas").empty();

                        for(let i = 0; i + 1 < pessoas.length; i++)
                        {
                            $("#list-pessoas").append("<div id='div-pessoa'><input id='pessoaToNotif' name='dadosPessoa[]' value='" + pessoas[i] + "' class='input-pessoa' readonly></input><p id='delete-pessoa' onClick='$(this).parent().remove();'>X</p></div>");
                        }
                    });
                }
            }

            //Mostra o formulário de evento//
            showPopup(choosenDay, choosenMonth, choosenYear);
        },
        error: function(error) {
            console.log(error);
        }
    });
});