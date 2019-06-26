
var calcs = [];


var listCalcs = [];                        // список имеющихся калькуляторов
var selectTypeCalc = "";                        // выбранный калькулятор
var listElemsConstructor = [];

var id_div_TypesCalcs = "#typeCalcs";
var id_div_ListElemCalcs = "#elementsCalcs";
var id_div_Constructor = "#constructor";
var id_div_Result = "#div_result";

var url_edit_ajax= "editCalcAjax";

// Получить значение из командной строки
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    console.log(window.location.href);
    console.log(results);
    if (results == null)
        return null;
    else
        return decodeURI(results[1]) || 0;
};

// Получение списка калькуляторов
function loadListCalcs() {

    if (listCalcs.length > 0)
        displayListCalcs();
    else {
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: url_edit_ajax,
            success: function (data) {
                console.log("SUCCESS: ", data);
                listCalcs = JSON.parse(JSON.stringify(data, null, 4));
                displayListCalcs();
            },
            error: function (e) { console.log("ERROR: ", e); },
            done: function (e) { console.log("DONE: ", e); }
        });
    }
}
// Отображение списка калькуляторов
function displayListCalcs() {

    $(id_div_TypesCalcs).empty();
    $(id_div_ListElemCalcs).empty();
    $(id_div_Result).css("display", "none");

    var ul = $('<ul class="list1a"></ul>');
    for (var i = 0; i < listCalcs.length; i++) {
        var li = $('<li><input type="radio" name="typeCalc" value="' + listCalcs[i] +
            '" onclick="loadCalc(value);"/><span class="displaylistCalcs">' + listCalcs[i] + '</span></li>');
        ul.append(li);
    }
    $(id_div_TypesCalcs).append(ul);
}


// Отображение элементов выбранного калькулятора (загрузить и нарисовать)
function loadCalc(value) {

    $(id_div_ListElemCalcs).empty();
    $(id_div_Constructor).empty();

    selectTypeCalc = value;

    if ($(calcs[selectTypeCalc]).length > 0)
        displayElemsCalc();
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
                displayElemsCalc();
            },
            error: function (e) { console.log("ERROR: ", e); },
            done: function (e) { console.log("DONE: ", e); }
        });
    }
}

var id_ul_list_cbs = "list_cbs";
// Отображение элементов выбранного калькулятора (в checkbox(ы))
function displayElemsCalc() {

    $(id_div_ListElemCalcs).empty();
    $(id_div_Result).empty();
    listElemsConstructor.splice(0, listElemsConstructor.length);

    var start = 0;
    var ul = $('<ul id="list_cbs" class="list1a"></ul>');

    console.log(selectTypeCalc);
    if (selectTypeCalc == "Осаго")
        start = 1;

    console.log(selectTypeCalc);
    console.log(calcs);
    console.log(calcs[selectTypeCalc]);

    // добавление элементов в блок ui
    for (var i = start; i < $(calcs[selectTypeCalc].elements).length; i++) {
        //nameElemCalcs[$(calcs[tCalc])[i].value] = data[i].name;
        console.log($(calcs[selectTypeCalc].elements)[i]);
        var checkbox = $('<li><input  type="checkbox"  name="elemCalc" value="'
            + $(calcs[selectTypeCalc].elements)[i].idName + //id="elemCalc' + i + '"
            '" onclick="checkboxChange(this);"/><span class="displayElemsselectTypeCalc">' + $(calcs[selectTypeCalc].elements)[i].name + '</span></li>');
        ul.append(checkbox);
    }
    ul.appendTo(id_div_ListElemCalcs);
    $(id_div_ListElemCalcs).append(ul);
}
// Выбор элемента калькулятора
function checkboxChange(checkbox) {

    (checkbox.checked)
        ? listElemsConstructor.push(checkbox.value)
        : listElemsConstructor.splice(listElemsConstructor.indexOf(checkbox.value), 1);
    updateConstructor();
}




// Отображение конструктора
function updateConstructor() {

    $(id_div_Constructor).empty();  // отчистка блока
    $(id_div_Result).empty();

    nameCalc();

    switch(selectTypeCalc) {
        case "Осаго":
            basicRate();
            elements();
            buttons();
            result();
            break;
        case "Кредит":
        case "Ипотека":
            elements();
            buttons();
            result();
            break;
        default: break;
    }
}

// Название калькулятора
function nameCalc() {

    var name = $(calcs[selectTypeCalc])[0].name;

    var mainDiv = $('<div>');
    var divName = $('<div>', {class: "nameCalc", text: "Название калькулятора: "});
    var inputName = $('<input class="stylelable1" id="' + name + '" type="text" value="' + name + '">');
    var button = $('<button class="" id="' + name + '" onclick="saveName(id);">Сохранить</button>');
    // + '" onchange="onChangeElemCountry(id, value)">'))
    var div = $('<div>', {class: ""});
    div.append(inputName).append(button);
    mainDiv.append(divName).append(div).appendTo(id_div_Constructor);
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
    for (var i = 0; i < listElemsConstructor.length; i++) {

        var elems = $(calcs[selectTypeCalc].elements);
        for (var j = 0; j < elems.length; j++)
            if (elems[j].idName == listElemsConstructor[i])
                elem = elems[j];

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

    var mainDiv = $('<div>', {id: "res", class: "test"});
    var buttonSave = $('<button type="submit" id="btnSave" onclick="saveCalc();">Сохранить</button>');
    var buttonCompute = $('<button type="submit" id="btnSave" onclick="computeCalc();">Вычислить</button>');

    mainDiv.append(buttonCompute).append(buttonSave).appendTo(id_div_Constructor);
}




var class_cb = "_cb_";
var id_cbs = "_cbs_";
var id_cb_addName = "addCheckboxName_";
var id_cb_addValue = "addCheckboxValue_";
function displayListCheckbox(elem) {

    var divMain = $('<div class="test" id="' + id_cbs + '">');
    var div = $('<div class="displayListCheckbox">' + elem.name + " (" + elem.idName + ")" + '</div>');
    var inputName = $('<input class="stylelable1" id="' + id_cb_addName + elem.idName + '" type="text" placeholder="название">');
    var inputValue = $('<input class="dopusl stylelable1" id="' + id_cb_addValue + elem.idName + '" type="text" placeholder="(-/+)0.2 процентов">');
    var button = $('<button id="' + elem.idName + '" onclick="addElemListCheckbox(id);">Добавить</button>');

    divMain.append(div).append(inputName).append(inputValue).append(button);

    for (var i = 0; i < $(elem.info.list).length; i++) {

        var name = $(elem.info.list)[i].name;
        var value = $(elem.info.list)[i].value;

        divMain.append(
            $('<div class="' + class_cb + ' displayListCheckbox" name="'+ name + '">' +
                '<input class="' + class_cb + '" type="checkbox" name="'+ name + '" value="' + value + //id="elemCalc' + i + '"
                '" onclick="listCheckboxChange(this);"/>' + name
                + '<button id="' + name + '" onclick="deletElemListCheckbox(id);">Удалить</button>' +
                '</div>'))
        //    .appendTo(divMain);
        // divMain.append(
        //     $('<div class="_cb_ displayListCheckbox" name="'+ $(elem.info.list)[i].name
        //         +'"><input class="_cb_" type="checkbox" name="'+ $(elem.info.list)[i].name +
        //         '" value="' + $(elem.info.list)[i].value + //id="elemCalc' + i + '"
        //         '" onclick="listCheckboxChange(this);"/>' + $(elem.info.list)[i].name
        //         + '<button id="' + $(elem.info.list)[i].name
        //         + '" onclick="deletElemListCheckbox(id);">Удалить</button></div>'))
        //     .appendTo(divMain);
    }
    divMain.appendTo(id_div_Constructor);

}
function deletElemListCheckbox(id) {

    var divs = $('div.' + class_cb);
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
    var name = $("#" + id_cb_addName + id).val();
    var value = parseFloat($("#" + id_cb_addValue + id).val());

    var elems = $(calcs[selectTypeCalc].elements);
    for (var j = 0; j < $(elems).length; j++)
        if (elems[j].idName == id)
            elems[j].info.list.push( {name: name, value: value} );

    $('div#' + id_cbs)
        .append(
            $('<div class="' + class_cb + '" name="'+ name
                +'"><input class="' + class_cb + '" type="checkbox" name="'+ name +
                '" value="' + value + //id="elemCalc' + i + '"
                '" onclick="listCheckboxChange(this);"/>' + name
                + '<button id="' + name
                + '" onclick="deletElemListCheckbox(id);">Удалить элемент</button></div>'));
}
function listCheckboxChange(checkbox) {
    console.log(checkbox);
}

function clickInfo(name) {
    console.log(name);
    $('[data-toggle="'+name+'"]').popover();
}

// Отображение элемента конструктора (input)
function displayInput(elem) {

//    var button = $('<button id="' + elem.idName + '" onclick="saveElementInput(id);">Сохранить</button>');
    var divMain = $('<div>', {class: ""});
    // $('<div class="border" id="i-have-a-tooltip" data="' + elem.info.info + '">' + elem.name + " (" + elem.idName + ")" + '</div>')

    var div = $('<div>' + elem.name + " (" + elem.idName + ")" + '</div>');
    var input = $('<input class="stylelable1" id="' + elem.idName + '" type="text" ' +
        'value="' + elem.info.value + //'">'))
        '" onchange="saveElemInput(id, value)">');
    divMain.append(div)
    // + '<a data-toggle="popover'+ elem.idName +'" data-content="\' + elem.info.text + \'" onclick="clickInfodata-toggle()"><a class="fa fa-question-circle"></a></a>'
    // + '<div data-toggle="popover" data-content="' + elem.info.text + '"></div></div>'))
        .append(input)
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




var id_select_val = "val_";
var id_select_addName = "addSelectName_";
var id_select_addValue = "addSelectValue_";
// Отображение элемента конструктора (select)
function displaySelect(elem) {

    // формирование выпадающего списка
    var select = $('<select class="stylelable1" id="' + elem.idName + '" onchange="onChangeElemSelect(id, value);"></select>');
    // заполнение выпадающего списка
    for (var i = 0; i < $(elem.info.list).length; i++) {
        var option = $('<option>', { value: $(elem.info.list)[i].value, text: $(elem.info.list)[i].name });
        select.append(option);
    }

    // блок с выпадающим списком
    var div = $('<div class="">');
    var divSelect = $('<div>', {/*class: "displaySelect", */text: elem.name + " (" + elem.idName + ")"});
    div
    //.append($('<div class="border" id="i-have-a-tooltip" data="' + elem.info.info + '">'
    //+ elem.name + " (" + elem.idName + ")" + '<span>i</span></div>'))
        .append(divSelect)
        //.append($('<div>', {class: "border", text: elem.info.info}))
        ;


    var inputValue = $('<input class="stylelable1" id="' + id_select_val + elem.idName + '" type="text">');
    if ($(elem.info.list).length > 0)
        inputValue.val($(elem.info. list)[0].value);

    var buttonEdit = $('<button id="' + elem.idName + '" onclick="editElemSelect(id);">Изменить</button>');
    var buttonDel = $('<button id="' + elem.idName + '" onclick="deletElemSelect(id);">Удалить</button>');
    var inputAddName = $('<input class="stylelable1"  id="' + id_select_addName + elem.idName + '" type="text" placeholder="название">');
    var inputAddValue = $('<input class="stylelable1" id="' + id_select_addValue + elem.idName + '" type="text" placeholder="1.2">');
    var buttonAddElem = $('<button id="' + elem.idName + '" onclick="addElemSelect(id);">Добавить</button>');


    var div2 = $('<div>');
    div2.append(select).append(inputValue).append(buttonEdit).append(buttonDel);

    var div3 = $('<div>');
    div3.append(inputAddName).append(inputAddValue).append(buttonAddElem);
    div.append(div2).append(div3).appendTo(id_div_Constructor);
}
// Выбор элемента из выпадающего списка (select)
function onChangeElemSelect(id, value) {
    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            $('input#' + id_select_val + id).val(elems[i].info.value = parseFloat(value));
}
// Редактирование элемента (select)
function editElemSelect(id) {
    var select = "select#" + id + " :selected";     // выбранные элемент выпадающего списка
    var newValue =  parseFloat($("input#" + id_select_val + id).val());
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
    $('input#' + id_select_val + id).val($(select).val());
}
// Добавление элемента (select)
function addElemSelect(id) {
    var addName = "#" + id_select_addName + id;
    var addValue = "#" + id_select_addValue + id;
    var elem = {name: $(addName).val(), value: parseFloat($(addValue).val())}

    if ($('select#' + id).children('option').length == 0)
        $('input#' + id_select_val + id).val(elem.value);
    $('select#' + id).append($('<option>', {value: elem.value, text: elem.name}));

    var elems = $(calcs[selectTypeCalc].elements);
    for (var i = 0; i < elems.length; i++)
        if (elems[i].idName == id)
            elems[i].info.list.push(elem);
}



// Отображение элемента конструктора (radio)
function displayRadio(elem) {
    var div = $('<div>');
    for (var i = 0; i < elem.info.list.length; i++)
        div.append(
            $('<div class=""><input type="radio" name="' + elem.idName
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


function update(slider,val) {
    var formatNumber = {
        separador: ",",
        sepDecimal: '.',
        formatear:function (num){
            num +='';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft  +splitRight;
        },
        new:function(num, simbol){
            this.simbol = simbol ||'';
            return this.formatear(num);
        }
    };
    $('#slider'+slider+' span').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+val+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
}


var slider_input_min = "slider_input_min_value_";
var slider_input_max = "slider_input_max_value_";
// Отображение элемента конструктора (slider)
function displaySlider(elem) {

    var idSlider = "slider" + elem.idName;
    var slider = $('<div id="'+idSlider+'"></div>');
    console.log(slider);

    var divMain = $('<div>');
    var divName = $('<div  class="">' + elem.name + " (" + elem.idName + ")" + '</div>');
    var input = $('<input  class=" stylelable1" id="' + elem.idName + '" type="text" ' +
        'value="' + elem.info.value + '" onchange="onChangeElemSlider(id, value)">');
    var inputMin = $('<input  class="stylelable1" id="' + slider_input_min + elem.idName +
        '" type="text" value="' + elem.info.minValue + '">');
    var inputMax = $('<input class="stylelable1" id="' + slider_input_max + elem.idName +
        '" type="text" value="' + elem.info.maxValue + '">');
    var buttonSaveMin = $('<button id="' + elem.idName + '" ' + ' onclick="saveSliderMinValues(id);">Сохранить</button>');
    var buttonSaveMax = $('<button id="' + elem.idName + '" ' + ' onclick="saveSliderMaxValues(id);">Сохранить</button>');
    divMain.append(divName).append(input)
    //.append($('<div class="test">Тут должен быть ползупок (slider)</div>'))
        .append(slider).append(inputMin).append(buttonSaveMin).append(inputMax).append(buttonSaveMax)
        .appendTo(id_div_Constructor);

    // $('#' + idSlider).slider({
    //     range: "min",
    //     animate: true,
    //     value: 1,
    //     min: elem.info.minValue,
    //     max: elem.info.maxValue,
    //     step: 1,
    //     slide: function(event, ui) {
    //         update(elem.idName, ui.value); //changed
    //     }
    // });
    // console.log(slider);
}
// Сохранение минимального значения (slider)
function saveSliderMinValues(id) {
    var input = "#" + slider_input_min + id;
    var min =  $(input).val();
    // $('#slider' + id).slider({
    //     min: min
    // });

    // назначить мин порог ползунка
    // проверить введенное пользователем значение
    // чтобы не было меньше порога

    saveSliderMinMaxValue(id, min, true);
}
// Сохранение максимального значения (slider)
function saveSliderMaxValues(id) {
    var input = "#" + slider_input_max + id;

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
    $(id_div_Result).css("display", "block");

    switch (selectTypeCalc) {
        case "Осаго":
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


    console.log(JSON.stringify(search));

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

    console.log("saveCalc: main.js");

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
        success: function (data) { console.log("SUCCESS: ", data); alert("Калькулятор сохранен"); },
        error: function (e) { console.log("ERROR: ", e); alert("Ошибка сохранения калькулятора");},
        done: function (e) { console.log("DONE: ", e); }
    });

}