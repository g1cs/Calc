

var typeCalc = [];
var userCalcs = [];


var selectIndexCalc;
var selectTypeCalc;                        // выбранный калькулятор
var listElemsConstructor = [];
var listCalcs = [];                        // список имеющихся калькуляторов

var div_TypesCalcs = "typeCalcs";
var div_ListElemCalcs = "elementsCalcs";
var div_Constructor = "constructor";
var div_Result = "div_result";
var id_div_TypesCalcs = "#" + div_TypesCalcs;
var id_div_ListElemCalcs = "#" + div_ListElemCalcs;
var id_div_Constructor = "#" + div_Constructor;
var id_div_Result = "#" + div_Result;

var url_edit_ajax= "editCalcAjax";
var url_getCalc = "getCalcFromThirdParty";

jQuery(document).ready(function($) {

    var div = $("div.calc");
    var id = $(div).attr("id");

    div.empty();
    div.append($('<div class="col-sm-8 col-sm-offset-3">' +
        // '<div class="" id="typeCalcs"></div>' +
        // '<div class="" id="elementsCalcs"></div>' +
        '<div class="" id="constructor"></div>' +
        '<div class="resultat" id="div_result"></div>' +
        '</div>'));

    var search = { idCalc: id };         // запрос для сервера

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_getCalc,
        data : JSON.stringify(search),
        dataType : 'json',
        async: false,
        success: function (data) {
            console.log("SUCCESS: ", data);
            selectIndexCalc = 0;
            userCalcs[selectIndexCalc] = JSON.parse(JSON.stringify(data, null, 4));
            selectTypeCalc = userCalcs[selectIndexCalc].type;
            displayConstructorCalc(); // получаю list_displayUserCalcs
        },
        error: function (e) { console.log("ERROR: ", e); },
        done: function (e) { console.log("DONE: ", e); }
    });
});



$(document).ready(function() {
    $("#slider").slider({
        range: "min",
        animate: true,
        value:100,
        min: 10,
        max: 1000,
        step: 10,
        slide: function(event, ui) {
            update(1,ui.value); //changed
        }
    });
    update(1, 100);


    $("#slider2").slider({
        range: "min",
        animate: true,
        value:1,
        min: 1,
        max: 365,
        step: 1,
        slide: function(event, ui) {
            update(2,ui.value); //changed
        }
    });
    update(2, 100);

    //Added, set initial value.
    $("#amount").val(0);
    $("#duration").val(0);
    $("#amount-label").text(0);
    $("#duration-label").text(0);

    update();
});





// Отображение конструктора
function displayConstructorCalc() {

    $(id_div_Constructor).empty();
    $(id_div_Result).empty();
    $(id_div_Result).css("display", "none");

    nameCalcFromCalc();

    switch($(userCalcs)[selectIndexCalc].type) {
        case "Осаго":
            // elementsFromCalc();
            // buttonCompute();
            // result();
            // break;
        case "Кредит":
        case "Ипотека":
            elementsFromCalc();
            buttonCompute();
            result();
            break;
        default: break;
    }
}



// Название калькулятора
function nameCalcFromCalc() {

    var name = $(userCalcs[selectIndexCalc])[0].name;
    var div = $('<div>', {class: ""});
    div.append($('<div>', {class: "nameCalc names", text: "Название калькулятора: "}))
        .append($('<input class="inputElem stylelable" id="' + name + '" type="text" value="' + name + '">'))
        .appendTo(id_div_Constructor);
}
// Элементы
function elementsFromCalc() {
    var elements = $(userCalcs)[selectIndexCalc].elements;
    for (var j = 0; j < elements.length; j++) {
        var elem = elements[j];
        switch (elem.type) {
            case "input":                 displayInputFromCalc(elem);                 break;
            case "select":                displaySelectFromCalc(elem);                break;
            case "slider":                displaySliderFromCalc(elem);                break;
            case "radio":                 displayRadioFromCalc(elem);                 break;
            case "listCheckbox":          displayListCheckboxFromCalc(elem);          break;
            default:                                                                  break;
        }
    }
}

function buttonCompute() {
    var mainDiv = $('<div>', {id: "res", class: "test"});
    var divCompute = $('<div id="computeRes" class="buttonCompute">');
    var buttonCompute = $('<button class="result" id="btnCompute" onclick="computeCalcFromCalc();">Вычислить</button>');
    divCompute.append(buttonCompute);
    mainDiv.append(divCompute).appendTo(id_div_Constructor);
}




function displayListCheckboxFromCalc(elem) {

    var div = $('<div>', {class: "displayListCheckbox", id: "_cbs_" });
    div.append($('<div class="">' + elem.name + " (" + elem.idName + ")" + '</div>'))

    for (var i = 0; i < $(elem.info.list).length; i++) {
        div.append(
            $('<div class="displayInput2" name="'+ $(elem.info.list)[i].name
                +'"><input class="" type="checkbox" name="'+ $(elem.info.list)[i].name +
                '" value="' + $(elem.info.list)[i].value +
                '" onclick="listCheckboxChange(this);"/>' + $(elem.info.list)[i].name + '</div>'))
            .appendTo(div);
    }
    div.appendTo(id_div_Constructor);

}
// Отображение элемента конструктора (input)
function displayInputFromCalc(elem) {
    var div = $('<div>', {class: ""});
    div.append($('<div class="displayInput names">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        .append($('<input class="inputElem stylelable" id="' + elem.idName
            + '" type="text" value="' + elem.info.value + '" onchange="onChangeElemSliderFromCalc(id, value)">'))
        .appendTo(id_div_Constructor);
}

// Отображение элемента конструктора (select)
function displaySelectFromCalc(elem) {

    // формирование выпадающего списка
    var select = $('<select class="selectElem stylelable" id="' + elem.idName +
        '" onchange="onChangeElemSelectFromCalc(id, value);"></select>');
    // заполнение выпадающего списка
    for (var i = 0; i < $(elem.info.list).length; i++)
        select.append($('<option>', { text: $(elem.info.list)[i].name, value: $(elem.info.list)[i].value }));

    // блок с выпадающим списком
    var div = $('<div>', {class: ""});
    div.append($('<div>', {class: "displaySelect names", text: elem.name + " (" + elem.idName + ")"}))
        .append(select)
        .appendTo(id_div_Constructor);
}
// Выбор элемента из выпадающего списка (select)
function onChangeElemSelectFromCalc(id, value) {
    var elems = $(userCalcs)[selectIndexCalc].elements;
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            $('input#val_' + id).val(elems[i].info.value = parseFloat(value));
}

// Отображение элемента конструктора (radio)
function displayRadioFromCalc(elem) {
    var div = $('<div>', {class: ""});
    for (var i = 0; i < elem.info.list.length; i++)
        div.append(
            $('<div class="displayInput1"><input type="radio" name="' + elem.idName
                + '" id="' + elem.idName + '" value="' + elem.info.list[i].value +
                '" onclick="onChangeElemRadioFromCalc(id, value);"/>' + elem.info.list[i].name + '</div>'));

    div.appendTo($(id_div_Constructor));
}
// Выбор элемента из списка (radio)
function onChangeElemRadioFromCalc(id, value) {
    var elem = $(userCalcs)[selectIndexCalc].elements;
    for (var i = 0; i < elem.length; i++)
        if (elem[i].idName == id)
            elem[i].info.value = parseFloat(value);
}

// Отображение элемента конструктора (slider)
function displaySliderFromCalc(elem) {

    var idSlider = "slider" + elem.idName;
    var slider = $('<div id="'+idSlider+'">Slider</div>');

    var div = $('<div>', {class: ""});
    div.append($('<div class="displaySlider names">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        .append($('<input class="stylelable" id="' + elem.idName + '" type="text" ' +
            'value="' + elem.info.value + '" onchange="onChangeElemSliderFromCalc(id, value)">'))
        .append(slider)
        .appendTo(id_div_Constructor);

    // $('#' + idSlider).slider({
    //     range: "min",
    //     animate: true,
    //     value: 1,
    //     min: elem.info.minValue,
    //     max: elem.info.maxValue,
    //     step: 1,
    //     slide: function(event, ui) {
    //         updateSlider(elem.idName, ui.value); //changed
    //     }
    // });
    // console.log(slider);
}
// $(document).ready(function() {
//     $("#slider").slider({
//         range: "min",
//         animate: true,
//         value:100,
//         min: 10,
//         max: 1000,
//         step: 10,
//         slide: function(event, ui) {
//             updateSlider(1,ui.value); //changed
//         }
//     });
//     updateSlider(1, 100);
//
//
//     $("#slider2").slider({
//         range: "min",
//         animate: true,
//         value:1,
//         min: 1,
//         max: 365,
//         step: 1,
//         slide: function(event, ui) {
//             updateSlider(2,ui.value); //changed
//         }
//     });
//     updateSlider(2, 100);
//
//     //Added, set initial value.
//     $("#amount").val(0);
//     $("#duration").val(0);
//     $("#amount-label").text(0);
//     $("#duration-label").text(0);
//
//     updateSlider();
// });
// function updateSlider(slider,val) {
//     var formatNumber = {
//         separador: ",",
//         sepDecimal: '.',
//         formatear:function (num){
//             num +='';
//             var splitStr = num.split('.');
//             var splitLeft = splitStr[0];
//             var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
//             var regx = /(\d+)(\d{3})/;
//             while (regx.test(splitLeft)) {
//                 splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
//             }
//             return this.simbol + splitLeft  +splitRight;
//         },
//         new:function(num, simbol){
//             this.simbol = simbol ||'';
//             return this.formatear(num);
//         }
//     };
//     $('#slider'+slider+' span').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+val+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
// }



// Изменение значения (slider)
function onChangeElemSliderFromCalc(id, value) {
    var elems = $(userCalcs)[selectIndexCalc].elements;
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id) {
            value = parseFloat(value);
            if (value < elems[i].info.minValue)
                value = elems[i].info.minValue;
            else if (value > elems[i].info.maxValue)
                value = elems[i].info.maxValue;
            $('input#' + id).val(elems[i].info.value = value);
        }
}

// Расчет
function computeCalcFromCalc() {

    var list = [];
    var elems = $(userCalcs[selectIndexCalc])[0].elements;
    var type = $(userCalcs[selectIndexCalc])[0].type;

    switch (type) {
        case "Осаго":
            for (var j = 0; j < elems.length; j++)
                list.push({name: elems[j].idName, value: elems[j].info.value});
            break;
        case "Кредит":
        case "Ипотека":
            list = elems;
            break;
    }


    var search = {
        typeCalc: $(userCalcs[selectIndexCalc])[0].type,
        query: "RES",
        list: list ,
        name: $(userCalcs[selectIndexCalc])[0].name};

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        success: function (data) {
            success = true;
            console.log("SUCCESS: ", data);
            inputData = list;
            outputData = JSON.parse(JSON.stringify(data, null, 4));
            $(id_div_Result).empty();
            $(id_div_Result).css("display", "block");
            result();
        },
        error: function (data) {
            success = false;
            console.log("ERROR: ", data);
            errorResult = data.responseText;
            $(id_div_Result).empty();
            result();
            alert("Ошибка расчета");
        },
        done: function (e) { console.log("DONE: ", e); }
    });
}


// Расчет
var success = false;        // удачный ли запрос
var inputData = [];         // входные данные запроса
var outputData = [];        // выходные данные запроса
var errorResult = "";
function result() {

    var divMain = $('<div>');
    var out;
    switch (selectTypeCalc) {
        case "Осаго":
            out = $('<div>', {class: "test", text: outputData});
            break;
        case "Кредит":
        case "Ипотека":
            if (!success)
                out = $('<div>', {class: "test", text: errorResult});
            else {
                out = $('<table border="0">');
                out.append($('<tr>' +
                    '<th>№ платежа</th>' +
                    '<th>Задолжность по кредиту</th>' +
                    '<th>Начисленные проценты</th>' +
                    '<th>Основной долг</th>' +
                    '<th>Сумма платежа</th>' +
                    '</tr>'));
                for (var i = 0; i < outputData.length - 1; i++) {
                    out.append($('<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + outputData[i].sum + '</td>' +
                        '<td>' + outputData[i].debt + '</td>' +
                        '<td>' + outputData[i].rate + '</td>' +
                        '<td>' + outputData[i].payment + '</td>' +
                        '</tr>'));
                }
                out.append($('<tr>' +
                    '<td colspan="2">Итого:</td>' +
                    '<td>' + outputData[i].debt + '</td>' +
                    '<td>' + outputData[i].rate + '</td>' +
                    '<td>' + outputData[i].payment + '</td>' +
                    '</tr>'));
            }
            break;
        default: break;
    }
    divMain.append(out);
    $(id_div_Result).append(divMain);
}