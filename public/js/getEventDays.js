let currentDate = new Date().toLocaleDateString();
let splitDate = currentDate.split("/");
let diaHoje = splitDate[0];
let mesHoje;

if(splitDate[1] < 10)
    mesHoje = splitDate[1].replace("0", "");
else
    mesHoje = splitDate[1];

let anoHoje = splitDate[2];

$(document).ready(function() 
{   
    //ajax pra pegar os que dias possuem eventos//
    $.ajax({
        url: "getEventDays.php",
        method: "post",
        processData: false,
        contentType: false,
        success: function(resposta) {
            //Separa a string de datas//
            let datas = resposta.split("&&&&&");
            let dataExp;

            datas.forEach(data => {
                let itemExp = data.split(" ");

                dataExp = {
                    "dia": itemExp[0],
                    "mes": itemExp[1],
                    "ano": itemExp[2]
                }

                let days = $(".jqyc-not-empty-td");

                $.each(days, function(index, valor) {
                    if ($(valor).attr("data-day-of-month") == dataExp.dia &&
                        $(valor).attr("data-month") == dataExp.mes &&
                        $(valor).attr("data-year") == dataExp.ano) 
                    {

                        valor.style.backgroundImage = "linear-gradient(to bottom right, #ff0000, #770011)";
                        valor.style.borderRadius = "5px";
                        valor.style.color = "white";
                    }

                    if($(valor).attr("data-day-of-month") == diaHoje &&
                        $(valor).attr("data-month") == mesHoje &&
                        $(valor).attr("data-year") == anoHoje)
                    {
                        valor.style.borderRadius = "5px";
                        valor.style.backgroundColor = "#00ff0066";
                    }
                });
            });
        },

        error: function(error) {
            console.log(error);
        }
    });
});

//Ao selecionar o ano anterior//
$('.calendar').on('jqyc.changeYearToPrevious', function(event) {

    //ajax pra pegar os que dias possuem eventos//
    $.ajax({
        url: "getEventDays.php",
        method: "post",
        processData: false,
        contentType: false,
        success: function(resposta) {
            //Separa a string de datas//
            let datas = resposta.split("&&&&&");
            let dataExp;

            datas.forEach(data => {
                let itemExp = data.split(" ");

                dataExp = {
                    "dia": itemExp[0],
                    "mes": itemExp[1],
                    "ano": itemExp[2]
                }

                let days = $(".jqyc-not-empty-td");
                $.each(days, function(index, valor) {
                    if ($(valor).attr("data-day-of-month") == dataExp.dia &&
                        $(valor).attr("data-month") == dataExp.mes &&
                        $(valor).attr("data-year") == dataExp.ano) 
                    {
                        valor.style.borderRadius = "5px";
                        valor.style.backgroundImage = "linear-gradient(to bottom right, #ff0000, #770011)";
                        valor.style.color = "white";
                    }

                    if($(valor).attr("data-day-of-month") == diaHoje &&
                        $(valor).attr("data-month") == mesHoje &&
                        $(valor).attr("data-year") == anoHoje)
                    {
                        valor.style.borderRadius = "5px";
                        valor.style.backgroundColor = "#00ff0066";
                    }
                });
            });
        },

        error: function(error) 
        {
            console.log(error);
        }
    });
});

//Ao selecionar o próximo ano//
$('.calendar').on('jqyc.changeYearToNext', function(event) {

    //ajax para pegar os que dias possuem eventos//
    $.ajax({
        url: "getEventDays.php",
        method: "post",
        processData: false,
        contentType: false,
        success: function(resposta) {
            let datas = resposta.split("&&&&&");
            let dataExp;

            datas.forEach(data => {
                let itemExp = data.split(" ");

                dataExp = {
                    "dia": itemExp[0],
                    "mes": itemExp[1],
                    "ano": itemExp[2]
                }

                let days = $(".jqyc-not-empty-td");

                $.each(days, function(index, valor) {
                    if ($(valor).attr("data-day-of-month") == dataExp.dia &&
                        $(valor).attr("data-month") == dataExp.mes &&
                        $(valor).attr("data-year") == dataExp.ano) 
                    {
                        valor.style.borderRadius = "5px";
                        valor.style.backgroundImage = "linear-gradient(to bottom right, #ff0000, #770011)";
                        valor.style.color = "white";
                    }

                    if($(valor).attr("data-day-of-month") == diaHoje &&
                        $(valor).attr("data-month") == mesHoje &&
                        $(valor).attr("data-year") == anoHoje)
                    {
                        valor.style.borderRadius = "5px";
                        valor.style.backgroundColor = "#00ff0066";
                    }
                });
            });
        },

        error: function(error) {
            console.log(error);
        }
    });
});