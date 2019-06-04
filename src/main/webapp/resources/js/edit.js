 edit = false;
var typeCalc = [];
var calcs = [];


var listNamesCalcs = [];                        // список имеющихся калькуляторов
var selectTypeCalc = "";                        // выбранный калькулятор
var listElemsConstructor = [];
var id_btn_Load = "#btnLoadTypeCalcs";
var id_div_listNamesCalcs = "#typeCalcs";
var id_div_ListElemCalcs = "#elementsCalcs";
var id_div_Constructor = "#constructor";
var id_div_Result = "#div_result";

// Получить значение из командной строки
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}



var url_edit = "edit";
var url_edit_ajax= "editCalcAjax";

// Получение списка калькуляторов
function loadlistNamesCalcs() {

    if (listNamesCalcs.length > 0)
        displaylistNamesCalcs();
    else {
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: url_edit_ajax,
            success: function (data) {
                console.log("SUCCESS: ", data);
                listNamesCalcs = JSON.parse(JSON.stringify(data, null, 4));
                displaylistNamesCalcs();
            },
            error: function (e) { console.log("ERROR: ", e); },
            done: function (e) { console.log("DONE: ", e); }
        });
    }
}
// Отображение списка калькуляторов
function displaylistNamesCalcs() {

    $(id_div_listNamesCalcs).empty();
    $(id_div_ListElemCalcs).empty();
    for (var i = 0; i < listNamesCalcs.length; i++) {
        $(id_div_listNamesCalcs).append(
            $('<div><input type="radio" name="typeCalc" value="' + listNamesCalcs[i] +
                '" onclick="clickElemFromListNamesCalcs(value);"/>' + listNamesCalcs[i] + '</div>')
        );
    }
}




// Отображение элементов выбранного калькулятора (загрузить и нарисовать)
function clickElemFromListNamesCalcs(value) {

    $(id_div_ListElemCalcs).empty();
    $(id_div_Constructor).empty();

    selectTypeCalc = value;

    if ($(calcs[selectTypeCalc]).length > 0)
        displayElemsSelectCalc();
    else {

        var search = { typeCalc: selectTypeCalc, query: "GET" };

        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: url_edit_ajax,
            data : JSON.stringify(search),
            dataType : 'json',
            success: function (data) {
                console.log("SUCCESS: ", data);
                calcs[selectTypeCalc] = JSON.parse(JSON.stringify(data, null, 4));
                displayElemsSelectCalc();
            },
            error: function (e) { console.log("ERROR: ", e); },
            done: function (e) { console.log("DONE: ", e); }
        });
    }
}
// Отображение элементов выбранного калькулятора
function displayElemsSelectCalc() {

    $(id_div_ListElemCalcs).empty();
    $(id_div_Result).empty();
    listElemsConstructor.splice(0, listElemsConstructor.length);

    var start = 0;
    if (selectTypeCalc == "Осаго")
        start = 1;

    console.log(calcs);
    console.log(calcs[selectTypeCalc]);
    for (var i = start; i < $(calcs[selectTypeCalc].elements).length; i++) {
        //nameElemCalcs[$(calcs[tCalc])[i].value] = data[i].name;
        console.log($(calcs[selectTypeCalc].elements)[i]);
        var checkbox = $('<div><input type="checkbox" name="elemCalc" value="'
            + $(calcs[selectTypeCalc].elements)[i].idName + //id="elemCalc' + i + '"
            '" onclick="checkboxChange(this);"/>' + $(calcs[selectTypeCalc].elements)[i].name + '</div>');
        $(id_div_ListElemCalcs).append(checkbox);
    }
}
// Выбор элемента калькулятора
function checkboxChange(checkbox) {

    if (checkbox.checked)
        listElemsConstructor.push(checkbox.value);
    else
        listElemsConstructor.splice(listElemsConstructor.indexOf(checkbox.value), 1);

    updateConstructorOsago();
}




// Отображение конструктора
function updateConstructorOsago() {

    $(id_div_Constructor).empty();  // отчистка блока
    $(id_div_Result).empty();

    nameCalc();

    switch(selectTypeCalc) {
        case "Осаго":
            basicRate();                // первый блок (базовая ставка)
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

    var name = $(calcs[selectTypeCalc])[0].name;
    var button = $('<button id="' + name + '" onclick="saveName(id);">Сохранить</button>');

    var div = $('<div>', {class: "border1"});
    div.append($('<div>', {class: "border", text: "Название калькулятора: "}))
        .append($('<input class="inputElem" id="' + name + '" type="text" value="' + name + '">'))
        // + '" onchange="onChangeElemCountry(id, value)">'))
        .append(button)
        .appendTo(id_div_Constructor);
}
// Сохранить название калькулятора
function saveName(name) {
    $(calcs[selectTypeCalc]).name = name;
}
// Базовая ставка
function basicRate() {
    displayInput($(calcs[selectTypeCalc].elements)[0]);
}
// Отображение элементов
function elements() {

    var elem = [];
    var res = [];
    for (var i = 0; i < listElemsConstructor.length; i++) {

        for (var j = 0; j < $(calcs[selectTypeCalc].elements).length; j++)
            if ($(calcs[selectTypeCalc].elements)[j].idName == listElemsConstructor[i])
                elem = $(calcs[selectTypeCalc].elements)[j];
        // for (var j = 0; j < $(calcs[selectTypeCalc].result.res).length; j++)
        //     if ($(calcs[selectTypeCalc].result.res)[j].name == listElemsConstructor[i])
        //         res = $(calcs[selectTypeCalc].result.res)[j];

         console.log(elem);
            switch (elem.type) {
                case "input":           displayInput(elem);         break;
                case "select":          displaySelect(elem);        break;
                case "slider":          displaySlider(elem);        break;
                case "radio":           displayRadio(elem);         break;
                case "listCheckbox":    displayListCheckbox(elem);  break;
                default:                                            break;
            }
    }
}

function buttons() {

    var div11 = $('<div>', {id: "computeRes", class: "border1"});
    div11.append($('<button type="submit" id="btnSave" onclick="computeCalc();">Вычислить</button>'));

    var div2 = $('<div>', {id: "saveRes", class: "border1"});
    div2.append($('<button type="submit" id="btnSave" onclick="saveCalc();">Сохранить</button>'));

    var div = $('<div>', {id: "res", class: "border1"});
    div//.append($('<div>', {class: "border", text: p.info}))
    //.append($('<div>', {class: "border", text: p.formula}))
        .append(div11).append(div2)
        .appendTo(id_div_Constructor);
}
// Расчет
var success = false;        // удачный ли запрос
var inputData = [];         // входные данные запроса
var outputData = [];        // выходные данные запроса
var errorResult = "";
function result() {

    //var p = $(calcs[selectTypeCalc].result)[0];
    //var pp = p.res;
    var res = 1.0;

    var div1 = $('<div>');
    var out;
    switch (selectTypeCalc) {
        case "Осаго":
            out = $('<div>', {class: "border", text: outputData});
            break;
        case "Кредит":
        case "Ипотека":
            console.log(outputData);
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
        .append($('<input class="inputElem" id="addCheckboxName_' + elem.idName + '" type="text" placeholder="название">'))
        .append($('<input class="inputElem" id="addCheckboxValue_' + elem.idName + '" type="text" placeholder="(-/+)0.2 процентов">'))
        .append($('<button id="' + elem.idName + '" onclick="addElemListCheckbox(id);">Добавить элемент</button>'));

    for (var i = 0; i < $(elem.info.list).length; i++) {
        div.append(
            $('<div class="_cb_" name="'+ $(elem.info.list)[i].name
                +'"><input class="_cb_" type="checkbox" name="'+ $(elem.info.list)[i].name +
                '" value="' + $(elem.info.list)[i].value + //id="elemCalc' + i + '"
                '" onclick="listCheckboxChange(this);"/>' + $(elem.info.list)[i].name
                + '<button id="' + $(elem.info.list)[i].name
                + '" onclick="deletElemListCheckbox(id);">Удалить элемент</button></div>'))
            .appendTo(div);
    }
    div.appendTo(id_div_Constructor);

}
function deletElemListCheckbox(id) {

    var divs = $('div._cb_');
    for (var j = 0; j < $(calcs[selectTypeCalc].elements).length; j++) {
        var elem = $(calcs[selectTypeCalc].elements)[j];
        for (var i = 0; i < $(elem.info.list).length; i++) {
            if ($(elem.info.list)[i].name == id) {
                elem.info.list.splice(i, 1);  // удаление элемента

                // удаление блока
                for (var i = 0; i < $(divs).length; i++)
                    if ($($(divs)[i]).attr('name') == id)
                        $(divs)[i].remove();
            }
        }
    }
}
function addElemListCheckbox(id) {
    var name = $("#addCheckboxName_" + id).val();
    var value = parseFloat($("#addCheckboxValue_" + id).val());

    var elems = $(calcs[selectTypeCalc].elements);
    for (var j = 0; j < $(elems).length; j++)
        if (elems[j].idName == id)
            elems[j].info.list.push( {name: name, value: value} );

    $('div#_cbs_')
        .append(
            $('<div class="_cb_" name="'+ name
                +'"><input class="_cb_" type="checkbox" name="'+ name +
                '" value="' + value + //id="elemCalc' + i + '"
                '" onclick="listCheckboxChange(this);"/>' + name
                + '<button id="' + name
                + '" onclick="deletElemListCheckbox(id);">Удалить элемент</button></div>'));
}
function listCheckboxChange(checkbox) {
    console.log(checkbox);
}


// Отображение элемента конструктора (input)
function displayInput(elem) {

//    var button = $('<button id="' + elem.idName + '" onclick="saveElementInput(id);">Сохранить</button>');
    var div = $('<div>', {class: "border1"});
    // $('<div class="border" id="i-have-a-tooltip" data="' + elem.info.info + '">' + elem.name + " (" + elem.idName + ")" + '</div>')
    div
        .append($('<div class="border">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        //    + '<div id="i-have-a-tooltip" data="' + elem.info.text + '"><span>i</span></div></div>'))
        .append($('<input class="inputElem" id="' + elem.idName + '" type="text" value="' + elem.info.value //+ '">'))
            + '" onchange="saveElemInput(id, value)">'))
        //.append(button)
        .appendTo(id_div_Constructor);
}
// Сохранить элемент (input)
function saveElemInput(id, value) {
    //var input = "input#" + id;
    var elems = $(calcs[selectTypeCalc].elements);
    console.log(elems);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            elems[i].info.value = parseFloat(value);
}
// Изменение значения (input)
function onChangeElemInput(id, value) {
    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            $('input#' + id).val(elems[i].info.value = parseFloat(value));
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
    div
        //.append($('<div class="border" id="i-have-a-tooltip" data="' + elem.info.info + '">'
        //+ elem.name + " (" + elem.idName + ")" + '<span>i</span></div>'))
        .append($('<div>', {class: "border", text: elem.name + " (" + elem.idName + ")"}))
        //.append($('<div>', {class: "border", text: elem.info.info}))
        .append(select);


    // администрирование
    // if (edit) {
    // значение выбранного элемента выпадающего списка
    var inputValue = $('<input class="inputElem" id="val_' + elem.idName + '" type="text">');
    if ($(elem.info.list).length > 0)
        inputValue.val($(elem.info. list)[0].value);

    div.append(inputValue)
        .append($('<button id="' + elem.idName + '" onclick="editElemSelect(id);">Изменить</button>'))
        .append($('<button id="' + elem.idName + '" onclick="deletElemSelect(id);">Удалить</button>'))
        .append($('<input class="inputElem" id="addName_' + elem.idName + '" type="text" placeholder="название">'))
        .append($('<input class="inputElem" id="addValue_' + elem.idName + '" type="text" placeholder="1.2">'))
        .append($('<button id="' + elem.idName + '" onclick="addElemSelect(id);">Добавить элемент</button>'));
    // }
    div.appendTo(id_div_Constructor);
}
// Выбор элемента из выпадающего списка (select)
function onChangeElemSelect(id, value) {
    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            $('input#val_' + id).val(elems[i].info.value = parseFloat(value));
}
// Редактирование элемента (select)
function editElemSelect(id) {
    var select = "select#" + id + " :selected";     // выбранные элемент выпадающего списка
    var newValue =  parseFloat($("input#val_" + id).val());
    var listElem = [];
    var elems = $(calcs[selectTypeCalc].elements);  // элементы калькулятора
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            listElem = $(elems)[i].info.list;       // значения выбранного элемента

    for (var i = 0; i < $(listElem).length; i++)    // поиск значения выбранного элемента
        if (listElem[i].name == $(select).text() && listElem[i].value == $(select).val())
            $(select).val(listElem[i].value = newValue);
}
// Удаление элемента (select)
function deletElemSelect(id) {
    var select = "#" + id + " :selected";
    var elem = [];
    var elems = $(calcs[selectTypeCalc].elements);  // элементы калькулятора
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            elem = $(elems)[i].info.list;       // значения выбранного элемента
    var index = -1;
    for (var i = 0; i < $(elem).length; i++)
        if (elem[i].name == $(select).text() && elem[i].value == $(select).val())
            index = i;
    elem.splice(index, 1);  // удаление элемента
    $(select).remove();
    $('input#val_' + id).val($(select).val());
}
// Добавление элемента (select)
function addElemSelect(id) {
    var addName = "#addName_" + id;
    var addValue = "#addValue_" + id;
    var elem = {name: $(addName).val(), value: parseFloat($(addValue).val())}

    if ($('select#' + id).children('option').length == 0)
        $('input#val_' + id).val(elem.value);
    $('select#' + id).append($('<option>', {value: elem.value, text: elem.name}));

    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            elems[i].info.list.push(elem);
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
    console.log(elem);
    console.log(id);
    console.log(value);
    for (var i = 0; i < elem.length; i++)
        if (elem[i].idName == id)
            elem[i].info.value = parseFloat(value);
    console.log(elem);

}



// Отображение элемента конструктора (slider)
function displaySlider(elem) {
    var div = $('<div>', {class: "border1"});
    div.append($('<div class="border">' + elem.name + " (" + elem.idName + ")" + '</div>'))
        .append($('<input class="input-group" id="' + elem.idName + '" type="text" ' +
            'value="' + elem.info.value + '" onchange="onChangeElemSlider(id, value)">'))
        .append($('<div class="border">Тут должен быть ползупок (slider)</div>'))
        .append($('<input class="inputElem" id="slider_input_min_value_' + elem.idName
            + '" type="text" value="' + elem.info.minValue + '">'))
        .append($('<button id="' + elem.idName + '" ' +
            ' onclick="saveSliderMinValues(id);">Сохранить мин</button>'))
        .append($('<input class="inputElem" id="slider_input_max_value_' + elem.idName
            + '" type="text" value="' + elem.info.maxValue + '">'))
        .append($('<button id="' + elem.idName + '" ' +
            ' onclick="saveSliderMaxValues(id);">Сохранить мах</button>')).appendTo(id_div_Constructor);
}
// Сохранение минимального значения (slider)
function saveSliderMinValues(id) {
    var input = "#slider_input_min_value_" + id;

    // назначить мин порог ползунка
    // проверить введенное пользователем значение
    // чтобы не было меньше порога

    saveSliderMinMaxValue(id, $(input).val(), true);
}
// Сохранение максимального значения (slider)
function saveSliderMaxValues(id) {
    var input = "#slider_input_max_value_" + id;

    // назначить мах порог ползунка
    // проверить введенное пользователем значение
    // чтобы не было больше порога

    saveSliderMinMaxValue(id, $(input).val(), false);
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
    var elems = $(calcs[selectTypeCalc].elements);

    switch (selectTypeCalc) {
        case "Осаго":
            console.log(listElemsConstructor);
            console.log(elems);
            list.push( {name: elems[0].idName, value: elems[0].info.value} );
            for (var i = 0; i < listElemsConstructor.length; i++)
                for (var j = 1; j < elems.length; j++)
                    if (elems[j].idName == listElemsConstructor[i])
                        list.push({name: elems[j].idName, value: elems[j].info.value});
            break;
        case "Кредит":
        case "Ипотека":
            for (var i = 0; i < listElemsConstructor.length; i++)
                for (var j = 0; j < elems.length; j++)
                    if (elems[j].idName === listElemsConstructor[i]) {

                        // console.log(elems[j]);
                        // var clone = {};
                        // for (var key in elems[j])
                        //     clone[key] = elems[j][key];

                        if (listElemsConstructor[i] == "additionalConditions"){
                            var inputs = $('input._cb_');
                            // console.log(inputs);
                            var listValue = [];
                            for (var ii = 0; ii < $(inputs).length; ii++) {
                                // console.log($(inputs)[ii]);
                                // console.log($(inputs)[ii].checked);
                                if ($(inputs)[ii].checked) {
                                    // console.log(elems[j].info.list);
                                    for (var k = 0; k < elems[j].info.list.length; k++) {
                                        // console.log(elems[j].info.list[k].name);
                                        // console.log($($(inputs)[ii]).attr('name'));
                                        if (elems[j].info.list[k].name == $($(inputs)[ii]).attr('name'))
                                            listValue.push({name: elems[j].info.list[k].name, value: elems[j].info.list[k].value});
                                    }
                                }
                            }
                            // console.log(listValue);
                            // console.log(elems[j]);

                            var newElem = {
                                idName: elems[j].idName,
                                name: elems[j].name,
                                type: elems[j].type,
                                info: {
                                    list: listValue,
                                    text: elems[j].info.text,
                                    value: elems[j].info.value
                                }
                            };
                            // console.log(newElem);
                            list.push(newElem);
                        }
                        else
                            list.push(elems[j]);
                    }
            break;
    }
    console.log(listElemsConstructor);
    console.log(list);

    var search = {
        typeCalc: selectTypeCalc,
        query: "RES",
        list: list ,
        name: $(calcs[selectTypeCalc])[0].name};


    // console.log(search.typeCalc);
    // switch (selectTypeCalc) {
    //     case "Осаго":
    //         // search.typeCalc = "Кредит";
    //         break;
    //     case "Кредит":
    //         search.typeCalc = "Осаго";
    //         break;
    // }
    // console.log(search.typeCalc);


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
// Сохранение калькулятора
function saveCalc() {

    // var checkbox = $('div#elementsCalcs').children().children();
    // console.log(checkbox);
    //
    // var list = [];
    // for (var i = 0; i < checkbox.length; i++){
    //     var t = checkbox[i].value;
    //     if (checkbox[i].checked) {
    //         var elems = $(calcs[typeCalc].elements);
    //         // console.log(elems);
    //         for (var j = 0; j < elems.length; j++) {
    //             // console.log(elems[j].idName);
    //             // console.log(checkbox[i].value);
    //
    //             if (elems[j].idName == checkbox[i].value)
    //                 list.push(elems[j]);
    //         }
    //     }
    // }

    var elem = [];
    var res = [];
    var list = [];
    if (selectTypeCalc == "Осаго")
        list.push($(calcs[selectTypeCalc].elements)[0]);
    for (var i = 0; i < listElemsConstructor.length; i++) {
        for (var j = 0; j < $(calcs[selectTypeCalc].elements).length; j++)
            if ($(calcs[selectTypeCalc].elements)[j].idName == listElemsConstructor[i])
                list.push($(calcs[selectTypeCalc].elements)[j]);
    }

    console.log(list);


    var search = { typeCalc: selectTypeCalc, query: "SAVE", list: list , name: $(calcs[selectTypeCalc])[0].name};
    console.log(search);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        success: function (data) { console.log("SUCCESS: ", data); },
        error: function (e) { console.log("ERROR: ", e); },
        done: function (e) { console.log("DONE: ", e); }
    });
}