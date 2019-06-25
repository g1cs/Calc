$(document).click(function(e){
	if (!$(e.target).hasClass('.globaltab-slide-nav') && !$(e.target).parents('.globaltab-slide-nav').length) {
		$('.globaltab-slide-nav > li.active-li').removeClass('active-li');
	}
});

$(document).ready(function(){

	$('.tp1-add').click(function(){
		var clone = $(this).parents('.tp1-right-part').clone();
		clone.find('.tp1-add').replaceWith('<a href="" class="tp1-delete">Удалить</a>');
		$(this).parents('.tp1-right-part').after(clone);
		clone.wrap('<div class="tp1-width-100"></div>');

		return false;
	});

	if ($('.oson_services').length) {
		$('.oson_services').bxSlider({
			controls: false,
			minSlides: 3,
			maxSlides: 3,
			auto: false,
			pause: 6000,
			slideWidth: 314,
			slideMargin: 22
		});
		$('.oson_services').parents('.bx-wrapper').addClass('oson-slider-2')
	}

	$('.osago-online .top-nav-inside .globaltab-slide-nav > li > a').click(function(){
		if ($(this).parent().hasClass('active-li')) {
			$(this).parent().removeClass('active-li');
		} else {
			$(this).parent().parent().find('.active-li').removeClass('active-li');
			$(this).parent().addClass('active-li');
		}

		if ($('.oson_list-href').length) {
			var dataId = $(this).parent().attr('data-id');
			$('.oson_list-href.active').removeClass('active');
			$('.oson_list-href[data-id="' + dataId + '"]').addClass('active');
		}	

		return false;
	});

	if ($('.oson_news').length) {
		$('.oson_news .more a').click(function(){
			if (!$(this).parent().hasClass('non-active')) {
				$(this).text('Свернуть').css({width:50,'margin-left':-25});
				$(this).parent().addClass('non-active');
				$(this).parents('.oson_news').find('.oson_news_list').addClass('active');
			} else {
				$(this).text('Больше новостей').css({width:96,'margin-left':-48});
				$(this).parent().removeClass('non-active');
				$(this).parents('.oson_news').find('.oson_news_list').removeClass('active');
			}

			return false;
		});
	}

	$('.os-on_questions_list li .title').click(function(){
		$(this).parent().toggleClass('active');

		return false;
	});
	
	$('body').on('click', '.tp1-delete', function(){
		$(this).parents('.tp1-width-100').remove();

		return false;
	});
	//clear value input or textarea
	$(".clear-value").each(function(){var text=$(this).val();$(this).focusin(function(){if($(this).val()==text)$(this).val('');}).focusout(function(){if($(this).val()=='')$(this).val(text);});});
	
    //Развернуть/свернуть
	$(".prev-news-more").toggle(function(e){
	   e.preventDefault();
       $(".prev-news-content").animate({
            height: '265px'
       }, 500, function() {
        // Animation complete.
       });
       $(".prev-news-more .pnm-ico").css("background-position","bottom");
       $(".prev-news-more .prev-news-span").text("Свернуть")
	},function(e){
	   e.preventDefault();
       $(".prev-news-content").animate({
            height: '30px'
       }, 500, function() {
        // Animation complete.
       });
       $(".prev-news-more .pnm-ico").css("background-position","top");
       $(".prev-news-more .prev-news-span").text("Больше новостей")
	});
    $(".select-box").toggle(function(){
        $(this).addClass('active')
    },function(){
        $(this).removeClass('active')
    });
    $(".t-link").toggle(function(){
        $(this).css('background-position','right -10px');
        $(this).parent('.toggle').find('.t-slide').slideDown(300)
    }, function(){
        $(this).css('background-position','right 10px');
        $(this).parent('.toggle').find('.t-slide').slideUp(300)
    });
    $(".steps .step").click(function(){
        if(!$(this).hasClass('active')) {
            $(".steps .step").removeClass('active');
            $(this).addClass('active');
            id = $(this).attr('id');
            html = $(".step_text ."+id+"").html();
            $(".step_text .main_text").html(html)
        }
    });
	//
	$('.tab-slide').each(function(){
		var $tabSlide  = $(this),
		$tabSlideBlock = $tabSlide.find('.tab-slide-block'),
		$tabSliderNav  = null,
		tabSliderSpedd = 'fast';
		
		if ($tabSlideBlock.length > 1) {
			var l = $tabSlideBlock.length,
			html  = '<div class="tab-slide-nav"><input type="button" class="active">';
			while (--l) html += '<input type="button">';
            html += '</div>';
			$tabSliderNav = $tabSlide.append(html).find('.tab-slide-nav input');
			$tabSlideBlock.fadeOut(0).eq(0).fadeIn(0);
			
			var tabSlideChange = function () {
				if (!$(this).hasClass('active')) {
					$tabSliderNav.removeClass('active');
					$(this).addClass('active');
					$tabSlideBlock.fadeOut(0).eq(
						$tabSliderNav.index($(this))
					).fadeIn(tabSliderSpedd);
				}
				return false;
			};
			$tabSliderNav.click(tabSlideChange);
			
		}
	});
	
	var $toTop = $('.totop'),
	toTopSpeed = 'fast',
	toTopPos   = 300;
	
	if ($toTop.length) {
	
		var toTop = function(){
			$('body,html').animate({scrollTop:0}, toTopSpeed);
			return false;
		};
		
		var toTopShowHide = function(){
			if ($(window).scrollTop() <= toTopPos) $('.totop').hide();
			else $('.totop').show();
		};
		
		toTopShowHide();
		$(window).scroll(toTopShowHide);
		$('.totop').click(toTop);
	};
	
	var $gSlider = $('.globaltab-slider-list'),
	$gSliderNav  = $('.globaltab-slide-nav'),
	$gSliderBtn  = $('.globaltab-slider-prev, .globaltab-slider-next'),
	gSliderSpeed1 = 'fast', // Tab
	gSliderSpeed2 = 'fast', // Slider
	gSliderSpeed3 = 'fast'; // Global block
	
	if ($gSlider.length) {
			
		var activeIndex = $gSliderNav.find('li').index($gSliderNav.find('li.active')),
		gSlider = [];
		$gSlider.each(function(i){
			var w = 0;
			gSlider[i] = {showBtn:false, width:0, $drag:null, curr:0, maxCurr:0};
			$(this).find('li').wrapAll('<ul class="globaltab-slider-list-drag"/>').each(function(e){
				w += $(this).outerWidth(true);
			});
			gSlider[i].showBtn = w > 942;
			gSlider[i].width = w;
			gSlider[i].$drag = $(this).find('.globaltab-slider-list-drag').width(w);
			if (gSlider[i].showBtn) {
				gSlider[i].maxCurr = Math.floor(gSlider[i].width / 942);
			}
		});
		$gSlider.fadeOut(0).eq(activeIndex).fadeIn(0);
		
		var gSliderBtnShowHide = function () {
			if (!gSlider[activeIndex].showBtn) {
				$gSliderBtn.hide();
			} else {
				$gSliderBtn.show().removeClass('disabled');
				if (gSlider[activeIndex].curr == 0)
					$('.globaltab-slider-prev').addClass('disabled');
				if (gSlider[activeIndex].curr == gSlider[activeIndex].maxCurr)
					$('.globaltab-slider-next').addClass('disabled');
			}
		};
		gSliderBtnShowHide();
		
		$gSliderNav.find('a').click(function(){
			if (!$(this).parent().hasClass('active')) {
				activeIndex = $gSliderNav.find('a').index($(this));
				$gSliderNav.find('li').removeClass('active');
				$(this).parent().addClass('active');
				$gSlider.fadeOut(0).eq(activeIndex).fadeIn(gSliderSpeed1);
				gSliderBtnShowHide();
				if($(this).hasClass('m-special')) {
					$('.service-x1').hide();
					$('.service-x3').show();
				} else {
					$('.service-x1').show();
					$('.service-x3').hide();
				}
			}
			return false;
		});
		
		$gSliderBtn.click(function(){
			if (!$(this).hasClass('disabled')) {
				var vector = !$(this).hasClass('globaltab-slider-next'),
				ml = 0;
				vector ? gSlider[activeIndex].curr-- : gSlider[activeIndex].curr++;
				ml = gSlider[activeIndex].curr * 942;
				if (gSlider[activeIndex].curr == gSlider[activeIndex].maxCurr)
					ml = gSlider[activeIndex].width - 942;
				gSliderBtnShowHide();
				gSlider[activeIndex].$drag.animate({
					marginLeft : -(ml)
				}, gSliderSpeed2);
			}
			return false;
		});
		
		var gSliderBtnMoveToActive = function(){
			var $active = $gSlider.find('.active');
			if ($active.length) {
				var countClick = Math.floor($active.position().left / 942);
				while(countClick--) {
					$gSliderBtn.filter('.globaltab-slider-next').click();
				}
			}
		};
		
		if (!$('.globaltab-slider-inside').length) {
			var $gActive = $gSlider.find('li.active');
			if (!$gActive.lenght) $gActive = $gSlider.filter(':visible').find('li:eq(0)').addClass('active');
			$('.globaltab-subblock').fadeOut(0);
			$($gActive.find('a').attr('href')).fadeIn(0);
		} else {
			gSliderBtnMoveToActive();
		}
		
		var $gsicItems = $('.gsic-items img');
		$gSlider.find('a').click(function(){
			if (!$(this).parent().hasClass('active')) {
				if (!$('.globaltab-slider-inside').length) {
					$gSlider.find('li').removeClass('active');
					$(this).parent().addClass('active');
					$('.globaltab-subblock').fadeOut(0);
					$($(this).attr('href')).fadeIn(gSliderSpeed3);
					if ($gsicItems.length) {
						var $rItem = $gsicItems.eq(Math.floor(Math.random() * ($gsicItems.length)) + 0);
						$('.gsic-agent').text($rItem.attr('alt'));
						$('.gsic-agent-img img').attr('src',$rItem.attr('src'));
					}
					var $rItem = $('.gsic-items img')
					;
					return false;
				};
			} else {
				return false;
			}
		});
		
		if ($gsicItems.length) {
			var $rItem = $gsicItems.eq(Math.floor(Math.random() * ($gsicItems.length)) + 0);
			$('.gsic-agent').text($rItem.attr('alt'));
			$('.gsic-agent-img img').attr('src',$rItem.attr('src'));
		}
	};
	
	$(".tableSimple tr:odd").addClass("even");
	
	/* drop panel */
	$(".tl-select-link-drop, .city-close").click(function(e) {          
		e.preventDefault();
		$(".select-city-block").toggle();
		$(".tl-select-link-drop").toggleClass("drop-open");
	});
	$(".select-city-block").mouseup(function() {
		return false
	});
	$(document).mouseup(function(e) {
		if($(e.target).parent(".tl-select-link-drop").length==0) {
			$(".tl-select-link-drop").removeClass("drop-open");
			$(".select-city-block").hide();
		}
	});
	
	/* select */
	$(".select").selectbox();
	$(".select:disabled").selectbox("disable");
	//$('.input-radio, .input-checkbox').formReplacer();
	
	$('span.tooltip-show').tooltipTwit({html:true, placement:"bottom"});
	$('.typeahead').typeahead();
	
	$('.calculate-button').click(function(){
		$(this).addClass("calculate-button-refresh");
		$(".calculate-result-content").show();
		$('html, body').stop(true,true).animate({
			scrollTop : $(this).position().top - 20
		}, 'slow');
	});
	
	var $gbPanelAll = $(".gb-panel-all-fixed");
	$(window).scroll(function(){
		var offsetBottom = $('.main').height() - $(window).height() - $(window).scrollTop();
		if (offsetBottom < 208) {
			$gbPanelAll.stop(true, true).animate({
				bottom : 208 - offsetBottom
			}, 0);
		} else {
			$gbPanelAll.stop(true, true).css('bottom', 0);
		}
	});
	
	
	$( ".slider-min-x6" ).slider({
      range: "min",
      value: 4,
      min: 1,
      max: 6
    });
	
	$( ".slider-min-x3" ).slider({
      range: "min",
      value: 2,
      min: 1,
      max: 3
    });
	
	$( ".slider-min-x4" ).slider({
      range: "min",
      value: 2,
      min: 1,
      max: 4
    });
	
	/* fancybox */
	$(".fancybox").fancybox({
		openEffect:'none',
		closeEffect:'none'
	});
	
	
	/* jcarousel */	
	jQuery('.jcarousel-skin-map').jcarousel({
		scroll: 1
	});
	
	$('.to-list-item').tipsy({gravity: 'w'});
	
	$(".sticky").fixer({gap:15});
	
	/* date last modified */
	
	if($('.date-lastmodified-push').length) {
		$('.date-lastmodified-push').css('display', 'block');
		$('.date-lastmodified').addClass('date-lastmodified-shift');
	}
	
    
});//document ready

/* selectbox plugin 0.2 */
(function($,undefined){var PROP_NAME="selectbox",FALSE=false,TRUE=true;function Selectbox(){this._state=[];this._defaults={classHolder:"sbHolder",classHolderDisabled:"sbHolderDisabled",classSelector:"sbSelector",classOptions:"sbOptions",classGroup:"sbGroup",classSub:"sbSub",classDisabled:"sbDisabled",classToggleOpen:"sbToggleOpen",classToggle:"sbToggle",classFocus:"sbFocus",speed:200,effect:"fade",onChange:null,onOpen:null,onClose:null}}$.extend(Selectbox.prototype,{_isOpenSelectbox:function(target){if(!target){return FALSE}var inst=this._getInst(target);return inst.isOpen},_isDisabledSelectbox:function(target){if(!target){return FALSE}var inst=this._getInst(target);return inst.isDisabled},_attachSelectbox:function(target,settings){if(this._getInst(target)){return FALSE}var $target=$(target),self=this,inst=self._newInst($target),sbHolder,sbSelector,sbToggle,sbOptions,s=FALSE,optGroup=$target.find("optgroup"),opts=$target.find("option"),olen=opts.length;$target.attr("sb",inst.uid);$.extend(inst.settings,self._defaults,settings);self._state[inst.uid]=FALSE;$target.hide();function closeOthers(){var key,sel,uid=this.attr("id").split("_")[1];for(key in self._state){if(key!==uid){if(self._state.hasOwnProperty(key)){sel=$("select[sb='"+key+"']")[0];if(sel){self._closeSelectbox(sel)}}}}}sbHolder=$("<div>",{id:"sbHolder_"+inst.uid,"class":inst.settings.classHolder,tabindex:$target.attr("tabindex")});sbSelector=$("<a>",{id:"sbSelector_"+inst.uid,href:"#","class":inst.settings.classSelector,click:function(e){e.preventDefault();closeOthers.apply($(this),[]);var uid=$(this).attr("id").split("_")[1];if(self._state[uid]){self._closeSelectbox(target)}else{self._openSelectbox(target)}}});sbToggle=$("<a>",{id:"sbToggle_"+inst.uid,href:"#","class":inst.settings.classToggle,click:function(e){e.preventDefault();closeOthers.apply($(this),[]);var uid=$(this).attr("id").split("_")[1];if(self._state[uid]){self._closeSelectbox(target)}else{self._openSelectbox(target)}}});sbToggle.appendTo(sbHolder);sbOptions=$("<ul>",{id:"sbOptions_"+inst.uid,"class":inst.settings.classOptions,css:{display:"none"}});$target.children().each(function(i){var that=$(this),li,config={};if(that.is("option")){getOptions(that)}else{if(that.is("optgroup")){li=$("<li>");$("<span>",{text:that.attr("label")}).addClass(inst.settings.classGroup).appendTo(li);li.appendTo(sbOptions);if(that.is(":disabled")){config.disabled=true}config.sub=true;getOptions(that.find("option"),config)}}});function getOptions(){var sub=arguments[1]&&arguments[1].sub?true:false,disabled=arguments[1]&&arguments[1].disabled?true:false;arguments[0].each(function(i){var that=$(this),li=$("<li>"),child;if(that.is(":selected")){sbSelector.text(that.text());s=TRUE}if(i===olen-1){li.addClass("last")}if(!that.is(":disabled")&&!disabled){child=$("<a>",{href:"#"+that.val(),rel:that.val()}).text(that.text()).bind("click.sb",function(e){if(e&&e.preventDefault){e.preventDefault()}var t=sbToggle,$this=$(this),uid=t.attr("id").split("_")[1];self._changeSelectbox(target,$this.attr("rel"),$this.text());self._closeSelectbox(target)}).bind("mouseover.sb",function(){var $this=$(this);$this.parent().siblings().find("a").removeClass(inst.settings.classFocus);$this.addClass(inst.settings.classFocus)}).bind("mouseout.sb",function(){$(this).removeClass(inst.settings.classFocus)});if(sub){child.addClass(inst.settings.classSub)}if(that.is(":selected")){child.addClass(inst.settings.classFocus)}child.appendTo(li)}else{child=$("<span>",{text:that.text()}).addClass(inst.settings.classDisabled);if(sub){child.addClass(inst.settings.classSub)}child.appendTo(li)}li.appendTo(sbOptions)})}if(!s){sbSelector.text(opts.first().text())}$.data(target,PROP_NAME,inst);sbHolder.data("uid",inst.uid).bind("keydown.sb",function(e){var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0,$this=$(this),uid=$this.data("uid"),inst=$this.siblings("select[sb='"+uid+"']").data(PROP_NAME),trgt=$this.siblings(["select[sb='",uid,"']"].join("")).get(0),$f=$this.find("ul").find("a."+inst.settings.classFocus);switch(key){case 37:case 38:if($f.length>0){var $next;$("a",$this).removeClass(inst.settings.classFocus);$next=$f.parent().prevAll("li:has(a)").eq(0).find("a");if($next.length>0){$next.addClass(inst.settings.classFocus).focus();$("#sbSelector_"+uid).text($next.text())}}break;case 39:case 40:var $next;$("a",$this).removeClass(inst.settings.classFocus);if($f.length>0){$next=$f.parent().nextAll("li:has(a)").eq(0).find("a")}else{$next=$this.find("ul").find("a").eq(0)}if($next.length>0){$next.addClass(inst.settings.classFocus).focus();$("#sbSelector_"+uid).text($next.text())}break;case 13:if($f.length>0){self._changeSelectbox(trgt,$f.attr("rel"),$f.text())}self._closeSelectbox(trgt);break;case 9:if(trgt){var inst=self._getInst(trgt);if(inst){if($f.length>0){self._changeSelectbox(trgt,$f.attr("rel"),$f.text())}self._closeSelectbox(trgt)}}var i=parseInt($this.attr("tabindex"),10);if(!e.shiftKey){i++}else{i--}$("*[tabindex='"+i+"']").focus();break;case 27:self._closeSelectbox(trgt);break}e.stopPropagation();return false}).delegate("a","mouseover",function(e){$(this).addClass(inst.settings.classFocus)}).delegate("a","mouseout",function(e){$(this).removeClass(inst.settings.classFocus)});sbSelector.appendTo(sbHolder);sbOptions.appendTo(sbHolder);sbHolder.insertAfter($target);$("html").live("mousedown",function(e){/*e.stopPropagation();*/$("select").selectbox("close")});$([".",inst.settings.classHolder,", .",inst.settings.classSelector].join("")).mousedown(function(e){e.stopPropagation()})},_detachSelectbox:function(target){var inst=this._getInst(target);if(!inst){return FALSE}$("#sbHolder_"+inst.uid).remove();$.data(target,PROP_NAME,null);$(target).show()},_changeSelectbox:function(target,value,text){var onChange,inst=this._getInst(target);if(inst){onChange=this._get(inst,"onChange");$("#sbSelector_"+inst.uid).text(text)}value=value.replace(/\'/g,"\\'");$(target).find("option[value='"+value+"']").attr("selected",TRUE);if(inst&&onChange){onChange.apply((inst.input?inst.input[0]:null),[value,inst])}else{if(inst&&inst.input){inst.input.trigger("change")}}},_enableSelectbox:function(target){var inst=this._getInst(target);if(!inst||!inst.isDisabled){return FALSE}$("#sbHolder_"+inst.uid).removeClass(inst.settings.classHolderDisabled);inst.isDisabled=FALSE;$.data(target,PROP_NAME,inst)},_disableSelectbox:function(target){var inst=this._getInst(target);if(!inst||inst.isDisabled){return FALSE}$("#sbHolder_"+inst.uid).addClass(inst.settings.classHolderDisabled);inst.isDisabled=TRUE;$.data(target,PROP_NAME,inst)},_optionSelectbox:function(target,name,value){var inst=this._getInst(target);if(!inst){return FALSE}inst[name]=value;$.data(target,PROP_NAME,inst)},_openSelectbox:function(target){var inst=this._getInst(target);if(!inst||inst.isOpen||inst.isDisabled){return }var el=$("#sbOptions_"+inst.uid),viewportHeight=parseInt($(window).height(),10),offset=$("#sbHolder_"+inst.uid).offset(),scrollTop=$(window).scrollTop(),height=el.prev().height(),diff=viewportHeight-(offset.top-scrollTop)-height/2,onOpen=this._get(inst,"onOpen");el.css({top:height+"px",maxHeight:(diff-height)+"px"});inst.settings.effect==="fade"?el.fadeIn(inst.settings.speed):el.slideDown(inst.settings.speed);$("#sbToggle_"+inst.uid).addClass(inst.settings.classToggleOpen);this._state[inst.uid]=TRUE;inst.isOpen=TRUE;if(onOpen){onOpen.apply((inst.input?inst.input[0]:null),[inst])}$.data(target,PROP_NAME,inst)},_closeSelectbox:function(target){var inst=this._getInst(target);if(!inst||!inst.isOpen){return }var onClose=this._get(inst,"onClose");inst.settings.effect==="fade"?$("#sbOptions_"+inst.uid).fadeOut(inst.settings.speed):$("#sbOptions_"+inst.uid).slideUp(inst.settings.speed);$("#sbToggle_"+inst.uid).removeClass(inst.settings.classToggleOpen);this._state[inst.uid]=FALSE;inst.isOpen=FALSE;if(onClose){onClose.apply((inst.input?inst.input[0]:null),[inst])}$.data(target,PROP_NAME,inst)},_newInst:function(target){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:id,input:target,uid:Math.floor(Math.random()*99999999),isOpen:FALSE,isDisabled:FALSE,settings:{}}},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this selectbox"}},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]}});$.fn.selectbox=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&options=="isDisabled"){return $.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this[0]].concat(otherArgs))}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.selectbox["_"+options+"Selectbox"].apply($.selectbox,[this].concat(otherArgs)):$.selectbox._attachSelectbox(this,options)})};$.selectbox=new Selectbox();$.selectbox.version="0.2"})(jQuery);

/* radio/ch */
(function(b){b.fn.formReplacer=function(x){function s(a){a.which=a.which||a.keyCode;if(a.which===32){b(this).click();return false}}function l(a,d,c){var e;a.each(function(){e=d?!b(this).hasClass("selected"):c;b(this).toggleClass("selected",e);b(':checkbox[name="'+b(this).data("name")+'"][value="'+b(this).data("value")+'"]').attr("checked",e)})}function t(a){a.newObj=b('<span class="modify'+a.className+" "+a.existingClasses+'" id="'+a.existingIDs+'" tabindex="'+n(a.old)+'"><span></span></span>');a.elemImgObj=b('<span class="modify'+a.className+'Img"></span>');a.newObj.data("name",a.nameAttr);a.newObj.data("value",a.old.attr("value"));a.newObj.data("disabled",a.old.is(":disabled"));a.newObj.toggleClass("selected",a.old.is(":checked"));a.newObj.toggleClass("disabled",a.newObj.data("disabled"));a.old.after(a.newObj);a.newObj.append(a.elemImgObj).append(a.label)}function u(a){b(a.target).parents(".modifySelectOptions").length||b(".modifySelectOptions").slideUp(100)}function v(){if(b.browser.msie) document.selection.empty();else b.browser.opera && parseInt(b.browser.version,10)===9||window.getSelection().removeAllRanges()}function o(a){var d=a.shiftKey||a.ctrlKey;d && v();this.onselectstart=function(){return !d};return !d}function w(a){a.which=a.which||a.keyCode;if(a.which===32||a.which===i.up||a.which===i.down||a.which===i.right||a.which===i.left) return false}function j(a){a.css("outline","none").data("outlined",false)}function y(a){a.css("outline","none");a.focusout(function(){b(this).css("outline","none")});a.keyup(function(d){d.which=d.which||d.keyCode;d.which===9 && b(this).css("outline","#fff dotted thin")})}function n(a){m.tabIndex=a.attr("tabindex")?a.attr("tabindex"):++m.prevTabIndex;return m.prevTabIndex=m.tabIndex}function p(a,d){a.each(function(){if(d.children('option[value="'+a.data("value")+'"]').attr("selected")===true){a.removeClass("selected");d.children('option[value="'+a.data("value")+'"]').attr("selected",false)}else{a.addClass("selected");d.children('option[value="'+a.data("value")+'"]').attr("selected",true)}})}var z=b.extend({rtl:false},x),m={tabIndex:0,prevTabIndex:0},h={lastClicked:{},checkAll:true},i={left:37,up:38,right:39,down:40},r={radio:{create:t,events:{click:function(a){a.preventDefault();b(".modifyRadio").filter(function(){return b(this).data("name")===a.data.obj.newObj.data("name")}).removeClass("selected");b(':radio[name="'+a.data.obj.newObj.data("name")+'"]').each(function(){b(this).attr("checked",false)});a.data.obj.old.filter('[value="'+a.data.obj.newObj.data("value")+'"]').attr("checked",true);a.data.obj.newObj.addClass("selected")},keypress:s}},checkbox:{create:t,events:{click:function(a){a.preventDefault();j(b(this));var d=b(".modifyCheckbox").filter(function(){return b(this).data("name")===a.data.obj.nameAttr && !b(this).data("disabled")}),c=d.index(b(this));h.lastClicked[a.data.obj.nameAttr]||(h.lastClicked[a.data.obj.nameAttr]=null);if(a.shiftKey) if(h.lastClicked[a.data.obj.nameAttr]===null){l(d.filter(":lt("+c+")").andSelf(),false,true);l(d.filter(":gt("+c+")"),false,false)}else{var e=d.index(h.lastClicked[a.data.obj.nameAttr]);c=d.slice(e<=c?e:c,e<=c?c+1:e+1);l(c,false,true);l(d.not(c),false,false)}else{h.lastClicked[a.data.obj.nameAttr]=b(this);l(b(this),true,false)}},mousedown:o,keypress:s}},"select-one":{create:function(a){a.newObj=b('<span class="modifySelect '+a.existingClasses+'" id="'+a.existingIDs+'" tabindex="'+n(a.old)+'"></span>');a.options=a.old.children("option");a.hasOptGroups=!! a.old.has("optgroup").length;a.optGroups=a.hasOptGroups?a.old.children("optgroup"):null;a.currentOption=a.hasOptGroups?a.old.find("option:selected").text():a.options.filter(":selected").text();a.newOptions=b('<ul class="modifySelectOptions"></ul>').hide();a.newObj.data("name",a.nameAttr);a.newOptions.data("name",a.nameAttr);a.newObj.data("disabled",a.old.is(":disabled"));a.newObj.toggleClass("disabled",a.newObj.data("disabled"));if(!a.newObj.data("disabled")){b(document).unbind("click",u);b(document).bind("click",{obj:a},u);a.newOptions.delegate("li","click",function(d){if(!b(d.target).hasClass("modifyOptGroup") && !b(d.target).data("disabled")){a.newOptions.slideUp(100);a.newObj.html("<span class='modifySelectBg'>"+b(this).text()+"</span>");a.old.val(b(this).data("value"))}})}a.hasOptGroups?a.optGroups.each(function(){var d=b('<li id="'+b(this).attr("id")+'" class="modifyOptGroup '+b(this).attr("class")+'">'+b(this).attr("label")+"</li>");a.newOptions.append(d);b(this).children("option").each(function(c,e){var g=b(e).text() !==""?b(e).text():"&nbsp;",q=b(e).attr("class"),A=b(e).is(":disabled")?"disabled":"";g=b("<li/>",{"class":q+" "+A,id:b(e).attr("id"),text:g}).data("value",b(e).val()).data("disabled",b(e).is(":disabled"));a.newOptions.append(g)})}):a.options.each(function(d,c){var e=b(c).text() !==""?b(c).text():"&nbsp;",g=b(c).attr("class"),q=b(c).is(":disabled")?"disabled":"";e=b("<li/>",{"class":g+" "+q,id:b(c).attr("id"),text:e}).data("value",b(c).val()).data("disabled",b(c).is(":disabled"));a.newOptions.append(e)});jQuery.browser.msie && parseInt(jQuery.browser.version,10)<=6 && a.newOptions.children("li").css("width",a.newOptions.width());a.newObj.html(a.currentOption !==""?a.currentOption:"&nbsp;").insertAfter(a.old).after(a.newOptions)},events:{click:function(a){a.stopPropagation();j(b(this));a.data.obj.newOptions.css({position:"absolute",top:a.data.obj.newObj.offset().top+a.data.obj.newObj.outerHeight(),left:z.rtl?a.data.obj.newObj.offset().left+a.data.obj.newObj.outerWidth() - a.data.obj.newOptions.outerWidth():a.data.obj.newObj.offset().left,zIndex:"9999"});a.data.obj.newOptions.slideToggle(100)},keydown:function(a){var d=a.data.obj.newOptions.children(),c=d.length,e=d.filter(function(){return b(this).data("value")===a.data.obj.old.val()});a.which=a.which||a.keyCode;if(a.which===i.right||a.which===i.down){var g=e.next();if(d.index(e)+1 !==c){for(;g.data("disabled")||g.hasClass("modifyOptGroup");) g=g.next();g.click()}return false}else if(a.which===i.left||a.which===i.up){c=e.prev();if(d.index(e) !==0){for(;c.data("disabled")||c.hasClass("modifyOptGroup");) c=c.prev();c.click()}return false}},keypress:w}},"select-multiple":{create:function(a){a.newObj=b('<ul id="'+a.existingIDs+'" class="modifySelectMultiple '+a.existingClasses+'" tabindex="'+n(a.old)+'"></ul>').data("name",a.old.attr("name"));a.newObj.data("disabled",a.old.is(":disabled"));a.newObj.toggleClass("disabled",a.newObj.data("disabled"));a.options=a.old.children("option");a.selectedOptions=a.old.children("option:selected");a.lastClicked=null;a.options.each(function(d,c){var e=b(c).text() !==""?b(c).text():"&nbsp;";e=b("<li/>",{"class":b(c).attr("class"),id:b(c).attr("id"),text:e}).data("value",b(c).val()).data("disabled",b(c).is(":disabled"));e.toggleClass("selected",b(c).is(":selected"));e.toggleClass("disabled",e.data("disabled"));a.newObj.append(e)});a.newObj.data("disabled")||a.newObj.delegate("li","click",function(d){if(!b(d.target).data("disabled")){j(a.newObj);if(d.shiftKey) if(a.lastClicked===null){a.old.children('option[value="'+b(this).data("value")+'"]').prevAll().andSelf().filter(function(){return b(this).attr("disabled")===false}).attr("selected",true);b(this).prevAll().andSelf().filter(function(){return b(this).data("disabled")===false}).addClass("selected");a.old.children('option[value="'+b(this).data("value")+'"]').nextAll().attr("selected",false);b(this).nextAll().removeClass("selected")}else{d=a.lastClicked.index()<=b(this).index()?a.lastClicked.index():b(this).index();var c=a.lastClicked.index()<=b(this).index()?b(this).index()+1:a.lastClicked.index()+1,e=b(this).siblings().andSelf().slice(d,c);d=a.old.children("option").slice(d,c);d.filter(function(){return b(this).attr("disabled")===false}).attr("selected",true);e.filter(function(){return b(this).data("disabled")===false}).addClass("selected");a.old.children("option").not(d).attr("selected",false);b(this).siblings().not(e).removeClass("selected")}else{a.lastClicked=b(this);e=a.old.children('option[value="'+b(this).data("value")+'"]');if(d.ctrlKey){d=e.is(":selected");e.attr("selected",!d);b(this).toggleClass("selected",!d)}else{e.attr("selected",true);b(this).addClass("selected");e.siblings().attr("selected",false);b(this).siblings().removeClass("selected")}}}});a.newObj.insertAfter(a.old);a.newObj.css("width",a.newObj.width()+20)},events:{mousedown:o,keypress:w,focus:o,keydown:function(a){v();a.which=a.which||a.keyCode;var d=b.Event("click"),c=b(this).children("li").filter(function(){return a.data.obj.old.children('option[value="'+b(this).data("value")+'"]').is(":selected")});d.shiftKey=true;if(a.which===32){p(b(this).children("li").filter(function(){return b(this).data("outlined")===true}),a.data.obj.old);return false}if(a.which===i.right||a.which===i.down){for(var e=c.length===0?b(this).children("li:first"):c.filter(":last").next();e.data("disabled");) e=e.next();if(a.shiftKey){k>0?p(c.filter(":first"),a.data.obj.old):e.trigger(d);c.filter(b(this).children("li:not(.disabled):last")).length||k--}else if(a.ctrlKey){j(b(this).children("li"));if(f===null) f=0;b(this).children("li:not(.disabled)").eq(f).data("outlined",true).css("outline","#fff dotted thin");f=f<b(this).children("li:not(.disabled)").length - 1?++f:f}else{j(b(this).children("li"));k=0;if(b(this).children("li:not(.disabled)").index(c.filter(":last")) !==b(this).children("li:not(.disabled)").length - 1){e.click();f=b(this).children("li:not(.disabled)").index(e)}else{b(this).children("li:not(.disabled):last").click();f=b(this).children("li:not(.disabled)").length - 1}}return false}else if(a.which===i.left||a.which===i.up){for(e=c.length===0?b(this).children("li:first"):c.filter(":first").prev();e.data("disabled");) e=e.prev();if(a.shiftKey){k<0?p(c.filter(":last"),a.data.obj.old):e.trigger(d);c.filter(b(this).children("li:not(.disabled):first")).length||k++}else if(a.ctrlKey){k++;f=f>0?--f:f;j(b(this).children("li"));b(this).children("li:not(.disabled)").eq(f).data("outlined",true).css("outline","#fff dotted thin")}else{j(b(this).children("li"));k=0;if(b(this).children("li:not(.disabled)").index(c.filter(":first")) !==0){e.click();f=b(this).children("li:not(.disabled)").index(e)}else{b(this).children("li:not(.disabled):first").click();f=b(this).children("li:not(.disabled)").index("li:not(.disabled):first")}}return false}}}}},k=0,f=null,B=function(){var a=function(d,c){this.className=d.replace(/^./,d.match(/^./)[0].toUpperCase());this.elemType=d;this.old=b(c).hide();this.existingClasses=b(c).attr("class");this.existingIDs=b(c).attr("id");this.nameAttr=b(this.old).attr("name");this.label=b('label[for="'+b(this.old).attr("id")+'"]');r[this.elemType].create(this);this.newObj.data("disabled")||this.newObj.bind(r[this.elemType].events,{obj:this})};return function(d,c){return new a(d,c)}}();this.each(function(){if(this.type in r){var a=new B(this.type,this);y(a.newObj)}});b(".checkAll").click(function(){var a=b(this).attr("class").replace(/(checkAll\s)(.*)/,"$2").split(" "),d=0,c=0,e=null,g;for(g in a){e=b(".modifyCheckbox").filter(function(){return b(this).data("name")===a[g]});e.each(function(){d++;b(':checkbox[value="'+b(this).data("value")+'"]').is(":checked") && c++});if(d==c && h.checkAll) h.checkAll=false;if(c===0 && !h.checkAll) h.checkAll=true;e.each(function(){b(this).toggleClass("selected",h.checkAll);b(':checkbox[value="'+b(this).data("value")+'"]').attr("checked",h.checkAll)})}h.checkAll=!h.checkAll;return false});return this}})(jQuery);




/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var TooltipTwit = function (element, options) {
    this.init('tooltipTwit', element, options)
  }

  TooltipTwit.prototype = {

    constructor: TooltipTwit

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltipTwit

  $.fn.tooltipTwit = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltipTwit')
        , options = typeof option == 'object' && option


      if (!data) $this.data('tooltipTwit', (data = new TooltipTwit(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltipTwit.Constructor = TooltipTwit

  $.fn.tooltipTwit.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltipTwit.noConflict = function () {
    $.fn.tooltipTwit = old
    return this
  }

}(window.jQuery);




/* =============================================================
 * bootstrap-typeahead.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);

/* modal lib */
/*!function($){"use strict";var Modal=function(element,options){this.options=options;this.$element=$(element).delegate('[data-dismiss="modal"]','click.dismiss.modal',$.proxy(this.hide,this));this.options.remote && this.$element.find('.modal-body').load(this.options.remote)};Modal.prototype={constructor:Modal,toggle:function(){return this[!this.isShown?'show':'hide']()},show:function(){var that=this,e=$.Event('show');this.$element.trigger(e);if(this.isShown||e.isDefaultPrevented()) return;$('body').addClass('modal-open');this.isShown=true;this.escape();this.backdrop(function(){var transition=$.support.transition && that.$element.hasClass('fade');if(!that.$element.parent().length){that.$element.appendTo(document.body)}that.$element.show();if(transition){that.$element[0].offsetWidth}that.$element.addClass('in').attr('aria-hidden',false).focus();that.enforceFocus();transition?that.$element.one($.support.transition.end,function(){that.$element.trigger('shown')}):that.$element.trigger('shown');});},hide:function(e){e && e.preventDefault();var that=this;e=$.Event('hide');this.$element.trigger(e);if(!this.isShown||e.isDefaultPrevented()) return;this.isShown=false;$('body').removeClass('modal-open');this.escape();$(document).off('focusin.modal');this.$element.removeClass('in').attr('aria-hidden',true);$.support.transition && this.$element.hasClass('fade')?this.hideWithTransition():this.hideModal();},enforceFocus:function(){var that=this;$(document).on('focusin.modal',function(e){if(that.$element[0] !==e.target && !that.$element.has(e.target).length){that.$element.focus()}});},escape:function(){var that=this;if(this.isShown && this.options.keyboard){this.$element.on('keyup.dismiss.modal',function(e ){e.which==27 && that.hide()});}else if(!this.isShown){this.$element.off('keyup.dismiss.modal')}},hideWithTransition:function(){var that=this,timeout=setTimeout(function(){that.$element.off($.support.transition.end);that.hideModal()},500);this.$element.one($.support.transition.end,function(){clearTimeout(timeout);that.hideModal()});},hideModal:function(that){this.$element.hide().trigger('hidden');this.backdrop();},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null;},backdrop:function(callback){var that=this,animate=this.$element.hasClass('fade')?'fade':'';if(this.isShown && this.options.backdrop){var doAnimate=$.support.transition && animate;this.$backdrop=$('<div class="modal-backdrop '+animate+'"/>').appendTo(document.body);if(this.options.backdrop !='static'){this.$backdrop.click($.proxy(this.hide,this))}if(doAnimate) this.$backdrop[0].offsetWidth;this.$backdrop.addClass('in');doAnimate?this.$backdrop.one($.support.transition.end,callback):callback();}else if(!this.isShown && this.$backdrop){this.$backdrop.removeClass('in');$.support.transition && this.$element.hasClass('fade')?this.$backdrop.one($.support.transition.end,$.proxy(this.removeBackdrop,this)):this.removeBackdrop()}else if(callback){callback()}}};$.fn.modal=function(option){return this.each(function(){var $this=$(this),data=$this.data('modal'),options=$.extend({},$.fn.modal.defaults,$this.data(),typeof option=='object' && option);if(!data) $this.data('modal',(data=new Modal(this,options)));if(typeof option=='string') data[option]();else if(options.show) data.show()});};$.fn.modal.defaults={backdrop:true,keyboard:true,show:true};$.fn.modal.Constructor=Modal
$(function(){$('body').on('click.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this),href=$this.attr('href'),$target=$($this.attr('data-target')||(href && href.replace(/.*(?=#[^\s]+$)/,''))),option=$target.data('modal')?'toggle':$.extend({remote:!/#/.test(href) && href},$target.data(),$this.data());e.preventDefault();$target.modal(option).one('hide',function(){$this.focus()});});});
}(window.jQuery);*/

/* mousewheel */
(function(d){function e(a){var b=a||window.event,c=[].slice.call(arguments,1),f=0,e=0,g=0,a=d.event.fix(b);a.type="mousewheel";b.wheelDelta&&(f=b.wheelDelta/120);b.detail&&(f=-b.detail/3);g=f;b.axis!==void 0&&b.axis===b.HORIZONTAL_AXIS&&(g=0,e=-1*f);b.wheelDeltaY!==void 0&&(g=b.wheelDeltaY/120);b.wheelDeltaX!==void 0&&(e=-1*b.wheelDeltaX/120);c.unshift(a,f,e,g);return(d.event.dispatch||d.event.handle).apply(this,c)}var c=["DOMMouseScroll","mousewheel"];if(d.event.fixHooks)for(var h=c.length;h;)d.event.fixHooks[c[--h]]=
d.event.mouseHooks;d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],e,false);else this.onmousewheel=e},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],e,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);


/* jcarousel lib */
(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);

/* sticky lib */
;(function($,window){'use strict';$.fn.fixer=function(options){options=$.extend({},$.fn.fixer.options,options);return this.each(function(){var $this=$(this),$wrap=$this.parent(),$win=$(window);$win.bind("scroll load",function(){var cssPos=(options.horizontal?'left':'top'),wrapPos=$wrap.offset()[options.horizontal?'left':'top'],elemSize=$this[options.horizontal?'outerWidth':'outerHeight'](),wrapSize=$wrap[options.horizontal?'outerWidth':'outerHeight'](),scrollPos=$win[options.horizontal?'scrollLeft':'scrollTop']();if(scrollPos>=wrapPos - options.gap &&(wrapSize+wrapPos - options.gap)>=(scrollPos+elemSize)){$this.css({position:'fixed'}).css(options.horizontal?{left:options.gap}:{top:options.gap});options.isFixed();}else if(scrollPos<wrapPos){$this.css({position:'absolute'}).css(options.horizontal?{left:0}:{top:0});}else{$this.css({position:'absolute'}).css(options.horizontal?{left:wrapSize - elemSize}:{top:wrapSize - elemSize});}});});};$.fn.fixer.options={gap:0,horizontal:false,isFixed:$.noop};})(jQuery,window);


// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// releated under the MIT license

(function($) {
    
    function fixTitle($ele) {
        if ($ele.attr('title') || typeof($ele.attr('original-title')) != 'string') {
            $ele.attr('original-title', $ele.attr('title') || '').removeAttr('title');
        }
    }
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        fixTitle(this.$element);
    }
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
                var gravity = (typeof this.options.gravity == 'function')
                                ? this.options.gravity.call(this.$element[0])
                                : this.options.gravity;
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            fixTitle($e);
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>');
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            return this.data('tipsy')[options]();
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };
        
        if (!options.live) this.each(function() { get(this); });
        
        if (options.trigger != 'manual') {
            var binder   = options.live ? 'live' : 'bind',
                eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        delayIn: 100,
        delayOut: 50,
        fade: true,
        fallback: '',
        gravity: 'w',
        html: true,
        live: false,
        offset: 0,
        opacity:1,
        title: 'title',
        trigger: 'hover'
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
})(jQuery);


