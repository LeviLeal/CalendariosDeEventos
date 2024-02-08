$(document).ready(function() {
    let currentYear = $(".jqyc-year").text();
    let saveEvent = document.getElementById("save");
    let addPessoa = document.getElementById("adicionar");
    let deleteEvent = document.getElementById("delete");

    addPessoa.addEventListener("click", function()
    {
        //Pega o telefone sem a máscara//
        let telefone = removeMask($("#tel-pessoa").val());
        let email = $("#email-pessoa").val();

        //Verifica se nenhum campo do formulário de adicionar pessoas está vazio//
        if($("#nome-pessoa").val() != "" && $("#email-pessoa").val() != "" && $("#tel-pessoa").val() != "" && telefone.length == 11 && email.includes("@") == true)
        {
            $("#list-pessoas").append("<div id='div-pessoa'><input id='pessoaToNotif' class='input-pessoa' name='dadosPessoa[]' value='" + 
                scriptRegex($("#nome-pessoa").val()) + 
                " - " + 
                scriptRegex($("#email-pessoa").val()) + 
                " - "  + 
                scriptRegex(removeMask($("#tel-pessoa").val())) + 
                "' class='div' readonly></input><p id='delete-pessoa' class='delete-buttom' onClick='$(this).parent().remove();'>X</p></div>");

            $("#popup-pessoa input").val("");
            $("#add-pessoa-alert").show();
            $("#add-pessoa-alert").text("Pessoa adicionada ao evento");
        }

        //Se algum campo estiver vazio, alerta o usuario para preencher todos os campos//
        else if($("#nome-pessoa").val() == "" || $("#email-pessoa").val() == "" || $("#tel-pessoa").val() == "" || telefone.length < 10 || email.includes("@") == true)
        {
            $("#add-pessoa-alert").show();
            $("#add-pessoa-alert").text("Preencha todos os campos");
        }

        //Se o padrão de email estiver errado, alerta o usuário para corrigi-lo//
        else if(email.includes("@") == false)
        {
            $("#add-pessoa-alert").show();
            $("#add-pessoa-alert").text("Endereço de email inválido");
        }
    });

    saveEvent.addEventListener("click", function(event)
    {
        let listPessoas = document.getElementById("list-pessoas");

        //Previne que o evento seja salvo sem nenhuma pessoa adicionada//
        if(!listPessoas.hasChildNodes())
        {
            $(".aviso").remove();
            $("#div-close").append("<p class='aviso'>Adicione pelo menos uma pessoa ao evento</p>");
        }

        else if($("#title").val() == "" || 
            $("#message").val() == "" || 
            $("#dia_interval").val() == "" || 
            $("#notifHour").val() == "")
        {
            $(".aviso").remove();
            $("#div-close").append("<p class='aviso'>Preencha todos os campos do formulário</p>");
        }

        else
        {
            $(".aviso").remove();

            let pessoas = document.getElementsByClassName("input-pessoa");
            let dadosPessoa = [];

            for(let i = 0; i < pessoas.length; i++)
            {
                dadosPessoa.push(pessoas[i].value);
            }

            let dados = new FormData();

            dados.append("titulo", $("#title").val());
            dados.append("data_hora", $("#datetime").val());
            dados.append("eventId", $("#event-id").val());
            dados.append("mensagem", $("#message").val());
            dados.append("dayInterval", $("#dia_interval").val());

            if($("#oneNotif").is(':checked'))
                dados.append("apenasUmDia", "true");
            else
                dados.append("apenasUmDia", "false");

            dados.append("horarioNotif", $("#notifHour").val());
            dados.append("dadosPessoa[]", dadosPessoa);

            if($("#mensalNotif").is(':checked'))
                dados.append("mensal", "s");
            else
                dados.append("mensal", "n");

            if($("#event-id").val() == "nenhum")
                dados.append("action", "Salvar");
            else
                dados.append("action", "Atualizar");

            $.ajax({
                url: "salvar_evento.php",
                method: "post",
                data: dados,
                processData: false,
                contentType: false,
                success: function(resposta) 
                {   
                    if(resposta == "true")
                    {
                        alert("Evento salvo com sucesso!");
                        location.reload();
                    }

                    else
                    {
                        $(".aviso").remove();
                        alert(resposta);
                        //$("#div-close").append("<p class='aviso'>O título do evento já está sendo usado.</p>");
                    }
                },

                error: function(error)
                {
                    console.log(error);
                }
            });
        }
    });

    deleteEvent.addEventListener("click", function(event)
    {
        let listPessoas = document.getElementById("list-pessoas");

        //Previne que o evento seja salvo sem nenhuma pessoa adicionada//
        if(!listPessoas.hasChildNodes())
        {
            alert("Adicione pelo menos uma pessoa ao evento");
        }

        else
        {
            let pessoas = document.getElementsByClassName("input-pessoa");
            let dadosPessoa = [];

            for(let i = 0; i < pessoas.length; i++)
            {
                dadosPessoa.push(pessoas[i].value);
                console.log(pessoas[i].value);
            }

            let dados = new FormData();

            dados.append("titulo", $("#title").val());
            dados.append("data_hora", $("#datetime").val());
            dados.append("eventId", $("#event-id").val());
            dados.append("mensagem", $("#message").val());
            dados.append("dayInterval", $("#dia_interval").val());

            if($("#oneNotif").is(':checked'))
                dados.append("apenasUmDia", "true");
            else
                dados.append("apenasUmDia", "false");

            dados.append("horarioNotif", $("#notifHour").val());
            dados.append("dadosPessoa[]", dadosPessoa);
            dados.append("action", "Deletar");

            $.ajax({
                url: "salvar_evento.php",
                method: "post",
                data: dados,
                processData: false,
                contentType: false,
                success: function(resposta) 
                {
                    alert("Evento deletado com sucesso!");
                    location.reload();
                },

                error: function(error)
                {
                    console.log(error);
                }
            });
        }
    });
});