edit = false;
var typeCalc = [];
var calcs = [];


var selectTypeCalc = "";                        // выбранный калькулятор
var listElemsConstructor = [];
var id_div_TypesCalcs = "#typeCalcs";
var id_div_Constructor = "#constructor";
var id_div_Result = "#div_result";

// Получить значение из командной строки
// $.urlParam = function(name){
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (results == null){
//         return null;
//     }
//     else{
//         return decodeURI(results[1]) || 0;
//     }
// };



var url_edit_ajax= "editCalcAjax";

// получение списка калькуляторов
function loadCalcs() {

    var search = { query: "GET", typeCalc: "ALL" };         // запрос для сервера

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        success: function (data) {
            console.log("SUCCESS: ", data);
            calcs = JSON.parse(JSON.stringify(data, null, 4));
            displayCalcs();
        },
        error: function (e) { console.log("ERROR: ", e); },
        done: function (e) { console.log("DONE: ", e); }
    });
}

// отображение калькуляторов
function displayCalcs() {
    $(id_div_TypesCalcs).empty();        // отчистка содержимого
    $(id_div_Constructor).empty();        // отчистка содержимого

    // создание и заполнение блока
    var div = $('<div>', {class: "border1"});
    for (var i = 0; i < calcs.length; i++)
        div.append($('<div>', {class: "border", text: calcs.name}))
            .append($('<button id="' + i + '" onclick="displayCalc(id);">' + calcs[i].name + '</button>'))
            .append($('<button id="' + i + '" onclick="editCalc(id);">Редактировать</button>'))
            .append($('<button id="' + i + '" onclick="deleteCalc(id);">Удалить</button>'))
    div.appendTo(id_div_TypesCalcs);
}

// отображение элементов выбранного калькулятора
function displayCalc(index) {
    selectTypeCalc = index;
    updateConstructor();
}
function deleteCalc(index) {
    var search = {
        typeCalc: $(calcs[selectTypeCalc])[0].type,
        query: "DEL",
        index: index };

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
            result();
        },
        error: function (data) {
            success = false;
            console.log("ERROR: ", data);
            errorResult = data.responseText;
            $(id_div_Result).empty();
            result();
        },
        done: function (e) { console.log("DONE: ", e); }
    });
}

// Отображение конструктора
function updateConstructor() {

    $(id_div_Constructor).empty();  // отчистка блока
    $(id_div_Result).empty();

    switch($(calcs[selectTypeCalc])[0].type) {
        case "Осаго":
            elements();                 // остальные элементы
            buttons();
            result();                   // результат
            break;
        case "Кредит":
        case "Ипотека":
            elements();
            buttons();
            result();
            break;
        case "Кредит":
            break;
        case "Вклады":
            break;
        default: break;
    }
}


// Название калькулятора
function nameCalc() {

    console.log($(calcs[selectTypeCalc])[0]);
    var name = $(calcs[selectTypeCalc])[0].name;
    //var button = $('<button id="' + name + '" onclick="saveName(id);">Сохранить</button>');

    var div = $('<div>', {class: "border1"});
    div.append($('<div>', {class: "border", text: "Название калькулятора: "}))
        .append($('<input class="inputElem" id="' + name + '" type="text" value="' + name + '">'))
        // + '" onchange="onChangeElemCountry(id, value)">'))
        //.append(button)
        .appendTo(id_div_Constructor);
}

function elements() {
    var elements = $(calcs[selectTypeCalc])[0].elements;
    for (var j = 0; j < elements.length; j++) {
        var elem = elements[j];
        switch (elements[j].type) {
            case "input":                 displayInput(elem);                 break;
            case "select":                displaySelect(elem);                break;
            case "slider":                displaySlider(elem);                break;
            case "radio":                 displayRadio(elem);                 break;
            case "listCheckbox":          displayListCheckbox(elem);          break;
            default:                                                          break;
        }
    }
}

function buttons() {

    var div11 = $('<div>', {id: "computeRes", class: "border1"});
    div11.append($('<button type="submit" id="btnSave" onclick="computeCalc();">Вычислить</button>'));

    var div = $('<div>', {id: "res", class: "border1"});
    div.append(div11).appendTo(id_div_Constructor);
}

// Расчет
var success = false;        // удачный ли запрос
var inputData = [];         // входные данные запроса
var outputData = [];        // выходные данные запроса
var errorResult = "";
function result() {

    var div1 = $('<div>');
    var out;
    var type = $(calcs[selectTypeCalc])[0].type;
    console.log(type);
    switch (type) {
        case "Осаго":
            out = $('<div>', {class: "border", text: outputData});
            break;
        case "Кредит":
        case "Ипотека":
            if (!success)
                out = $('<div>', {class: "border", text: errorResult});
            else {
                out = $('<table border="1">');
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
    div1.append(out).appendTo(id_div_Result);
}


function displayListCheckbox(elem) {

    var div = $('<div>', {class: "border1", id: "_cbs_" });
    div.append($('<div class="border">' + elem.name + " (" + elem.idName + ")" + '</div>'))

    for (var i = 0; i < $(elem.info.list).length; i++) {
        div.append(
            $('<div class="_cb_" name="'+ $(elem.info.list)[i].name
                +'"><input class="_cb_" type="checkbox" name="'+ $(elem.info.list)[i].name +
                '" value="' + $(elem.info.list)[i].value +
                '" onclick="listCheckboxChange(this);"/>' + $(elem.info.list)[i].name + '</div>'))
            .appendTo(div);
    }
    div.appendTo(id_div_Constructor);

}

// Отображение элемента конструктора (input)
function displayInput(elem) {
    var div = $('<div>', {class: "border1"});
    div.append($('<div class="border">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        .append($('<input class="inputElem" id="' + elem.idName
            + '" type="text" value="' + elem.info.value + '" onchange="onChangeElemSlider(id, value)">'))
        .appendTo(id_div_Constructor);
}

// Отображение элемента конструктора (select)
function displaySelect(elem) {

    // формирование выпадающего списка
    var select = $('<select class="selectElem" id="' + elem.idName + '" onchange="onChangeElemSelect(id, value);"></select>');
    // заполнение выпадающего списка
    for (var i = 0; i < $(elem.info.list).length; i++)
        select.append($('<option>', { text: $(elem.info.list)[i].name, value: $(elem.info.list)[i].value }));

    // блок с выпадающим списком
    var div = $('<div>', {class: "border1"});
    div.append($('<div>', {class: "border", text: elem.name + " (" + elem.idName + ")"}))
        .append(select)
        .appendTo(id_div_Constructor);
}
// Выбор элемента из выпадающего списка (select)
function onChangeElemSelect(id, value) {
    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            $('input#val_' + id).val(elems[i].info.value = parseFloat(value));
}

// Отображение элемента конструктора (radio)
function displayRadio(elem) {
    var div = $('<div>', {class: "border1"});
    for (var i = 0; i < elem.info.list.length; i++)
        div.append(
            $('<div class="border"><input type="radio" name="' + elem.idName
                + '" id="' + elem.idName + '" value="' + elem.info.list[i].value +
                '" onclick="onChangeElemRadio(id, value);"/>' + elem.info.list[i].name + '</div>'));

    div.appendTo($(id_div_Constructor));
}
// Выбор элемента из списка (radio)
function onChangeElemRadio(id, value) {
    var elem = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elem.length; i++)
        if (elem[i].idName == id)
            elem[i].info.value = parseFloat(value);
}



// Отображение элемента конструктора (slider)
function displaySlider(elem) {
    var div = $('<div>', {class: "border1"});

    var minValue = elem.info.minValue;
    var maxValue = elem.info.maxValue;

    div.append($('<div class="border">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        .append($('<input class="input-group" id="' + elem.idName + '" type="text" ' +
            'value="' + elem.info.value + '" onchange="onChangeElemSlider(id, value)">'))
        .append($('<div class="border">Тут должен быть ползупок (slider)</div>'))
        .appendTo(id_div_Constructor);
}
// Сохранение значения (slider)
function saveSliderMinMaxValue(id, value, isMin) {
    var elems = $(calcs[selectTypeCalc].elements);  // элементы калькулятора
    value = parseFloat(value);
    for (var j = 0; j < $(elems).length; j++)       // поиск совпадения в списке с выбранным элементом
        if ($(elems)[j].idName == id)
            (isMin) ? $(elems)[j].info.minValue = value : $(elems)[j].info.maxValue = value;

}

// Изменение значения (slider)
function onChangeElemSlider(id, value) {
    var elems = $(calcs[selectTypeCalc].elements);
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
function computeCalc() {

    var list = [];
    var elems = $(calcs[selectTypeCalc])[0].elements;
    var type = $(calcs[selectTypeCalc])[0].type;

    switch (type) {
        case "Осаго":
            //list.push( {name: elems[0].idName, value: elems[0].info.value} );
            for (var j = 0; j < elems.length; j++)
                list.push({name: elems[j].idName, value: elems[j].info.value});
            break;
        case "Кредит":
        case "Ипотека":
            list = elems;
            break;
    }


    var search = {
        typeCalc: $(calcs[selectTypeCalc])[0].type,
        query: "RES",
        list: list ,
        name: $(calcs[selectTypeCalc])[0].name};

    console.log(search);

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
            result();
        },
        error: function (data) {
            success = false;
            console.log("ERROR: ", data);
            errorResult = data.responseText;
            $(id_div_Result).empty();
            result();
        },
        done: function (e) { console.log("DONE: ", e); }
    });
}