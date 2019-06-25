

//-- Территории ОСАГО
var territories;

// настраивает видимость элементов формы в зависимости от выбранных значений радио-боксов
function _onChangeModifyRadio() {
	if ($('#face-2').prop("checked")) {	
		$("[for='driverList-0']").addClass('disabled').removeClass("selected");
		$('#driverList-0').prop("disabled", true);
		
		
		$("[for='driverList-1']").addClass('selected');	
		$('#driverList-1').prop("checked", true);

		
		$('.js-driver-add').hide();
		$('.osago-driver').hide();
		$('.kbm-general').show();

		//	if ($("[for='driverList-0']").hasClass("selected")) {
		//$("[for='driverList-0']").removeClass("selected");
		//	}	
	} else { 	
		$("[for='driverList-0']").removeClass('disabled');
		$('#driverList-0').prop("disabled", false);
		
				
		if ($('#driverList-0').prop("checked")) { 
		
			var driverNum = parseInt($("#driverCount").val());
			if (driverNum < 5 ) { //>
        		$('.js-driver-add').show();
			}
			$('.osago-driver').show();
			$('.kbm-general').hide();
			
		} else { 
        	$('.js-driver-add').hide();
			$('.osago-driver').hide();
			$('.kbm-general').show();
    	}
	}
}

// показывает/скрывает панель выбора территорий
function showTerrritoryPanel() {
	if ($("#territory-panel").is(":visible")) {
		$("#territory-panel").hide();
		$("#show-territory-button").html('Выбрать из списка');
	} else {
		//$(".cities-panel").hide();
		$("#territory-panel").show();
		$("#show-territory-button").html('Скрыть список');
	}
}

// устанавливает значение региона (имя и идентификатор)
function _setRegion(label, value) {
	$("#regionName").val(label);
	$("#regionId").val(value);
}

//
function _cutRegionName(name) {
	var result = name;
	/*var index = name.indexOf("Республика");
	if (index == 0) {
		result = name.substring(11);
	}*/
	var index = name.indexOf("г. Севастополь");
	if (index == 0) {
		result = name.substring(3);
	}
	return result;
}

//
function _updateDriver(num) {
	$('#age'+num).autoClear().inputmask('age18-99');
	$('#stage'+num).autoClear().inputmask('int0-99');
	$("[name='kbm" + num + "']").simpleSelectize();
	$('span.driver-tooltip-show').tooltipTwit({html:true}).addClass('tooltip-show');
}

// Проверка при submit
function checkosago( element ) {
	var errorCode = 0;

	/*if (!$('#existsLife').prop('checked') && !$('#existsProperty').prop('checked') && !$('#existsOwnership').prop('checked')) {
		errorCode += 2;
		showError('insuranceObject', '???insurance.objects.error???');
	}
	for (var i=1; i<=$('#borrowerCount').val(); i++) { //>
		var age = $('#age'+i).val();
		if (!$.isNumeric(age) || age < 18 || age > 64) {
			errorCode += 4;
			showError('age'+i, '???borrower.age.error???');			
		}
		var percent = $('#percent'+i).val();
		if (!$.isNumeric(percent) || percent < 0 || percent > 100) {
			errorCode += 4;
			showError('percent'+i, '???borrower.percent.error???');			
		}

	}*/
	errorCode += checkCaptchaField()*128;
	
	// set timeZone
    var now = new Date();
    $('[name=timeZone]').val(now.getTimezoneOffset());    
	
	if (errorCode == 0) {
		yaCounter25356824.reachGoal('calculations-OSAGO');
	}
	return errorCode == 0;
}

//--
$(document).ready(function(){
	
	
	$('#category').selectize({
    	// theme: 'links',
	    // maxItems: null,
    	// valueField: 'id',
	    // searchField: 'title',
    	options: [
        	{id: 1, img: 's1.png', letter: 'A'},
        	{id: 2, img: 's2.png', letter: 'B'},
	        {id: 3, img: 's3.png', letter: 'B'},
    	    {id: 4, img: 's4.png', letter: 'C'},
        	{id: 5, img: 's5.png', letter: 'C'},
	        {id: 6, img: 's6.png'},
    	    {id: 7, img: 's7.png', letter: 'D'},
        	{id: 8, img: 's8.png', letter: 'D'},
	        {id: 9, img: 's9.png', letter: 'D'},
    	    {id: 10, img: 's10.png'},
        	{id: 11, img: 's11.png'},
	        {id: 12, img: 's12.png'},
    	    {id: 13, img: 's13.png'},
	    ],
    	render: {
        	option: function(data, escape) {
            	var r = '<div class="item"><span class="img">';
	            if (data.img) {
    	            r += '<img src="/system/modules/ru.reso/resources/images/icos/' + escape(data.img) + '" alt="">';
        	    }

            	r += '</span> ' + escape(data.text);
	            if (data.letter !== undefined) {
    	            r += '<span class="letter">'+escape(data.letter)+'</span>';
        	    }
            	r +=  '</div>';

	            return r;
    	    },
        	item: function(data, escape) {

            	return '<div class="item">' + escape(data.text) + '</div>';
        	}
    	},
    	create: function(input) {
        	return {
            	id: 0,
            	title: input,
            	img: '#'
        	};
    	}
	});
	
	
		
	var territoryField = $("[name=territoryId]").autocompleteWithIdSetting({
		source: territories
	}).data("resoAutocompleteWithIdSetting");
	
	
	if (!territoryField.getValue()) {
		territoryField.setValue(1); // Москва
	}
	
	
	$("#territory-panel").hide();	
	
	
	territories.sort(function(a, b) {
		if (a['is-main'] >= 0 || b['is-main'] >= 0) {
			if (b['is-main'] == -1) {
				return -1;
			} if (a['is-main'] == -1 ){
				return 1;
			}else {
				return (a['is-main'] > b['is-main']) ? 1 : -1;
			}
		}
	  	var regionA = _cutRegionName(a['group-name']).toUpperCase();
   		var regionB = _cutRegionName(b['group-name']).toUpperCase();
		if (regionA == regionB) {
			return (a['is-center'] == 'true') ? 1 : (b['is-center'] == 'true') ? -1 : (a.label.localeCompare(b.label));
		}
   		return regionA.localeCompare(regionB);
	});
	
	
	var territoryList = $("<ul></ul>")
			.addClass("territory-list")
			.appendTo($("#territory-list"));
			
	var div_block = $("<div></div>")
			.addClass("territory-block")
			.addClass("territory-block-main")
			.appendTo(territoryList);
			
	$('<div>&nbsp;</div>').addClass('territory-block-letter')
			.appendTo(div_block);
			
	var div_cities = div_block; 
	
	var lastIsCenter = true;
	var currentLetter = null;
	var counter = 1;
	$.each(territories, function(index, item) {
		// Добавляем Заглавную букву
		if (item['is-main'] >= 0) {
			
		} else {
			firstLetter = _cutRegionName(item['group-name']).charAt(0).toUpperCase();
			if (firstLetter != currentLetter) {
				if (counter >= 3) {
					
					territoryList.append($("<div></div>").addClass("territory-block-delimeter"));
					counter = 0;
				}
				
				div_block = $("<div></div>")
						.addClass("territory-block")
						.appendTo(territoryList);
				
				$("<div></div>").html(firstLetter)
						.addClass("territory-letter")
						.appendTo(div_block);
	
				currentLetter = firstLetter;
				counter ++;
			}
		}
		
		
		if (lastIsCenter == true && item['is-main'] == -1) {
			span_group_name = $("<span></span>").html(item['group-name']);
			span_group_img_arrow = $("<span></span>").addClass("img-arrow");
								
			if (item['group-name'].length > 24) {
				var index = item['group-name'].indexOf(" ");
				var secondIndex = item['group-name'].indexOf(" ", index + 1);
				if (secondIndex < 24 && secondIndex > 0) {
					index = secondIndex;
				}
				var group_name = item['group-name'].substring(0, index) + "<br>" + item['group-name'].substring(index+1);
				span_group_name.html(group_name);
			}
			
			link_group = $("<a></a>")
					.addClass("cities-gruop-link")
					.append(span_group_name)
					.append(span_group_img_arrow)
					.on("click", function(){
						var cities_panel = $("div[cities-panel-id=" + item.code + "]");
						var is_visible = cities_panel.is(":visible");
						$(".cities-gruop-link").removeClass("selected");
						$(".cities-panel").hide();
						if (!is_visible) {
							cities_panel.show();
							$(this).addClass("selected");							
						}
					});
			
			$("<li></li>").append(link_group)
					.appendTo(div_block);

			div_cities = $("<div></div>")
							.attr("cities-panel-id", item.code)
							.addClass("cities-panel")
							.appendTo(div_block);
		}

		
		city_link = $("<a></a>");
		if (item['is-main'] == -1 && item['is-center'] == 'true') {
			city_link.html("другие населенные пункты");
		} else if (item.code == 50) {
			city_link.html(item['group-name']);
		} else {
			city_link.html(item.label);
		}
		city_link.data('territory-item', item)
				.on("click", function(){
					var territory_item = $(this).data('territory-item');
					territoryField.setValue(territory_item.id);
					showTerrritoryPanel();
				});
		
		$("<li></li>").append(city_link)
			.appendTo(div_cities);
		
		lastIsCenter = (item["is-center"] == 'true' || item["is-main"] >= 0);
	});
	
	
	
	$('.js-driver-add').click(function(){
		var driverNum = parseInt($("#driverCount").val());
		if (driverNum >= 4) {
			$(this).hide();
		}
		$("#driverCount").val(driverNum + 1);
		
    	var tr = $('.js-driver-main').clone();
    	tr.removeClass('js-driver-main');
		
		var kbmSelect = tr.find(".kbm-selectize");
		
		var kbmHtml = '<select  name="kbm' + driverNum + '" style="width:50px;" class="selection-simple">'
						+ '<option value="-1">М</option>'
						+ ''
							+ '<option value="0">0</option>'
						+ ''
							+ '<option value="1">1</option>'
						+ ''
							+ '<option value="2">2</option>'
						+ ''
							+ '<option selected value="3">3</option>'
						+ ''
							+ '<option value="4">4</option>'
						+ ''
							+ '<option value="5">5</option>'
						+ ''
							+ '<option value="6">6</option>'
						+ ''
							+ '<option value="7">7</option>'
						+ ''
							+ '<option value="8">8</option>'
						+ ''
							+ '<option value="9">9</option>'
						+ ''
							+ '<option value="10">10</option>'
						+ ''
							+ '<option value="11">11</option>'
						+ ''
							+ '<option value="12">12</option>'
						+ ''
							+ '<option value="13">13</option>'
						+ ''
					+ '</select>';
		kbmSelect.html(kbmHtml);
		
		var age = tr.find("[name='age0']");
		age.attr("name", "age" + driverNum);
		age.attr("id", "age" + driverNum);
		age.val('22');
		
		var stage = tr.find("[name='stage0']");
		stage.attr("name", "stage" + driverNum);
		stage.attr("id", "stage" + driverNum);
		stage.val('2');
		
		var delButton = tr.find(".js-driver-del");
		delButton.show();
		
		$('.js-driver-label').before(tr);
		
		_updateDriver(driverNum);
		
    	return false;
	});
	
	$('body').on('click', '.js-driver-del', function(){
    	$(this).parents('tr').remove();
		$('.js-driver-add').show();
		
		var driverNum = parseInt($("#driverCount").val());
		$("#driverCount").val(--driverNum);

		return false;
	});

	$('.js-driver-label').hide();
	$('.js-driver-del-0').hide();
	_onChangeModifyRadio();
	
	$('body').on('change', 'input[type=radio]', function(){
		_onChangeModifyRadio();
	});
	
	var driverNum = parseInt($("#driverCount").val());
	for (i=0; i<driverNum; i++) { //>
		_updateDriver(i);
	}
	
	$('#yearOfManufacture').inputmask('year1900-3000');
});

territoriesDict = {"type":"osago-territories","items":[{"id":17920,"label":"Сарапул","is-main":"-1","is-center":"false","group-name":"Удмуртская Республика","code":"18"},{"id":10240,"label":"Амурск","is-main":"-1","is-center":"false","group-name":"Хабаровский край","code":"27"},{"id":12800,"label":"Железногорск Курской обл","is-main":"-1","is-center":"false","group-name":"Курская область","code":"46"},{"id":15360,"label":"Магнитогорск","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":1,"label":"Москва","is-main":"0","is-center":"true","group-name":"г. Москва","code":"77"},{"id":14850,"label":"Кузнецк","is-main":"-1","is-center":"false","group-name":"Пензенская область","code":"58"},{"id":11270,"label":"Борисоглебск","is-main":"-1","is-center":"false","group-name":"Воронежская область","code":"36"},{"id":100870,"label":"Чукотский автономный округ - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Чукотский автономный округ","code":"87"},{"id":15880,"label":"Мценск","is-main":"-1","is-center":"false","group-name":"Орловская область","code":"57"},{"id":100360,"label":"Воронежская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Воронежская область","code":"36"},{"id":17930,"label":"Саратов","is-main":"-1","is-center":"false","group-name":"Саратовская область","code":"64"},{"id":12300,"label":"Гусь-Хрустальный","is-main":"-1","is-center":"false","group-name":"Владимирская область","code":"33"},{"id":14860,"label":"Куйбышев","is-main":"-1","is-center":"false","group-name":"Новосибирская область","code":"54"},{"id":14350,"label":"Комсомольск-на-Амуре","is-main":"-1","is-center":"false","group-name":"Хабаровский край","code":"27"},{"id":16910,"label":"Орск","is-main":"-1","is-center":"false","group-name":"Оренбургская область","code":"56"},{"id":11280,"label":"Боровичи","is-main":"-1","is-center":"false","group-name":"Новгородская область","code":"53"},{"id":16400,"label":"Новомосковск","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":100370,"label":"Ивановская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ивановская область","code":"37"},{"id":10260,"label":"Анапа","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":17940,"label":"Саров","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":20500,"label":"Ярославль","is-main":"-1","is-center":"false","group-name":"Ярославская область","code":"76"},{"id":100890,"label":"Ямало-Ненецкий автономный округ - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ямало-Ненецкий автономный округ","code":"89"},{"id":15900,"label":"Набережные Челны","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":100380,"label":"Иркутская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Иркутская область","code":"38"},{"id":10270,"label":"Ангарск","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":20000,"label":"Чистополь","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":19490,"label":"Усолье-Сибирское","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":16930,"label":"Осинники","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":11810,"label":"Вольск","is-main":"-1","is-center":"false","group-name":"Саратовская область","code":"64"},{"id":10790,"label":"Белгород","is-main":"-1","is-center":"false","group-name":"Белгородская область","code":"31"},{"id":18470,"label":"Соликамск","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":100390,"label":"Калининградская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Калининградская область","code":"39"},{"id":15400,"label":"Малгобек","is-main":"-1","is-center":"false","group-name":"Республика Ингушетия","code":"6"},{"id":10280,"label":"Анжеро-Судженск","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":20520,"label":"Ярцево","is-main":"-1","is-center":"false","group-name":"Смоленская область","code":"67"},{"id":17960,"label":"Сатка","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":20010,"label":"Чита","is-main":"-1","is-center":"false","group-name":"Забайкальский край","code":"75"},{"id":19500,"label":"Уссурийск","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":16430,"label":"Новороссийск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":100400,"label":"Калужская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Калужская область","code":"40"},{"id":17970,"label":"Сафоново","is-main":"-1","is-center":"false","group-name":"Смоленская область","code":"67"},{"id":14900,"label":"Кумертау","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":11830,"label":"Воронеж","is-main":"-1","is-center":"false","group-name":"Воронежская область","code":"36"},{"id":11320,"label":"Братск","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":19000,"label":"Тверь","is-main":"-1","is-center":"false","group-name":"Тверская область","code":"69"},{"id":100410,"label":"Камчатская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Камчатский край","code":"41"},{"id":17980,"label":"Саяногорск","is-main":"-1","is-center":"false","group-name":"Республика Хакасия","code":"19"},{"id":10300,"label":"Апатиты","is-main":"-1","is-center":"false","group-name":"Мурманская область","code":"51"},{"id":13890,"label":"Каспийск","is-main":"-1","is-center":"false","group-name":"Республика Дагестан","code":"5"},{"id":11330,"label":"Брянск","is-main":"-1","is-center":"false","group-name":"Брянская область","code":"32"},{"id":16450,"label":"Новосибирск","is-main":"-1","is-center":"false","group-name":"Новосибирская область","code":"54"},{"id":100420,"label":"Кемеровская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Кемеровская область","code":"42"},{"id":11850,"label":"Воткинск","is-main":"-1","is-center":"false","group-name":"Удмуртская Республика","code":"18"},{"id":14410,"label":"Копейск","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":11340,"label":"Бугульма","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":10830,"label":"Белово","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":100430,"label":"Кировская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Кировская область","code":"43"},{"id":17490,"label":"Прокопьевск","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":14930,"label":"Курган","is-main":"-1","is-center":"false","group-name":"Курганская область","code":"45"},{"id":19540,"label":"Усть-Илимск","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":11350,"label":"Бугуруслан","is-main":"-1","is-center":"false","group-name":"Оренбургская область","code":"56"},{"id":16470,"label":"Новотроицк","is-main":"-1","is-center":"false","group-name":"Оренбургская область","code":"56"},{"id":15960,"label":"Назарово","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":10840,"label":"Белогорск","is-main":"-1","is-center":"false","group-name":"Амурская область","code":"28"},{"id":100440,"label":"Костромская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Костромская область","code":"44"},{"id":14940,"label":"Курганинск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":11360,"label":"Будённовск","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":15970,"label":"Назрань","is-main":"-1","is-center":"false","group-name":"Республика Ингушетия","code":"6"},{"id":13410,"label":"Иркутск","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":100450,"label":"Курганская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Курганская область","code":"45"},{"id":14950,"label":"Курск","is-main":"-1","is-center":"false","group-name":"Курская область","code":"46"},{"id":19560,"label":"Усть-Кут","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":11880,"label":"Выкса","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":19050,"label":"Тимашёвск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":11370,"label":"Бузулук","is-main":"-1","is-center":"false","group-name":"Оренбургская область","code":"56"},{"id":100460,"label":"Курская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Курская область","code":"46"},{"id":12400,"label":"Дербент","is-main":"-1","is-center":"false","group-name":"Республика Дагестан","code":"5"},{"id":17520,"label":"Прохладный","is-main":"-1","is-center":"false","group-name":"Кабардино-Балкарская Республика","code":"7"},{"id":20080,"label":"Шадринск","is-main":"-1","is-center":"false","group-name":"Курганская область","code":"45"},{"id":19060,"label":"Тихорецк","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":16500,"label":"Новоуральск","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":15990,"label":"Нальчик","is-main":"-1","is-center":"false","group-name":"Кабардино-Балкарская Республика","code":"7"},{"id":13430,"label":"Искитим","is-main":"-1","is-center":"false","group-name":"Новосибирская область","code":"54"},{"id":10360,"label":"Арзамас","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":11900,"label":"Вышний Волочёк","is-main":"-1","is-center":"false","group-name":"Тверская область","code":"69"},{"id":16510,"label":"Новочебоксарск","is-main":"-1","is-center":"false","group-name":"Чувашская Республика","code":"21"},{"id":13950,"label":"Кемерово","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":19070,"label":"Тобольск","is-main":"-1","is-center":"false","group-name":"Тюменская область","code":"72"},{"id":100480,"label":"Липецкая область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Липецкая область","code":"48"},{"id":15490,"label":"Махачкала","is-main":"-1","is-center":"false","group-name":"Республика Дагестан","code":"5"},{"id":18050,"label":"Свободный","is-main":"-1","is-center":"false","group-name":"Амурская область","code":"28"},{"id":17540,"label":"Псков","is-main":"-1","is-center":"false","group-name":"Псковская область","code":"60"},{"id":19590,"label":"Уфа","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":11400,"label":"Буйнакск","is-main":"-1","is-center":"false","group-name":"Республика Дагестан","code":"5"},{"id":16520,"label":"Новочеркасск","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":18057,"label":"Севастополь","is-main":"-1","is-center":"true","group-name":"г. Севастополь","code":"92"},{"id":10890,"label":"Белореченск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":100490,"label":"Магаданская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Магаданская область","code":"49"},{"id":10380,"label":"Армавир","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":14990,"label":"Кызыл","is-main":"-1","is-center":"false","group-name":"Республика Тыва (Тува)","code":"17"},{"id":19600,"label":"Ухта","is-main":"-1","is-center":"false","group-name":"Республика Коми","code":"11"},{"id":16530,"label":"Новошахтинск","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":13460,"label":"Ишимбай","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":10390,"label":"Арсеньев","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":18070,"label":"Северодвинск","is-main":"-1","is-center":"false","group-name":"Архангельская область","code":"29"},{"id":12440,"label":"Дзержинск","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":11930,"label":"Вязьма","is-main":"-1","is-center":"false","group-name":"Смоленская область","code":"67"},{"id":19100,"label":"Тольятти","is-main":"-1","is-center":"false","group-name":"Самарская область","code":"63"},{"id":13470,"label":"Йошкар-Ола","is-main":"-1","is-center":"false","group-name":"Республика Марий Эл","code":"12"},{"id":16030,"label":"Находка","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":100510,"label":"Мурманская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Мурманская область","code":"51"},{"id":14500,"label":"Кострома","is-main":"-1","is-center":"false","group-name":"Костромская область","code":"44"},{"id":17060,"label":"Пенза","is-main":"-1","is-center":"false","group-name":"Пензенская область","code":"58"},{"id":100520,"label":"Нижегородская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Нижегородская область","code":"52"},{"id":10410,"label":"Артём","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":100010,"label":"Республика Адыгея - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Адыгея","code":"1"},{"id":15020,"label":"Лабинск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":20140,"label":"Шахты","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":19120,"label":"Томск","is-main":"-1","is-center":"false","group-name":"Томская область","code":"70"},{"id":16560,"label":"Новый Уренгой","is-main":"-1","is-center":"false","group-name":"Ямало-Ненецкий автономный округ","code":"89"},{"id":18610,"label":"Сочи","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":100530,"label":"Новгородская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Новгородская область","code":"53"},{"id":18100,"label":"Североморск","is-main":"-1","is-center":"false","group-name":"Мурманская область","code":"51"},{"id":100020,"label":"Республика Башкортостан - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Башкортостан","code":"2"},{"id":17590,"label":"Пятигорск","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":12470,"label":"Димитровград","is-main":"-1","is-center":"false","group-name":"Ульяновская область","code":"73"},{"id":14010,"label":"Кимры","is-main":"-1","is-center":"false","group-name":"Тверская область","code":"69"},{"id":13500,"label":"Казань","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":18620,"label":"Спасск-Дальний","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":16060,"label":"Невинномысск","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":10940,"label":"Бердск","is-main":"-1","is-center":"false","group-name":"Новосибирская область","code":"54"},{"id":100540,"label":"Новосибирская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Новосибирская область","code":"54"},{"id":15550,"label":"Междуреченск","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":18110,"label":"Северск","is-main":"-1","is-center":"false","group-name":"Томская область","code":"70"},{"id":100030,"label":"Республика Бурятия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Бурятия","code":"3"},{"id":14530,"label":"Котлас","is-main":"-1","is-center":"false","group-name":"Архангельская область","code":"29"},{"id":10950,"label":"Березники","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":100550,"label":"Омская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Омская область","code":"55"},{"id":10440,"label":"Архангельск","is-main":"-1","is-center":"false","group-name":"Архангельская область","code":"29"},{"id":100040,"label":"Республика Алтай - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Алтай","code":"4"},{"id":17100,"label":"Первоуральск","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":16590,"label":"Норильск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":14030,"label":"Кинешма","is-main":"-1","is-center":"false","group-name":"Ивановская область","code":"37"},{"id":18640,"label":"Ставрополь","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":100560,"label":"Оренбургская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Оренбургская область","code":"56"},{"id":100050,"label":"Республика Дагестан - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Дагестан","code":"5"},{"id":20180,"label":"Шелехов","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":16600,"label":"Ноябрьск","is-main":"-1","is-center":"false","group-name":"Ямало-Ненецкий автономный округ","code":"89"},{"id":10970,"label":"Березовский","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":100570,"label":"Орловская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Орловская область","code":"57"},{"id":10460,"label":"Асбест","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":100060,"label":"Республика Ингушетия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Ингушетия","code":"6"},{"id":19680,"label":"Хабаровск","is-main":"-1","is-center":"false","group-name":"Хабаровский край","code":"27"},{"id":11490,"label":"Великие Луки","is-main":"-1","is-center":"false","group-name":"Псковская область","code":"60"},{"id":100580,"label":"Пензенская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Пензенская область","code":"58"},{"id":13030,"label":"Заречный Пензенской обл.","is-main":"-1","is-center":"false","group-name":"Пензенская область","code":"58"},{"id":100070,"label":"Кабардино-Балкарская Республика - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Кабардино-Балкарская Республика","code":"7"},{"id":12010,"label":"Геленджик","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":17130,"label":"Пермь","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":11500,"label":"Великий Новгород","is-main":"-1","is-center":"false","group-name":"Новгородская область","code":"53"},{"id":16110,"label":"Нерюнгри","is-main":"-1","is-center":"false","group-name":"Республика Саха (Якутия)","code":"14"},{"id":18670,"label":"Старый Оскол","is-main":"-1","is-center":"false","group-name":"Белгородская область","code":"31"},{"id":13550,"label":"Калининград","is-main":"-1","is-center":"false","group-name":"Калининградская область","code":"39"},{"id":100590,"label":"Пермский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Пермский край","code":"59"},{"id":10480,"label":"Астрахань","is-main":"-1","is-center":"false","group-name":"Астраханская область","code":"30"},{"id":100080,"label":"Республика Калмыкия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Калмыкия","code":"8"},{"id":15090,"label":"Лениногорск","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":12020,"label":"Георгиевск","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":19700,"label":"Ханты-Мансийск","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":14070,"label":"Киров Кировской обл","is-main":"-1","is-center":"false","group-name":"Кировская область","code":"43"},{"id":11000,"label":"Бийск","is-main":"-1","is-center":"false","group-name":"Алтайский край","code":"22"},{"id":100600,"label":"Псковская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Псковская область","code":"60"},{"id":13050,"label":"Заринск","is-main":"-1","is-center":"false","group-name":"Алтайский край","code":"22"},{"id":15610,"label":"Миасс","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":100090,"label":"Карачаево-черкесская Республика - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Карачаево-Черкесская Республика","code":"9"},{"id":19200,"label":"Туапсе","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":16640,"label":"Нягань","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":18690,"label":"Стерлитамак","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":100610,"label":"Ростовская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ростовская область","code":"61"},{"id":100100,"label":"Республика Карелия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Карелия","code":"10"},{"id":17670,"label":"Ревда Свердловской обл","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":12040,"label":"Глазов","is-main":"-1","is-center":"false","group-name":"Удмуртская Республика","code":"18"},{"id":19210,"label":"Туймазы","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":13580,"label":"Калуга","is-main":"-1","is-center":"false","group-name":"Калужская область","code":"40"},{"id":11020,"label":"Биробиджан","is-main":"-1","is-center":"false","group-name":"Еврейская автономная область","code":"79"},{"id":100620,"label":"Рязанская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Рязанская область","code":"62"},{"id":100110,"label":"Республика КОМИ - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Коми","code":"11"},{"id":19730,"label":"Хасавюрт","is-main":"-1","is-center":"false","group-name":"Республика Дагестан","code":"5"},{"id":100115,"label":"Республика Крым - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Крым","code":"91"},{"id":14100,"label":"Кирово-Чепецк","is-main":"-1","is-center":"false","group-name":"Кировская область","code":"43"},{"id":19220,"label":"Тула","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":16150,"label":"Нефтеюганск","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":100630,"label":"Самарская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Самарская область","code":"63"},{"id":15640,"label":"Минеральные Воды","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":100120,"label":"Марийская Республика - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Марий Эл","code":"12"},{"id":10010,"label":"Абакан","is-main":"-1","is-center":"false","group-name":"Республика Хакасия","code":"19"},{"id":17690,"label":"Ржев","is-main":"-1","is-center":"false","group-name":"Тверская область","code":"69"},{"id":17180,"label":"Петрозаводск","is-main":"-1","is-center":"false","group-name":"Республика Карелия","code":"10"},{"id":14620,"label":"Краснодар","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":19230,"label":"Тулун","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":100640,"label":"Саратовская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Саратовская область","code":"64"},{"id":13090,"label":"Зеленогорск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":10530,"label":"Ачинск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":15650,"label":"Минусинск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":100130,"label":"Республика Мордовия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Мордовия","code":"13"},{"id":20260,"label":"Шуя","is-main":"-1","is-center":"false","group-name":"Ивановская область","code":"37"},{"id":12070,"label":"Горно-Алтайск","is-main":"-1","is-center":"false","group-name":"Республика Алтай","code":"4"},{"id":17190,"label":"Петропавловск-Камчатский","is-main":"-1","is-center":"false","group-name":"Камчатский край","code":"41"},{"id":14630,"label":"Краснокаменск","is-main":"-1","is-center":"false","group-name":"Забайкальский край","code":"75"},{"id":16680,"label":"Обнинск","is-main":"-1","is-center":"false","group-name":"Калужская область","code":"40"},{"id":16170,"label":"Нижневартовск","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":100650,"label":"Сахалинская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Сахалинская область","code":"65"},{"id":100140,"label":"Республика Якутия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Саха (Якутия)","code":"14"},{"id":17710,"label":"Рославль","is-main":"-1","is-center":"false","group-name":"Смоленская область","code":"67"},{"id":20270,"label":"Щёкино","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":14640,"label":"Краснокамск","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":16180,"label":"Нижнекамск","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":100660,"label":"Свердловская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Свердловская область","code":"66"},{"id":13110,"label":"Зеленодольск","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":100150,"label":"Республика Северная Осетия-Алания - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Северная Осетия","code":"15"},{"id":15160,"label":"Лесосибирск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":17720,"label":"Россошь","is-main":"-1","is-center":"false","group-name":"Воронежская область","code":"36"},{"id":11580,"label":"Верхняя Пышма","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":11070,"label":"Благовещенск Амурской обл","is-main":"-1","is-center":"false","group-name":"Амурская область","code":"28"},{"id":100670,"label":"Смоленская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Смоленская область","code":"67"},{"id":100160,"label":"Республика Татарстан - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Татарстан","code":"16"},{"id":15170,"label":"Ливны","is-main":"-1","is-center":"false","group-name":"Орловская область","code":"57"},{"id":14150,"label":"Киселёвск","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":11590,"label":"Верхняя Салда","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":11080,"label":"Благовещенск Башкортостан","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":100680,"label":"Тамбовская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Тамбовская область","code":"68"},{"id":100170,"label":"Республика Тува - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Тыва (Тува)","code":"17"},{"id":20300,"label":"Элиста","is-main":"-1","is-center":"false","group-name":"Республика Калмыкия","code":"8"},{"id":17740,"label":"Ростов-на-Дону","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":14160,"label":"Кисловодск","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":19280,"label":"Тюмень","is-main":"-1","is-center":"false","group-name":"Тюменская область","code":"72"},{"id":16210,"label":"Нижний Новгород","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":13650,"label":"Каменск-Шахтинский","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":100690,"label":"Тверская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Тверская область","code":"69"},{"id":15700,"label":"Михайловка","is-main":"-1","is-center":"false","group-name":"Волгоградская область","code":"34"},{"id":100180,"label":"Республика Удмуртия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Удмуртская Республика","code":"18"},{"id":12630,"label":"Ейск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":19800,"label":"Чайковский","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":100700,"label":"Томская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Томская область","code":"70"},{"id":15710,"label":"Михайловск Ставропольского края","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":100190,"label":"Республика Хакасия - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Республика Хакасия","code":"19"},{"id":15200,"label":"Липецк","is-main":"-1","is-center":"false","group-name":"Липецкая область","code":"48"},{"id":10080,"label":"Азов","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":20320,"label":"Энгельс","is-main":"-1","is-center":"false","group-name":"Саратовская область","code":"64"},{"id":12640,"label":"Екатеринбург","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":18275,"label":"Симферополь","is-main":"-1","is-center":"false","group-name":"Республика Крым","code":"91"},{"id":100710,"label":"Тульская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Тульская область","code":"71"},{"id":15720,"label":"Мичуринск","is-main":"-1","is-center":"false","group-name":"Тамбовская область","code":"68"},{"id":13160,"label":"Златоуст","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":100200,"label":"Чеченская Республика - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Чеченская Республика","code":"20"},{"id":12650,"label":"Елабуга","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":17770,"label":"Рубцовск","is-main":"-1","is-center":"false","group-name":"Алтайский край","code":"22"},{"id":15210,"label":"Лиски","is-main":"-1","is-center":"false","group-name":"Воронежская область","code":"36"},{"id":19820,"label":"Чапаевск","is-main":"-1","is-center":"false","group-name":"Самарская область","code":"63"},{"id":16750,"label":"Октябрьский Башкортостан","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":14190,"label":"Клинцы","is-main":"-1","is-center":"false","group-name":"Брянская область","code":"32"},{"id":18800,"label":"Сургут","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":100720,"label":"Тюменская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Тюменская область","code":"72"},{"id":100210,"label":"Чувашская Республика - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Чувашская Республика","code":"21"},{"id":100730,"label":"Ульяновская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ульяновская область","code":"73"},{"id":100220,"label":"Алтайский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Алтайский край","code":"22"},{"id":17790,"label":"Рузаевка","is-main":"-1","is-center":"false","group-name":"Республика Мордовия","code":"13"},{"id":12670,"label":"Елец","is-main":"-1","is-center":"false","group-name":"Липецкая область","code":"48"},{"id":14720,"label":"Красноярск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":19840,"label":"Чебаркуль","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":13700,"label":"Камышин","is-main":"-1","is-center":"false","group-name":"Волгоградская область","code":"34"},{"id":100740,"label":"Челябинская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Челябинская область","code":"74"},{"id":10630,"label":"Балаково","is-main":"-1","is-center":"false","group-name":"Саратовская область","code":"64"},{"id":100230,"label":"Краснодарский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Краснодарский край","code":"23"},{"id":5000,"label":"Санкт-Петербург","is-main":"2","is-center":"true","group-name":"г. Санкт-Петербург","code":"78"},{"id":19850,"label":"Чебоксары","is-main":"-1","is-center":"false","group-name":"Чувашская Республика","code":"21"},{"id":100750,"label":"Читинская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Забайкальский край","code":"75"},{"id":10640,"label":"Балахна","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":100240,"label":"Красноярский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Красноярский край","code":"24"},{"id":5010,"label":"Ленинградская область","is-main":"3","is-center":"true","group-name":"Ленинградская область","code":"47"},{"id":20370,"label":"Южно-Сахалинск","is-main":"-1","is-center":"false","group-name":"Сахалинская область","code":"65"},{"id":14230,"label":"Когалым","is-main":"-1","is-center":"false","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":13720,"label":"Канаш","is-main":"-1","is-center":"false","group-name":"Чувашская Республика","code":"21"},{"id":18840,"label":"Сызрань","is-main":"-1","is-center":"false","group-name":"Самарская область","code":"63"},{"id":100760,"label":"Ярославская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ярославская область","code":"76"},{"id":18330,"label":"Славянск-на-Кубани","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":15770,"label":"Мончегорск","is-main":"-1","is-center":"false","group-name":"Мурманская область","code":"51"},{"id":10650,"label":"Балашов","is-main":"-1","is-center":"false","group-name":"Саратовская область","code":"64"},{"id":100250,"label":"Приморский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Приморский край","code":"25"},{"id":11680,"label":"Владивосток","is-main":"-1","is-center":"false","group-name":"Приморский край","code":"25"},{"id":18850,"label":"Сыктывкар","is-main":"-1","is-center":"false","group-name":"Республика Коми","code":"11"},{"id":16290,"label":"Новоалтайск","is-main":"-1","is-center":"false","group-name":"Алтайский край","code":"22"},{"id":13220,"label":"Иваново","is-main":"-1","is-center":"false","group-name":"Ивановская область","code":"37"},{"id":100260,"label":"Ставропольский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ставропольский край","code":"26"},{"id":20390,"label":"Юрга","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":19880,"label":"Челябинск","is-main":"-1","is-center":"false","group-name":"Челябинская область","code":"74"},{"id":11690,"label":"Владикавказ","is-main":"-1","is-center":"false","group-name":"Республика Северная Осетия","code":"15"},{"id":16810,"label":"Омск","is-main":"-1","is-center":"false","group-name":"Омская область","code":"55"},{"id":19370,"label":"Узловая","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":13740,"label":"Канск","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":100270,"label":"Хабаровский край - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Хабаровский край","code":"27"},{"id":17840,"label":"Рязань","is-main":"-1","is-center":"false","group-name":"Рязанская область","code":"62"},{"id":12210,"label":"Губкин","is-main":"-1","is-center":"false","group-name":"Белгородская область","code":"31"},{"id":19380,"label":"Улан-Удэ","is-main":"-1","is-center":"false","group-name":"Республика Бурятия","code":"3"},{"id":11700,"label":"Владимир","is-main":"-1","is-center":"false","group-name":"Владимирская область","code":"33"},{"id":18870,"label":"Таганрог","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":100790,"label":"Еврейская автономная область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Еврейская автономная область","code":"79"},{"id":18360,"label":"Смоленск","is-main":"-1","is-center":"false","group-name":"Смоленская область","code":"67"},{"id":100280,"label":"Амурская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Амурская область","code":"28"},{"id":15290,"label":"Лысьва","is-main":"-1","is-center":"false","group-name":"Пермский край","code":"59"},{"id":14780,"label":"Кропоткин","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":19900,"label":"Черемхово","is-main":"-1","is-center":"false","group-name":"Иркутская область","code":"38"},{"id":11710,"label":"Волгоград","is-main":"-1","is-center":"false","group-name":"Волгоградская область","code":"34"},{"id":19390,"label":"Ульяновск","is-main":"-1","is-center":"false","group-name":"Ульяновская область","code":"73"},{"id":100290,"label":"Архангельская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Архангельская область","code":"29"},{"id":17860,"label":"Салават","is-main":"-1","is-center":"false","group-name":"Республика Башкортостан","code":"2"},{"id":14790,"label":"Крымск","is-main":"-1","is-center":"false","group-name":"Краснодарский край","code":"23"},{"id":11720,"label":"Волгодонск","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":100300,"label":"Астраханская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Астраханская область","code":"30"},{"id":19920,"label":"Череповец","is-main":"-1","is-center":"false","group-name":"Вологодская область","code":"35"},{"id":14800,"label":"Кстово","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":12240,"label":"Гуково","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":17360,"label":"Полевской","is-main":"-1","is-center":"false","group-name":"Свердловская область","code":"66"},{"id":980,"label":"Московская область","is-main":"1","is-center":"true","group-name":"Московская область","code":"50"},{"id":10710,"label":"Барнаул","is-main":"-1","is-center":"false","group-name":"Алтайский край","code":"22"},{"id":100310,"label":"Белгородская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Белгородская область","code":"31"},{"id":12760,"label":"Ессентуки","is-main":"-1","is-center":"false","group-name":"Ставропольский край","code":"26"},{"id":11740,"label":"Волжск","is-main":"-1","is-center":"false","group-name":"Республика Марий Эл","code":"12"},{"id":100830,"label":"Ненецкий автономный округ - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ненецкий автономный округ","code":"83"},{"id":13280,"label":"Ижевск","is-main":"-1","is-center":"false","group-name":"Удмуртская Республика","code":"18"},{"id":15840,"label":"Мурманск","is-main":"-1","is-center":"false","group-name":"Мурманская область","code":"51"},{"id":100320,"label":"Брянская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Брянская область","code":"32"},{"id":20450,"label":"Якутск","is-main":"-1","is-center":"false","group-name":"Республика Саха (Якутия)","code":"14"},{"id":17890,"label":"Сальск","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":12770,"label":"Ефремов","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":11750,"label":"Волжский","is-main":"-1","is-center":"false","group-name":"Волгоградская область","code":"34"},{"id":16870,"label":"Орёл","is-main":"-1","is-center":"false","group-name":"Орловская область","code":"57"},{"id":16360,"label":"Новокузнецк","is-main":"-1","is-center":"false","group-name":"Кемеровская область","code":"42"},{"id":11240,"label":"Бор","is-main":"-1","is-center":"false","group-name":"Нижегородская область","code":"52"},{"id":10730,"label":"Батайск","is-main":"-1","is-center":"false","group-name":"Ростовская область","code":"61"},{"id":100330,"label":"Владимирская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Владимирская область","code":"33"},{"id":15340,"label":"Магадан","is-main":"-1","is-center":"false","group-name":"Магаданская область","code":"49"},{"id":17900,"label":"Самара","is-main":"-1","is-center":"false","group-name":"Самарская область","code":"63"},{"id":10220,"label":"Алексин","is-main":"-1","is-center":"false","group-name":"Тульская область","code":"71"},{"id":19950,"label":"Черногорск","is-main":"-1","is-center":"false","group-name":"Республика Хакасия","code":"19"},{"id":11760,"label":"Вологда","is-main":"-1","is-center":"false","group-name":"Вологодская область","code":"35"},{"id":16880,"label":"Оренбург","is-main":"-1","is-center":"false","group-name":"Оренбургская область","code":"56"},{"id":16370,"label":"Новокуйбышевск","is-main":"-1","is-center":"false","group-name":"Самарская область","code":"63"},{"id":15860,"label":"Муром","is-main":"-1","is-center":"false","group-name":"Владимирская область","code":"33"},{"id":100340,"label":"Волгоградская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Волгоградская область","code":"34"},{"id":17910,"label":"Саранск","is-main":"-1","is-center":"false","group-name":"Республика Мордовия","code":"13"},{"id":10230,"label":"Альметьевск","is-main":"-1","is-center":"false","group-name":"Республика Татарстан","code":"16"},{"id":12790,"label":"Железногорск Красноярский край","is-main":"-1","is-center":"false","group-name":"Красноярский край","code":"24"},{"id":18940,"label":"Тамбов","is-main":"-1","is-center":"false","group-name":"Тамбовская область","code":"68"},{"id":100860,"label":"Ханты-Мансийский автономный округ - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Ханты-Мансийский автономный округ","code":"86"},{"id":100350,"label":"Вологодская область - другие населенные пункты","is-main":"-1","is-center":"true","group-name":"Вологодская область","code":"35"}]}
territories = territoriesDict.items;

