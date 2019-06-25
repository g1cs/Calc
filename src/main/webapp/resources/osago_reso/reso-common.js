/* Декодирует Html строку в нормальную */
function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

/* Функция показывает скрытое поле с ошибкой и устанавливает полю ввода класс error-input */
function showError (name, text) {
	//-- для новый полей с ошибкой
	if( text ) {
		$( 'div[for='+name+']' ).html( text );
	}
	$( 'div[for='+name+']' ).addClass('field__error-show');
	$('input[name='+name+']').addClass('input-error');
}

/* Функция "прокручивает" страницу до поля с ошибкой */
function goToError (name) {
	$('body,html').animate({scrollTop:$( 'div[for='+name+']' ).offset().top - 50}, 'fast');
}

/* Функция очищает поля с ошибками */
function clearErrors() {
	$("input").removeClass("input-error");
	$(".field__error").removeClass("field__error-show");
	return true;
}

/* Функция проверяет заполненность поля catpcha */
function checkCaptchaField() {
	var captchaID = 'codeImage';
	if ($('#'+captchaID).length) {
		var code = $('#'+captchaID).val();
		var errorCode = 0;
		if (!code) {
			errorCode = 1;
			showError(captchaID, 'поле обязательно для заполнения');
		} else if (!$.isNumeric(code) || code < 0) {
			errorCode = 2;
			showError(captchaID, 'некорректное значение');
		}
		return errorCode;
	}
	return 0;
}

/* Функция разбивать число по разрядам */
function formatNumber(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '&nbsp;' + '$2');
    }
	var rgxNull = /^([,][123456789]+)(0+)?$/;
	return x1 + (rgxNull.test(x2) ? x2.replace(rgxNull, '$1') : '' );
}


$(document).ready(function(){

	//-- для IE 8
	if (!Array.prototype.indexOf)
	{
		Array.prototype.indexOf = function(elt /*, from*/)
  		{
		    var len = this.length >>> 0;

		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)
        		 ? Math.ceil(from)
         		: Math.floor(from);
    		if (from < 0)
      			from += len;

    		for (; from < len; from++)
    		{
				if (from in this &&
          				this[from] === elt)
        			return from;
    		}
    		return -1;
  		};
	}
	
	//-- поле каптчи (маска)
	$('#codeImage').inputmask('non-negative-decimal');
	
	//-- поле выбора даты
	$( ".datepicker" ).datepicker({
  		dateFormat: "dd.mm.yy",
		showOn: "button",
        buttonImage: "/export/system/modules/ru.reso/resources/images/calendar.gif",
        buttonImageOnly: true
	}).inputmask("99.99.9999");
	
	//-- выпадающие списки
	$(".simple-selectize").simpleSelectize();

	//-- прокручиваем страницу к резльутату калькулятора
	var calculateResult = $( '.calculate-result-content' );
	if( calculateResult.length ) {
		$('body,html').animate({scrollTop:calculateResult.offset().top}, 'fast');
	}
})

