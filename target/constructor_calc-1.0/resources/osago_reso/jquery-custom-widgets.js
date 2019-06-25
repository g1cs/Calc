/*!
* Change class trigger
*/
( function( $, undefined ) {
	
	var originalAddClassMethod = jQuery.fn.addClass;
	var originalRemoveClassMethod = jQuery.fn.removeClass;
	
	jQuery.fn.addClass = function() {
		var result = originalAddClassMethod.apply( this, arguments );
		jQuery(this).trigger('classChanged', [true, arguments[0]]);
		return result;	
	}
	
	jQuery.fn.removeClass = function() {		 
		var result = originalRemoveClassMethod.apply( this, arguments );
		jQuery(this).trigger('classChanged', [false, arguments[0]]);
		return result;
	}
	
} ( jQuery ) );

/*!
* Show error plugin
*/
( function( $, undefined ) {
	
	var INPUT_ERROR_CLASS = "input-error";
	var FIELD_ERROR_CLASS = "field__error-show";

	var hasError;
	var firstErrorElementName;

	$.widget( "reso.showErrors", {
	
		options: {
			form: $(document)
		},

		_create: function() {
			this._clearErrors();
		},
		
		_clearErrors: function() {
			hasError = false;
			firstErrorElementName = undefined;
	
			this.options.form.find(".field__error").removeClass(FIELD_ERROR_CLASS);
			this.options.form.find("input,select").removeClass(INPUT_ERROR_CLASS);
		},
		
		showError: function(fieldName, text) {
			var self = this;
			if( text ) { 
				this.options.form.find( 'div[for='+fieldName+']' ).html( text );
			}
		
			this.options.form.find( 'div[for='+fieldName+']' ).addClass(FIELD_ERROR_CLASS);
			this.options.form.find( '[name='+fieldName+']' ).addClass(INPUT_ERROR_CLASS);
			this.options.form.find( '[name='+fieldName+']' ).change(function(){
				self.hideError(fieldName);
			});
		
			if (firstErrorElementName == undefined) {
				firstErrorElementName = fieldName;
			}
		
			hasError = true;
		},
		
		hideError: function(fieldName) {
			this.options.form.find( 'div[for='+fieldName+']' ).removeClass(FIELD_ERROR_CLASS);
			this.options.form.find( '[name='+fieldName+']' ).removeClass(INPUT_ERROR_CLASS);
		},
		
		clearErrors: function() {
			this._clearErrors();
		},
			
		goToFirstError: function() {
			if (firstErrorElementName) {
				$('body,html').animate({scrollTop:$( 'div[for='+firstErrorElementName+']' ).offset().top - 50}, 'fast');
			} else {
				var errors_fields = $('.' + FIELD_ERROR_CLASS);
				if (errors_fields.length) {
					$('html, body').animate({
						scrollTop: errors_fields.offset().top - 50
					}, 2000);
				}
			}
		},
		
		hasError: function() {
			return hasError;
		},
		
		checkForEmptyValue: function(fieldName, text) {
			if (!this.options.form.find('[name='+fieldName+']').val()) {
				this.showError(fieldName, text);
			}
		}
	});	
} ( jQuery ) );

/*!
* Autocomlete plugin c выбором id. Композиция плагина ui.autocomplete
*/
( function( $, undefined ) {

	var PREV_VALUE_ATTRIBUTE_NAME = "data-prev-value";

	$.widget( "reso.autocompleteWithIdSetting", {
	
		options: {
			label: 'label',            // поле для отображения
			id: 'id',                  // поле для результата выбора
			source: undefined,         // массив данных
			sort: undefined,           // функция сортировки элементов массива данных
			sortField: undefined,      // имя поля для сортировки элементов массива в алфавитном порядке
			minLength: 3,              // минимальное количество введенных символов для начала поиска
			notFoundText: undefined,   // текст, который будет установлен в поле, если данные не найдены
			onSelect: undefined        // обработчик выбора значение
		},
		
		_create: function() {
			var self = this;
			var inputId = self.element;
						
			// добавляем поле для отображения метки
        	var inputLabel = $( "<input />" )
          		.addClass( inputId.attr( "class") )
		  		.attr( "type", inputId.attr( "type" ) )
				.attr( "style", inputId.attr( "style" ) )
				.attr( "placeholder", inputId.attr( "placeholder" ) )
				.attr( PREV_VALUE_ATTRIBUTE_NAME, undefined )
				.attr( "autocomplete", "off" )
          		.insertAfter( self.element );

			self.wrapper = inputLabel;
			
			// отслеживаем изменения класса оригинального элемента ввода
			inputId.bind("classChanged", function(element, isAdded, className) {
				if (isAdded) {
					inputLabel.addClass(className);
				} else {
					inputLabel.removeClass(className);
				}
			});
 
 			// скрываем элемент ввода id и очищаем placeHolder
			inputId.attr( "type", "hidden" );
			if (inputId.val() == inputId.attr("placeholder")) {
				inputId.val("");
			}
			inputId.removeAttr("placeholder");			
 						
			// делаем поле label autocomplete
			inputLabel.autocomplete( {
				label: self.options.label,
				minLength: self.options.minLength,
				open: function(event, ui) {
					$(this).autocomplete("widget").css({
            			"width": ($(this).width() + "px")
        			});
    			},
				response: function(event, ui) {
					if( self.options.notFoundText !== undefined && ui.content.length === 0 ) {
              			self._setLabel( self.options.notFoundText );
						self._setId(null);
						var tmpTimeout = setTimeout(function(){
							clearTimeout(tmpTimeout);
							if (self.options.notFoundText == self.getLabel()) {
								self._setLabel("");
								inputLabel.autocomplete("search");
							}
						}, 500);
					}
        		},
				select: function( event, ui ) {
            		//event.preventDefault();
					self._setLabel( ui.item[self.options.label] );
            		self._setId( ui.item[self.options.id] );
					if( self.options.onselect !== undefined ) {
						self.options.onselect( ui.item[self.options.id] );
					}
					return false;
        		},
				focus: function( event, ui ) {
            		//event.preventDefault();
					$('.ui-helper-hidden-accessible').hide();
					self._setLabel( ui.item[self.options.label] );
					self._setId( ui.item[self.options.id] );
					return false;
				},
				change: function( event, ui ) {
					if (ui.item == null && !inputLabel.attr( PREV_VALUE_ATTRIBUTE_NAME )) {
						self._setId( null );
					}
				}
			} );
			
			// устанавливаем данные
			if (self.options.source !== undefined) {
				self._setSource(self.options.source);
			}			
			
			// делаем поле labal автоочищаемым
			inputLabel
				.focus( function() {
					if ( inputLabel.val() != null ) {
						inputLabel.attr( PREV_VALUE_ATTRIBUTE_NAME, inputLabel.val() );
						inputLabel.val( "" );
					}
					if (self.options.minLength == 0) {
						inputLabel.autocomplete("search", "");					
					}
				} )
				.blur( function() {
					if ( /*!inputLabel.val() &&*/ inputLabel.attr( PREV_VALUE_ATTRIBUTE_NAME ) != null ) {
						self._setLabel( inputLabel.attr( PREV_VALUE_ATTRIBUTE_NAME ) );
					}
				} )
				.click( function() {
					if ( self.getValue() == "" ) {
						inputLabel.val( "" );
					}
				} )
				.keydown( function() {
					if ( inputLabel.val() == self.options.notFoundText ) {
						inputLabel.val( "" );
					}
				} );
			
			// ищем label выбранного значения
			self.setValue(self.element.val());			
      	},
		
		_setId: function(id) {
			this.element.val( id );
			this.element.trigger("change");
		},
		_setLabel: function(label) {
			this.wrapper.val( label );
			this.wrapper.attr( PREV_VALUE_ATTRIBUTE_NAME, null );
		},
		_set: function(id, label) {
			this._setId(id);
			this._setLabel(label);
		},
		_find: function(id) {
			var self = this;
			var findedItem = null;
			if (this.wrapper.autocomplete('option', 'source') != null && id != null) {
				$.each(this.wrapper.autocomplete('option', 'source'),function(index, item){
					if  (item[self.options.id] == id) {
						findedItem = item;
						return false; // break
					}
				});
			};
			return findedItem;
		},
		_setSource: function(data) {
			var self = this;
			if (self.options.sort !== undefined) {
				data.sort(self.options.sort);
			} else if (self.options.sortField !== undefined) {
				data.sort(function (itemA, itemB) {
					return itemA[self.options.sortField].localeCompare(itemB[self.options.sortField]);
				});
			}
			self.options.source = data;
			self.wrapper.autocomplete('option', 'source', data);	
			
			if (self.getValue()) {
				self.setValue(self.getValue());
			}
		},
		
		// устанавливает данные для выбора
		setSource: function(data) {
			this._setSource(data);
		},
		// устанавливаем выбранное значение
		setValue: function(id) {
			var item = this._find(id);
			if (item != null) {
				this._set(item[this.options.id], item[this.options.label]);
			}
		},
		// очищаем выборанное значение
		clearValue: function() {
			this._set(null, null);
		},
		// очищаем выбранное значение и список выбора (source)
		clear: function() {
			this.wrapper.autocomplete('option', 'source', null);
			this._set(null, null);
		},
		// возвращает выбранное значение
		getValue: function() {
			return this.element.val();
		},
		getLabel: function() {
			return this.wrapper.val();
		},
		getCurrentItem: function() {
			return this._find(this.getValue());
		}

	});
} ( jQuery ) );	


/*!
* Custom selection plugin [Beta]
*/
( function( $, undefined ) {
	
	var ORDER_ATTRIBUTE_NAME = "data-order";

	$.widget( "reso.simpleSelectize", {
	
		options: {
			label: 'label',            // поле для отображения
			value: 'value',               // поле для результата выбора
			source: undefined,         // массив данных
			sort: undefined,           // функция сортировки элементов массива данных
			sortField: undefined,      // имя поля для сортировки элементов массива в алфавитном порядке
			onChange: undefined        // обработчик выбора значение
		},
		
		_create: function() {
			var self = this;
			var selectionField = self.element;
			
			self.wrapper = selectionField.selectize({
				onChange: function() {
					if (self.options.onChange) {
						self.options.onChange();
					}
				},
				labelField: self.options.label,
				valueField: self.options.value,
				sortField: (self._isSorted() ? ORDER_ATTRIBUTE_NAME : undefined),
				render: {
					option: function(data, escape) {
						var r = '<div class="item">';
						r += escape(data[self.options.label]);
						if (data.letter !== undefined) {
							r += '<span class="letter">'+escape(data.letter)+'</span>';
						}
						r +=  '</div>';
						return r;
					},
					item: function(data, escape) {
						return '<div class="item">' + escape(data[self.options.label]) + '</div>';
					}
    			},
				create: function(input) {
					return {
						id: 0,
						title: input
					};
				}
			});
	
			// устанавливаем данные
			if (self.options.source !== undefined) {
				self._sort(self.options.source);
				self._setSource(self.options.source);
			} else if(self._isSorted()) {
				var selectedValue = self.wrapper[0].selectize.getValue();
				var options = $.map(self.wrapper[0].selectize.options, function(item, index) { 
					return [item];
				});
				self._sort(options);
				self._clear();
				self._setSource(options);
				self._setValue(selectedValue);
			}
		},
		
		_isSorted: function() {
			return this.options.sort !== undefined || this.options.sortField !== undefined;
		},
		_sort: function(array) {
			var self = this;
			if (self.options.sort !== undefined) {
				array.sort(self.options.sort);
			} else if (self.options.sortField !== undefined) {
				arrya.sort(function (itemA, itemB) {
					return itemA[sortField].localeCompare(itemB[sortField]);
				});
			}
		},
		_setSource: function(data) {
			var self = this;
			$.each(data, function(index, item){
				item[ORDER_ATTRIBUTE_NAME] = index;
				self.wrapper[0].selectize.addOption(item);
				self.wrapper[0].selectize.addItem(item[self.options.value]);
			});
		},
		_getOptions: function() {
			return this.wrapper[0].selectize.options;
		},
		_clear: function() {
			this.wrapper[0].selectize.clear();
			this.wrapper[0].selectize.clearOptions();
		},
		_setValue: function(value) {
			this.wrapper[0].selectize.setValue(value);
		},
		
		// устанавливает список выбора
		setSource: function(data) {
			this._sort(data);
			this._clear();
			this._setSource(data);
		},
		getOptionsCount: function(data) {
			var cnt = 0;
			for(option in this._getOptions()) {
				cnt ++;
			}
			return cnt;
		},
		disable: function(disable) {
			if (disable == false) {
				this.wrapper[0].selectize.enable();
			} else {
				this.wrapper[0].selectize.disable();
			}
		},
		getValue: function() {
			return this.element.val();
		},
		setValue: function(value) {
			this._setValue(value);
		}
	});
} ( jQuery ) );

/*!
* Автоочищаемое поле
*/
( function( $, undefined ) {

	var PREV_VALUE_ATTRIBUTE_NAME = "data-prev-value";

	$.widget( "reso.autoClear", {
	
		options: {
			onSelect: undefined        // обработчик выбора значение
		},
		
		_create: function() {
			var self = this;
			var input = self.element;
			
			self._setPrevValue("");

			input
				.focus(function(){
					if (self._getValue()) {
						self._setPrevValue(self._getValue());
						self._setValue("");
					}					
	    		})
				.blur(function(){
					if (!self._getValue() && self._getPrevValue()) {
						self._setValue(self._getPrevValue());
						self._setPrevValue("");
        			}
				});
		},
		
		_setValue: function(val) {
			this.element.val(val);
		},
		_getValue: function(val) {
			return this.element.val();		
		},
		_setPrevValue: function(val) {
			this.element.attr(PREV_VALUE_ATTRIBUTE_NAME, val);
		},
		_getPrevValue: function() {
			return this.element.attr(PREV_VALUE_ATTRIBUTE_NAME);
		},
		
		// устанавливает значение в поле
		setValue: function(val) {
			this._setPrevValue(undefined);
			this._setValue(val);
		},
		getValue: function() {
			return this.getValue();
		}
    
	});
} ( jQuery ) );

/*!
* Slider plugin for select field
*/
( function( $, undefined ) {
	
	var RESO_SELECT_SLIDER_CLASS = "reso-select-slider";
	var LABEL_ID_ATTR_NAME = "data-label-id";
	
	$.widget( "reso.selectSlider", {
	
		options: {
			source: undefined, // массив опций (option, value)
			disabledOptions: undefined // недоступные опции
		},
		
		_dataOptions: undefined,

		_create: function() {
			var self = this;
			var selectField = self.element;
			
			// добавляем поле для отображения метки
        	var divWrapper = $( "<div />" )
          		.addClass( selectField.attr( "class") )
				.addClass( RESO_SELECT_SLIDER_CLASS )
				.attr( "style", selectField.attr( "style" ) )
          		.insertAfter( self.element );

			self.wrapper = divWrapper;
			
			// отслеживаем изменения класса оригинального элемента ввода
			selectField.bind("classChanged", function(element, isAdded, className) {
				if (isAdded) {
					divWrapper.addClass(className);
				} else {
					divWrapper.removeClass(className);
				}
			});
 
 			// скрываем элемент ввода id и очищаем placeHolder
			selectField.hide();
			
			// делаем поле label autocomplete
			divWrapper.slider({
				'change': function(event, ui) {
					selectField.val(self._dataOptions[ui.value].value);
				}
			});

			// заполняем исходные опции, если они не переданны
			if (self.options.source == undefined) {
				self.options.source = [];
				var selectOptions = selectField.find("option");
				$.each(selectOptions, function(index, el){
					self.options.source[index] = {value: el.value, label: el.text, disabled: false};
				});
			}
			
			self._initSlider();
			//self._setValue(selectedValue);
		},
		
		_initSlider: function() {
			var self = this;
			var selectedValue = self.element.val();
			var divWrapper = self.wrapper;
			var data = self.options.source;
			var disabledOptions = self.options.disabledOptions;
			
			// Заполняем новые данные
			self._dataOptions = {};
			var counter = 0;
			$.each(data, function(index, item){
				if (self._isDisabled(item.value)) {
					return true; // continue;
				}
				self._dataOptions[counter++] = item;
			});
			
			// Удаляем старые метки
			divWrapper.find("label").remove();
			
			// Созадем новые метки
    		for (var i = 0; i < counter; i++) {
        		var el = $('<label>' + self._dataOptions[i].label + '</label>')
						.css('left', (i/(counter-1)*100) + '%')
						.attr(LABEL_ID_ATTR_NAME, self._dataOptions[i].value);
        		divWrapper.append(el);
			}		
			
			// Обновляем слайдер
			divWrapper.slider ({
				'min': 0,
				'max': counter - 1
			});
			
			// Вычисляем ширину метки и сдвигаем влево на пол длины
			if (counter != 1) {				
				$.each(divWrapper.find("label"), function(index, item) {
					var elem = $(item);
					elem.css('margin-left', '-' + Math.round(elem.width()/2).toFixed(0) + 'px');
				});
			}	
			
			var index = self._getIndex(selectedValue);
			if (index == undefined) {
				index = 0; // устанавливаем первое доступное значение
			}
				
			divWrapper.slider({'value': index})
			self.element.val(self._dataOptions[index].value);
		},
		
		_getIndex: function(value) {
			var self = this;
			var result = undefined;
			
			$.each(self._dataOptions, function(index, item) {
				if ("" + item.value == "" + value) {
					result = index;
				}
			});

			return result;
		},
		
		_isDisabled: function(value) {
			var self = this;
			if (self.options.disabledOptions == undefined) {
				return false;
			}
			var finded = false;
			$.each(self.options.disabledOptions, function(index, item){
				if (("" + item) == "" + value) {
					finded = true;
					return false; // break
				}
			});
			return finded;
		},
		
		_setValue: function(value) {
			var self = this;
			var divWrapper = self.wrapper;
			
			var index = self._getIndex(value);
			if (index == undefined) {
				return;
			}
			
			divWrapper.slider({'value': index})
			self.element.val(value);
		},
		
		disable: function(disable) {
			if (disable) {
				this.wrapper.slider("disable");
			} else {
				this.wrapper.slider("enable")
			}
		},
		
		setDisabledOptions: function(disabledOptions) {
			this.options.disabledOptions = disabledOptions;
			this._initSlider();
		}
	});	
} ( jQuery ) );
