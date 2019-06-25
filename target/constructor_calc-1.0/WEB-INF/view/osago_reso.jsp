<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- saved from url=(0048)https://www.reso.ru/Retail/AGO/OSAGO/Calculator/ -->
<html class=""><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


	<title>Калькулятор ОСАГО</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="Description" content="Калькулятор ОСАГО">

	<meta http-equiv="Keywords" content="полис ОСАГО, ОСАГО, ДГО, ГО, автогражданка, страхование автогражданской ответственности, лимит ответственности, РЕСО, РЕСОавто, автострахование, авто, страхование, полис каско, каско, угон, ущерб, агентская сеть">

	<meta name="viewport" content="width=1000">
	<meta name="yandex-verification" content="4c1bebd3f45c8792">

	<link rel="icon" href="https://www.reso.ru/system/modules/ru.reso/resources/images/favicon/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="https://www.reso.ru/system/modules/ru.reso/resources/images/favicon/favicon.ico" type="image/x-icon">
	<link rel="canonical" href="https://www.reso.ru/">

	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/osago_reso/style.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/osago_reso/osago-online.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/osago_reso/selective.css">

	<!--[if lt IE 9]><script src="/system/modules/ru.reso/resources/js/html5.js"></script><![endif]-->
	<script type="text/javascript" async="" src="${pageContext.request.contextPath}/resources/osago_reso/recaptcha__ru.js"></script><script src="${pageContext.request.contextPath}/resources/osago_reso/sdk.js" async="" crossorigin="anonymous"></script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/resources/osago_reso/analytics.js"></script><script id="facebook-jssdk" src="${pageContext.request.contextPath}/resources/osago_reso/sdk(1).js"></script><script async="" src="${pageContext.request.contextPath}/resources/osago_reso/analytics.js"></script><script type="text/javascript" async="" src="${pageContext.request.contextPath}/resources/osago_reso/watch.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery-1.12.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.fancybox.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/reso-common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.bxslider.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.inputmask.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.inputmask.numeric.extensions.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery-ui-1.12.0.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.cookie.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery-custom-widgets.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/jquery.ui.datepicker-ru.js"></script>
	<link href="${pageContext.request.contextPath}/resources/css/class.css" rel="stylesheet"/>
	<link href="${pageContext.request.contextPath}/resources/css/elements.css" rel="stylesheet"/>
	<script src="${pageContext.request.contextPath}/resources/js/calc.js"></script>





	<style type="text/css">.fancybox-margin{margin-right:0px;}</style><style type="text/css">.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:"lucida grande", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}@keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}
	.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50%;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100%;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100%}.fb_dialog.fb_dialog_mobile.loading{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/3rhSv5V8j3o.gif) white no-repeat 50% 50%;min-height:100%;min-width:100%;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100%}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100%;position:absolute;right:0;top:0;width:100%;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#1d3c78;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100%}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/jKEcVPZFk-2.gif) no-repeat 50% 50%;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/t-wz8gw1xG1.png);background-position:50% 50%;background-repeat:no-repeat;height:24px;width:24px}@keyframes rotateSpinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
	.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100%}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100%}</style></head>

<body class="osago-online">








<%--<link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet" />--%>
<%--<link href="${pageContext.request.contextPath}/resources/bootstrap/css/modern-business.css" rel="stylesheet" />--%>
<%--<script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-3.4.1.js" ></script>--%>

<%--<link href="${pageContext.request.contextPath}/resources/bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet">--%>
<%--<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:400,300,700,900" rel="stylesheet">--%>
<%--<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">--%>

<%--<link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet" />--%>
<%--<link href="${pageContext.request.contextPath}/resources/css/edit.css" rel="stylesheet" />--%>
<%--<link href="${pageContext.request.contextPath}/resources/css/calcs.css" rel="stylesheet" />--%>


<script>

</script>









<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter25356824 = new Ya.Metrika({
                    id:25356824,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true,
                    triggerEvent: true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/25356824" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-7464430-1', 'auto');
    ga('send', 'pageview');

</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async="" src="${pageContext.request.contextPath}/resources/osago_reso/js"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-127436417-1');
</script>

















<div id="fb-root" class=" fb_reset"><div style="position: absolute; top: -10000px; width: 0px; height: 0px;"><div><iframe name="fb_xdm_frame_https" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" id="fb_xdm_frame_https" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" src="${pageContext.request.contextPath}/resources/osago_reso/xd_arbiter.html" style="border: none;"></iframe></div><div></div></div></div>
<script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.5";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>











<div id="agreement" class="agreement-block" style="display: none;position: fixed;bottom: 0;left: 0;width: 100%;background: grey;z-index: 99999;/*opacity: 0.8;*/">
	<div class="agreement-text" style="display:inline-block;float:left;margin: 20px;margin-right: 150px; color: #fff;">
		Продолжая пользование настоящим сайтом Вы выражаете своё <a href="http://www.reso.ru/regulations/personal-agreement.html">согласие</a> на обработку Ваших персональных данных.
		Порядок обработки Ваших персональных данных, а также реализуемые требования к их защите, содержатся в <a href="http://www.reso.ru/regulations/safety-of-personal.html">Политике</a> СПАО "РЕСО-Гарантия".
	</div>
	<a id="agrmntCloseBtn" class="input__button" style="position:absolute;margin: 10px 20px;right:0px;top:8px;"><b>Закрыть</b></a>
</div>

<script>
    var hasResoJ = false;

    try {
        resoJquery("agreement");
        hasResoJ = true;
    } catch(error) {}

    if (hasResoJ) {
        resoJquery(document).ready(function(){
            if (resoJquery.cookie('agreement-info') != 'read') {
                resoJquery("#agreement").show();
            }
            resoJquery("#agrmntCloseBtn").click(function(){
                resoJquery.cookie('agreement-info', 'read', {expires: 365});
                resoJquery("#agreement").hide();
            });
        });
    } else {
        $(document).ready(function(){
            if ($.cookie('agreement-info') != 'read') {
                $("#agreement").show();
            }
            $("#agrmntCloseBtn").click(function(){
                $.cookie('agreement-info', 'read', {expires: 365});
                $("#agreement").hide();
            });
        });
    }
</script>










<div class="main">










	<header>

		<div class="topline">
			<div class="wrap clearfix">



























				<ul class="topline-nav clearfix">

					<li>

						<a href="https://www.reso.ru/Aux/siteMap.html">Карта сайта</a>
					</li>

					<li>

						<a href="https://secure.reso.ru/sites_https/reso/Feedback/index.html">Служба качества</a>
					</li>

					<li>

						<a href="https://secure.reso.ru/sites_https/reso/Feedback/index.html">Обратная связь</a>
					</li>

				</ul><!-- topline-nav -->














				<div class="tl-select"><a class="tl-select-link no-select" href="https://www.reso.ru/Branches/"><span>Ближайший офис</span></a></div>





			</div><!-- wrap -->

		</div><!-- topline -->

		<div class="wrap clearfix">

			<div class="h-content clearfix">











				<div class="h-phone">
					<span class="h-phone-1">8-800-234-18-02</span>
					+7 (495) 730-30-00
				</div><!-- h-phone -->














				<div class="h-search">



					<script type="text/javascript">
              function validateSearch() {
                  var x = document.getElementById("query").value;
                  if (x == null || x == "" || x == "Поиск по сайту") {
                      alert("Не задана строка поиска");
                      return false;
                  }
              }
					</script>


					<form name="search" method="post" onsubmit="return validateSearch()" action="https://www.reso.ru/Aux/result.html">
						<input class="input-text" type="text" name="query" id="query" value="Поиск по сайту" onblur="if(this.value==&#39;&#39;){this.value=&#39;Поиск по сайту&#39;;}" onfocus="if(this.value==&#39;Поиск по сайту&#39;){this.value=&#39;&#39;;}">
						<input class="input-button" type="submit" src="/export/system/modules/ru.reso/resources/images/oson/search-button.png" title="Найти">
						<input type="hidden" name="index" value="RESOSiteIndex">
						<input type="hidden" name="field" value="title">
						<input type="hidden" name="field" value="title-parent">
						<input type="hidden" name="field" value="content">
						<input type="hidden" name="matchesperpage" value="5">
						<input type="hidden" name="displaypages" value="7">
					</form>

				</div><!-- h-search -->












				<div class="h-callback clearfix">


					<a class="h-callback-link" href="https://www.reso.ru/Aux/invokeAgent.html">
						<span>Вызвать агента</span>
					</a>

				</div>
				<div class="h-callback clearfix h-email">
					<a class="h-email-link" href="mailto:mail@reso.ru">
						<span>mail@reso.ru</span>
					</a>
				</div>
				<!-- h-callback -->

			</div><!-- h-content -->










			<div class="logo">
				<a href="https://www.reso.ru/"></a>
			</div>













			<div class="logo-note">
				<div class="logo-note-line-1">
					Страхование
				</div>
				<div class="logo-note-line-2">
					на все случаи жизни
				</div>
			</div><!-- logo-note -->



		</div><!-- wrap -->

	</header>












	<section class="content-columns">

		<div class="main-menu">
			<div class="wrap clearfix">





















				<div class="top-nav-bottom-border">


					<div class="top-nav top-nav-inside clearfix">



						<ul class="top-subnav clearfix">

							<li>

								<a href="https://www.reso.ru/About/">
									<span>О компании</span>
								</a></li>

							<li>

								<a href="https://www.reso.ru/RESOGroup/">
									<span>Группа РЕСО</span>
								</a></li>

							<li>

								<a href="https://www.reso.ru/Shareholders/">
									<span>Акционерам</span>
								</a></li>

						</ul>

						<ul class="globaltab-slide-nav clearfix">


							<li data-id="1">


								<a href="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/#"><span>ЧАСТНЫМ ЛИЦАМ</span></a>
								<ul>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/AGO/OSAGO/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm1.png&#39;);">
													ОСАГО
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Online/" class="" style="">
														Онлайн-покупка полиса
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/AGO/OSAGO/europrotocol.html" class="" style="">
														Оформление ДТП без ГИБДД
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/AGO/OSAGO/direct.html" class="" style="">
														За выплатой – в свою компанию
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор ОСАГО
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/AGO/OSAGO/TO/signup.html" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-time.png&#39;);">
														Запись на ТО без очереди
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Motor/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm2.png&#39;);">
													КАСКО
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Motor/index.html#product-damage" class="" style="">
														Ущерб
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Motor/index.html#product-theft" class="" style="">
														Хищение
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Motor/index.html#product-technical-assistance" class="" style="">
														Техпомощь на дороге
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Motor/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор каско
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/House/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm3.png&#39;);">
													ДОМ
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/House/RESO-Dom/" class="" style="">
														Оптимальный вариант
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/House/Polis_bez_osmotra/index.html" class="" style="">
														Полис без осмотра
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Flat/liability.html" class="" style="">
														Ответственность перед соседями
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/House/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор дач и домов
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Travel/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm4.png&#39;);">
													ТУРИЗМ
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Travel/Medical/" class="" style="">
														Поездка за рубеж
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Travel/CIS/" class="" style="">
														Поездка по России
													</a>
												</span>








										<span>

													<a href="https://travel.reso.ru/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/button-online.png&#39;);">
														Купить полис онлайн
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Travel/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор путешественника
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Med/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm5.png&#39;);">
													МЕДИЦИНА (ДМС)
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Med/Medswiss/" class="" style="">
														Полис для Москвы:<br>Medswiss с франшизой
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Med/DrRESO/" class="" style="">
														ДМС для взрослых
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Med/ABL/" class="" style="">
														ДМС для малышей до года
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Med/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор ДМС
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Med/LaborDMS/check.html" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/icos/search_button_grey.png&#39;);">
														Проверка полиса "ДМС.Трудовой"
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Accident/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm6.png&#39;);">
													НЕСЧАСТНЫЙ СЛУЧАЙ
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Accident/NS/" class="" style="">
														Полис для взрослых
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Accident/Children/" class="" style="">
														Полис для детей до 18 лет
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Accident/Podorozhnik/index.html" class="" style="">
														Полис для водителей
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Accident/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор личная защита
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Flat/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm7.png&#39;);">
													КВАРТИРА
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Flat/D/" class="" style="">
														Оптимальный вариант
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Flat/Premium/" class="" style="">
														«Коробочные» полисы
													</a>
												</span>




										<span>

													<a href="https://www.reso.ru/Retail/Flat/liability.html" class="" style="">
														Ответственность перед соседями
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Flat/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор квартир и таунхаусов
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/Ipoteka/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm8.png&#39;);">
													ИПОТЕКА
												</a>
											</span>









										<span>

													<a href="https://www.reso.ru/Retail/Ipoteka/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор ипотеки
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Retail/AGO/Greencard/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm9.png&#39;);">
													ЗЕЛЕНАЯ КАРТА
												</a>
											</span>









										<span>

													<a href="https://www.reso.ru/Retail/AGO/GreenCardCalc/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор зеленая карта
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="http://www.reso-life.ru/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm10.png&#39;);">
													ЖИЗНЬ
												</a>
											</span>





										<span>

													<a href="https://www.reso.ru/Retail/Life/" class="" style="">
														Страхование жизни
													</a>
												</span>








										<span>

													<a href="https://www.reso.ru/Retail/Life/Calculator/" class="grey" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm-calc.png&#39;);">
														Калькулятор жизни
													</a>
												</span>

									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/RESOGroup/RESOMed/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/zmeya.png&#39;);">
													ОМС
												</a>
											</span>





										<span>

													<a href="http://msk.reso-med.com/police_omc/where_get_policy_omc" class="" style="">
														Пункты выдачи полисов «РЕСО-Мед»
													</a>
												</span>

									</li>

								</ul>

							</li>


							<li data-id="2">


								<a href="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/#"><span>КОРПОРАТИВНЫМ КЛИЕНТАМ</span></a>
								<ul>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Transport/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm1.png&#39;);">
													АВТОТРАНСПОРТ
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Property/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm11.png&#39;);">
													ИМУЩЕСТВО
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Med/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm5.png&#39;);">
													МЕДИЦИНА (ДМС)
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Accident/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm6.png&#39;);">
													НЕСЧАСТНЫЙ СЛУЧАЙ
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/RESOGroup/RESOMed/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/zmeya.png&#39;);">
													ОМС
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Liability/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm13.png&#39;);">
													ОТВЕТСТВЕННОСТЬ
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Cargo/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm12.png&#39;);">
													ГРУЗОПЕРЕВОЗКИ
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Ferryman/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/bus.png&#39;);">
													ОСОП (перевозчики)
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/Building/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm15.png&#39;);">
													СТРОИТЕЛЬСТВО
												</a>
											</span>


									</li>

									<li>
                                    		<span>


												<a href="https://www.reso.ru/Corporate/DW/" class="title" style="background-image: url(&#39;/export/system/modules/ru.reso/resources/images/oson/ihm16.png&#39;);">
													ОПАСНЫЕ ОБЪЕКТЫ
												</a>
											</span>


									</li>

								</ul>

							</li>


						</ul>


					</div><!-- top-nav -->

				</div>
			</div>
		</div>


		<div class="wrap clearfix">


















			<div class="breadcrumbs">

				<a href="https://www.reso.ru/">Главная</a>







				→





				<a href="https://www.reso.ru/Retail/">Частным лицам</a>









				→





				<a href="https://www.reso.ru/Retail/AGO/">ОСАГО</a>









				→





				<a href="https://www.reso.ru/Retail/AGO/OSAGO/">ОСАГО в РЕСО-Гарантия</a>











				→

				Калькулятор ОСАГО












			</div> <!-- breadcrumb-->



		</div>


		<div class="wrap clearfix">
			<section class="content">
				<div class="content-inside clearfix">

					<div id="reso-page">












						<div>
							<div class="clearfix">
								<div class="content-text">

			<div class="text clearfix">




					<h1>Калькулятор ОСАГО</h1>


				<div>
					<div class="calc" id="1"></div>
					<%--<div>--%>

<%--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/osago_reso/osago.js"></script>--%>
	<%--<div class="action__form-osago">--%>
			<%--<div class="frmtr-action">--%>
				<%--<form action="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/" method="post" name="osago">--%>

					<%--<div class="calculator-table-hold">--%>
						<%--<table class="calculator-table">--%>
							<%--<colgroup>--%>
								<%--<col class="col_one">--%>
								<%--<col class="col_two">--%>
							<%--</colgroup>--%>
        					<%--<tbody>--%>




















<%--<tr>--%>
	<%--<td class="col-1">Страхователь</td>--%>
	<%--<td class="col-2">--%>
	    <%--<input type="hidden" name="timeZone">--%>

		<%--<input name="face" id="face-1" checked="" value="0" type="radio" class="input__radio">--%>
		<%--<label for="face-1" style="width: 209px;float:left;position:relative;">Физическое лицо</label>--%>
		<%--<input name="face" id="face-2" value="1" type="radio" class="input__radio">--%>
		<%--<label for="face-2">Юридическое лицо</label>--%>
		<%--<div class="clear"></div>--%>
		<%--<div for="face" class="field__error"></div>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr class="even">--%>
	<%--<td class="col-1">Место жительства собственника</td>--%>
	<%--<td class="col-2">--%>
		<%--<div>--%>
			<%--<input name="territoryId" style="width: 471px;" type="hidden" class="auto-clear input__text" value="1"><input class="auto-clear input__text ui-autocomplete-input" type="text" style="width: 471px;" autocomplete="off">--%>
		<%--</div>--%>
		<%--<div>--%>
			<%--<a id="show-territory-button" onclick="showTerrritoryPanel()" style="/*margin-left:20px;*/">Выбрать из списка</a>--%>
		<%--</div>--%>
		<%--<div class="clear"></div>--%>
		<%--<div for="territoryId" class="field__error"></div>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr class="even">--%>
	<%--<td colspan="2" style="padding-top: 0px;padding-right: 15px;">--%>
		<%--<div class="adv-options clearfix" id="territory-panel" style="display: none;">--%>
			<%--<div class="adv-options-corner-full"></div>--%>
			<%--<div id="territory-list"><ul class="territory-list"><div class="territory-block territory-block-main"><div class="territory-block-letter">&nbsp;</div><li><a>Москва</a></li><li><a>Московская область</a></li><li><a>Санкт-Петербург</a></li><li><a>Ленинградская область</a></li></div><div class="territory-block"><div class="territory-letter">А</div><li><a class="cities-gruop-link"><span>Алтайский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="22" class="cities-panel"><li><a>Барнаул</a></li><li><a>Бийск</a></li><li><a>Заринск</a></li><li><a>Новоалтайск</a></li><li><a>Рубцовск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Амурская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="28" class="cities-panel"><li><a>Белогорск</a></li><li><a>Благовещенск Амурской обл</a></li><li><a>Свободный</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Архангельская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="29" class="cities-panel"><li><a>Архангельск</a></li><li><a>Котлас</a></li><li><a>Северодвинск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Астраханская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="30" class="cities-panel"><li><a>Астрахань</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Б</div><li><a class="cities-gruop-link"><span>Белгородская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="31" class="cities-panel"><li><a>Белгород</a></li><li><a>Губкин</a></li><li><a>Старый Оскол</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Брянская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="32" class="cities-panel"><li><a>Брянск</a></li><li><a>Клинцы</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">В</div><li><a class="cities-gruop-link"><span>Владимирская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="33" class="cities-panel"><li><a>Владимир</a></li><li><a>Гусь-Хрустальный</a></li><li><a>Муром</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Волгоградская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="34" class="cities-panel"><li><a>Волгоград</a></li><li><a>Волжский</a></li><li><a>Камышин</a></li><li><a>Михайловка</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Вологодская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="35" class="cities-panel"><li><a>Вологда</a></li><li><a>Череповец</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Воронежская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="36" class="cities-panel"><li><a>Борисоглебск</a></li><li><a>Воронеж</a></li><li><a>Лиски</a></li><li><a>Россошь</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Е</div><li><a class="cities-gruop-link"><span>Еврейская автономная<br>область</span><span class="img-arrow"></span></a></li><div cities-panel-id="79" class="cities-panel"><li><a>Биробиджан</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">З</div><li><a class="cities-gruop-link"><span>Забайкальский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="75" class="cities-panel"><li><a>Краснокаменск</a></li><li><a>Чита</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">И</div><li><a class="cities-gruop-link"><span>Ивановская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="37" class="cities-panel"><li><a>Иваново</a></li><li><a>Кинешма</a></li><li><a>Шуя</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Иркутская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="38" class="cities-panel"><li><a>Ангарск</a></li><li><a>Братск</a></li><li><a>Иркутск</a></li><li><a>Тулун</a></li><li><a>Усолье-Сибирское</a></li><li><a>Усть-Илимск</a></li><li><a>Усть-Кут</a></li><li><a>Черемхово</a></li><li><a>Шелехов</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">К</div><li><a class="cities-gruop-link"><span>Кабардино-Балкарская<br>Республика</span><span class="img-arrow"></span></a></li><div cities-panel-id="7" class="cities-panel"><li><a>Нальчик</a></li><li><a>Прохладный</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Калининградская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="39" class="cities-panel"><li><a>Калининград</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Калужская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="40" class="cities-panel"><li><a>Калуга</a></li><li><a>Обнинск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Камчатский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="41" class="cities-panel"><li><a>Петропавловск-Камчатский</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Карачаево-Черкесская<br>Республика</span><span class="img-arrow"></span></a></li><div cities-panel-id="9" class="cities-panel"><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Кемеровская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="42" class="cities-panel"><li><a>Анжеро-Судженск</a></li><li><a>Белово</a></li><li><a>Кемерово</a></li><li><a>Киселёвск</a></li><li><a>Междуреченск</a></li><li><a>Новокузнецк</a></li><li><a>Осинники</a></li><li><a>Прокопьевск</a></li><li><a>Юрга</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Кировская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="43" class="cities-panel"><li><a>Киров Кировской обл</a></li><li><a>Кирово-Чепецк</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Костромская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="44" class="cities-panel"><li><a>Кострома</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Краснодарский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="23" class="cities-panel"><li><a>Анапа</a></li><li><a>Армавир</a></li><li><a>Белореченск</a></li><li><a>Геленджик</a></li><li><a>Ейск</a></li><li><a>Краснодар</a></li><li><a>Кропоткин</a></li><li><a>Крымск</a></li><li><a>Курганинск</a></li><li><a>Лабинск</a></li><li><a>Новороссийск</a></li><li><a>Славянск-на-Кубани</a></li><li><a>Сочи</a></li><li><a>Тимашёвск</a></li><li><a>Тихорецк</a></li><li><a>Туапсе</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Красноярский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="24" class="cities-panel"><li><a>Ачинск</a></li><li><a>Железногорск Красноярский край</a></li><li><a>Зеленогорск</a></li><li><a>Канск</a></li><li><a>Красноярск</a></li><li><a>Лесосибирск</a></li><li><a>Минусинск</a></li><li><a>Назарово</a></li><li><a>Норильск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Курганская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="45" class="cities-panel"><li><a>Курган</a></li><li><a>Шадринск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Курская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="46" class="cities-panel"><li><a>Железногорск Курской обл</a></li><li><a>Курск</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Л</div><li><a class="cities-gruop-link"><span>Липецкая область</span><span class="img-arrow"></span></a></li><div cities-panel-id="48" class="cities-panel"><li><a>Елец</a></li><li><a>Липецк</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">М</div><li><a class="cities-gruop-link"><span>Магаданская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="49" class="cities-panel"><li><a>Магадан</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Мурманская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="51" class="cities-panel"><li><a>Апатиты</a></li><li><a>Мончегорск</a></li><li><a>Мурманск</a></li><li><a>Североморск</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Н</div><li><a class="cities-gruop-link"><span>Ненецкий автономный<br>округ</span><span class="img-arrow"></span></a></li><div cities-panel-id="83" class="cities-panel"><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Нижегородская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="52" class="cities-panel"><li><a>Арзамас</a></li><li><a>Балахна</a></li><li><a>Бор</a></li><li><a>Выкса</a></li><li><a>Дзержинск</a></li><li><a>Кстово</a></li><li><a>Нижний Новгород</a></li><li><a>Саров</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Новгородская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="53" class="cities-panel"><li><a>Боровичи</a></li><li><a>Великий Новгород</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Новосибирская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="54" class="cities-panel"><li><a>Бердск</a></li><li><a>Искитим</a></li><li><a>Куйбышев</a></li><li><a>Новосибирск</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">О</div><li><a class="cities-gruop-link"><span>Омская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="55" class="cities-panel"><li><a>Омск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Оренбургская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="56" class="cities-panel"><li><a>Бугуруслан</a></li><li><a>Бузулук</a></li><li><a>Новотроицк</a></li><li><a>Оренбург</a></li><li><a>Орск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Орловская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="57" class="cities-panel"><li><a>Ливны</a></li><li><a>Мценск</a></li><li><a>Орёл</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">П</div><li><a class="cities-gruop-link"><span>Пензенская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="58" class="cities-panel"><li><a>Заречный Пензенской обл.</a></li><li><a>Кузнецк</a></li><li><a>Пенза</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Пермский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="59" class="cities-panel"><li><a>Березники</a></li><li><a>Краснокамск</a></li><li><a>Лысьва</a></li><li><a>Пермь</a></li><li><a>Соликамск</a></li><li><a>Чайковский</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Приморский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="25" class="cities-panel"><li><a>Арсеньев</a></li><li><a>Артём</a></li><li><a>Владивосток</a></li><li><a>Находка</a></li><li><a>Спасск-Дальний</a></li><li><a>Уссурийск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Псковская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="60" class="cities-panel"><li><a>Великие Луки</a></li><li><a>Псков</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Р</div><li><a class="cities-gruop-link"><span>Республика Адыгея</span><span class="img-arrow"></span></a></li><div cities-panel-id="1" class="cities-panel"><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Алтай</span><span class="img-arrow"></span></a></li><div cities-panel-id="4" class="cities-panel"><li><a>Горно-Алтайск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Башкортостан</span><span class="img-arrow"></span></a></li><div cities-panel-id="2" class="cities-panel"><li><a>Благовещенск Башкортостан</a></li><li><a>Ишимбай</a></li><li><a>Кумертау</a></li><li><a>Октябрьский Башкортостан</a></li><li><a>Салават</a></li><li><a>Стерлитамак</a></li><li><a>Туймазы</a></li><li><a>Уфа</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Бурятия</span><span class="img-arrow"></span></a></li><div cities-panel-id="3" class="cities-panel"><li><a>Улан-Удэ</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Дагестан</span><span class="img-arrow"></span></a></li><div cities-panel-id="5" class="cities-panel"><li><a>Буйнакск</a></li><li><a>Дербент</a></li><li><a>Каспийск</a></li><li><a>Махачкала</a></li><li><a>Хасавюрт</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Ингушетия</span><span class="img-arrow"></span></a></li><div cities-panel-id="6" class="cities-panel"><li><a>Малгобек</a></li><li><a>Назрань</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Калмыкия</span><span class="img-arrow"></span></a></li><div cities-panel-id="8" class="cities-panel"><li><a>Элиста</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Карелия</span><span class="img-arrow"></span></a></li><div cities-panel-id="10" class="cities-panel"><li><a>Петрозаводск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Коми</span><span class="img-arrow"></span></a></li><div cities-panel-id="11" class="cities-panel"><li><a>Сыктывкар</a></li><li><a>Ухта</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Крым</span><span class="img-arrow"></span></a></li><div cities-panel-id="91" class="cities-panel"><li><a>Симферополь</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Марий Эл</span><span class="img-arrow"></span></a></li><div cities-panel-id="12" class="cities-panel"><li><a>Волжск</a></li><li><a>Йошкар-Ола</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Мордовия</span><span class="img-arrow"></span></a></li><div cities-panel-id="13" class="cities-panel"><li><a>Рузаевка</a></li><li><a>Саранск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Саха (Якутия)</span><span class="img-arrow"></span></a></li><div cities-panel-id="14" class="cities-panel"><li><a>Нерюнгри</a></li><li><a>Якутск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Северная<br>Осетия</span><span class="img-arrow"></span></a></li><div cities-panel-id="15" class="cities-panel"><li><a>Владикавказ</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Татарстан</span><span class="img-arrow"></span></a></li><div cities-panel-id="16" class="cities-panel"><li><a>Альметьевск</a></li><li><a>Бугульма</a></li><li><a>Елабуга</a></li><li><a>Зеленодольск</a></li><li><a>Казань</a></li><li><a>Лениногорск</a></li><li><a>Набережные Челны</a></li><li><a>Нижнекамск</a></li><li><a>Чистополь</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Тыва (Тува)</span><span class="img-arrow"></span></a></li><div cities-panel-id="17" class="cities-panel"><li><a>Кызыл</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Республика Хакасия</span><span class="img-arrow"></span></a></li><div cities-panel-id="19" class="cities-panel"><li><a>Абакан</a></li><li><a>Саяногорск</a></li><li><a>Черногорск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Ростовская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="61" class="cities-panel"><li><a>Азов</a></li><li><a>Батайск</a></li><li><a>Волгодонск</a></li><li><a>Гуково</a></li><li><a>Каменск-Шахтинский</a></li><li><a>Новочеркасск</a></li><li><a>Новошахтинск</a></li><li><a>Ростов-на-Дону</a></li><li><a>Сальск</a></li><li><a>Таганрог</a></li><li><a>Шахты</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Рязанская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="62" class="cities-panel"><li><a>Рязань</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">С</div><li><a class="cities-gruop-link"><span>Самарская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="63" class="cities-panel"><li><a>Новокуйбышевск</a></li><li><a>Самара</a></li><li><a>Сызрань</a></li><li><a>Тольятти</a></li><li><a>Чапаевск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Саратовская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="64" class="cities-panel"><li><a>Балаково</a></li><li><a>Балашов</a></li><li><a>Вольск</a></li><li><a>Саратов</a></li><li><a>Энгельс</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Сахалинская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="65" class="cities-panel"><li><a>Южно-Сахалинск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Свердловская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="66" class="cities-panel"><li><a>Асбест</a></li><li><a>Березовский</a></li><li><a>Верхняя Пышма</a></li><li><a>Верхняя Салда</a></li><li><a>Екатеринбург</a></li><li><a>Новоуральск</a></li><li><a>Первоуральск</a></li><li><a>Полевской</a></li><li><a>Ревда Свердловской обл</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>г. Севастополь</span><span class="img-arrow"></span></a></li><div cities-panel-id="92" class="cities-panel"><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Смоленская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="67" class="cities-panel"><li><a>Вязьма</a></li><li><a>Рославль</a></li><li><a>Сафоново</a></li><li><a>Смоленск</a></li><li><a>Ярцево</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Ставропольский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="26" class="cities-panel"><li><a>Будённовск</a></li><li><a>Георгиевск</a></li><li><a>Ессентуки</a></li><li><a>Кисловодск</a></li><li><a>Минеральные Воды</a></li><li><a>Михайловск Ставропольского края</a></li><li><a>Невинномысск</a></li><li><a>Пятигорск</a></li><li><a>Ставрополь</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">Т</div><li><a class="cities-gruop-link"><span>Тамбовская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="68" class="cities-panel"><li><a>Мичуринск</a></li><li><a>Тамбов</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Тверская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="69" class="cities-panel"><li><a>Вышний Волочёк</a></li><li><a>Кимры</a></li><li><a>Ржев</a></li><li><a>Тверь</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Томская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="70" class="cities-panel"><li><a>Северск</a></li><li><a>Томск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Тульская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="71" class="cities-panel"><li><a>Алексин</a></li><li><a>Ефремов</a></li><li><a>Новомосковск</a></li><li><a>Тула</a></li><li><a>Узловая</a></li><li><a>Щёкино</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Тюменская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="72" class="cities-panel"><li><a>Тобольск</a></li><li><a>Тюмень</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">У</div><li><a class="cities-gruop-link"><span>Удмуртская Республика</span><span class="img-arrow"></span></a></li><div cities-panel-id="18" class="cities-panel"><li><a>Воткинск</a></li><li><a>Глазов</a></li><li><a>Ижевск</a></li><li><a>Сарапул</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Ульяновская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="73" class="cities-panel"><li><a>Димитровград</a></li><li><a>Ульяновск</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Х</div><li><a class="cities-gruop-link"><span>Хабаровский край</span><span class="img-arrow"></span></a></li><div cities-panel-id="27" class="cities-panel"><li><a>Амурск</a></li><li><a>Комсомольск-на-Амуре</a></li><li><a>Хабаровск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Ханты-Мансийский<br>автономный округ</span><span class="img-arrow"></span></a></li><div cities-panel-id="86" class="cities-panel"><li><a>Когалым</a></li><li><a>Нефтеюганск</a></li><li><a>Нижневартовск</a></li><li><a>Нягань</a></li><li><a>Сургут</a></li><li><a>Ханты-Мансийск</a></li><li><a>другие населенные пункты</a></li></div></div><div class="territory-block-delimeter"></div><div class="territory-block"><div class="territory-letter">Ч</div><li><a class="cities-gruop-link"><span>Челябинская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="74" class="cities-panel"><li><a>Златоуст</a></li><li><a>Копейск</a></li><li><a>Магнитогорск</a></li><li><a>Миасс</a></li><li><a>Сатка</a></li><li><a>Чебаркуль</a></li><li><a>Челябинск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Чеченская Республика</span><span class="img-arrow"></span></a></li><div cities-panel-id="20" class="cities-panel"><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Чувашская Республика</span><span class="img-arrow"></span></a></li><div cities-panel-id="21" class="cities-panel"><li><a>Канаш</a></li><li><a>Новочебоксарск</a></li><li><a>Чебоксары</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Чукотский автономный<br>округ</span><span class="img-arrow"></span></a></li><div cities-panel-id="87" class="cities-panel"><li><a>другие населенные пункты</a></li></div></div><div class="territory-block"><div class="territory-letter">Я</div><li><a class="cities-gruop-link"><span>Ямало-Ненецкий<br>автономный округ</span><span class="img-arrow"></span></a></li><div cities-panel-id="89" class="cities-panel"><li><a>Новый Уренгой</a></li><li><a>Ноябрьск</a></li><li><a>другие населенные пункты</a></li></div><li><a class="cities-gruop-link"><span>Ярославская область</span><span class="img-arrow"></span></a></li><div cities-panel-id="76" class="cities-panel"><li><a>Ярославль</a></li><li><a>другие населенные пункты</a></li></div></div></ul></div>--%>
		<%--</div>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr>--%>
	<%--<td class="col-1">Категория автомобилей</td>--%>
	<%--<td class="col-2">--%>
		<%--<span style="float:left; width:100%; position:relative;">--%>
			<%--<select name="category" id="category" tabindex="-1" class="selectized" style="display: none;"><option value="1" selected="selected">Легковые автомобили</option></select><div class="selectize-control single"><div class="selectize-input items full has-options has-items"><div data-value="1" class="item">Легковые автомобили</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
		<%--</span>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr class="even">--%>
	<%--<td class="col-1">Информация об авто</td>--%>
	<%--<td class="col-2">--%>
		<%--<label class="float-label">Мощность</label>--%>
		<%--<span style="float:left; width:250px; position:relative;">--%>
			<%--<select name="power" id="power" class="simple-selectize selectized" tabindex="-1" style="display: none;"><option value="2" selected="selected">свыше 70 до 100 включительно</option></select><div class="selectize-control simple-selectize single"><div class="selectize-input items full has-options has-items"><div data-value="2" class="item">свыше 70 до 100 включительно</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single simple-selectize" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
		<%--</span>--%>
        <%--<span style="width:80px;padding-top:5px;float:left;">--%>


			<%--<input type="checkbox" name="carUsedTrailer" id="carUsedTrailer" class="input__checkbox">--%>
			<%--<label for="carUsedTrailer" class="float-right">Прицеп</label>--%>
		<%--</span>--%>
		<%--<div class="clear"></div>--%>
		<%--<span style="float:left; width:240px; position:relative;">--%>
			<%--<div for="power" class="field__error"></div>--%>
		<%--</span>--%>
        <%--<span style="float:right; width:95px; position:relative;padding-top:2px">--%>
			<%--<div for="carUsedTrailer" class="field__error"></div>--%>
		<%--</span>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr>--%>
	<%--<td class="col-1">Период использования</td>--%>
	<%--<td class="col-2">--%>
		<%--<span style="float:left; width:190px; position:relative;">--%>
			<%--<select name="period" id="period" class="simple-selectize selectized" tabindex="-1" style="display: none;"><option value="7" selected="selected">10 месяцев и более</option></select><div class="selectize-control simple-selectize single"><div class="selectize-input items full has-options has-items"><div data-value="7" class="item">10 месяцев и более</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single simple-selectize" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
		<%--</span>--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr class="even">--%>
	<%--<td class="col-1">Лица, допущенные к управлению</td>--%>
	<%--<td class="col-2">--%>
		<%--<span style="float:left; width:209px; position:relative;">--%>
			<%--<input name="driverList" id="driverList-1" style="width: 160px" value="0" type="radio" class="input__radio">--%>
			<%--<label for="driverList-1">Без ограничений</label>--%>
			<%--<span data-placement="bottom" class="tooltip-show" title="" data-original-title="Договор обязательного страхования автогражданской ответственности без ограничения количества лиц, допущенных к управлению."></span>--%>
		<%--</span>--%>

		<%--<input name="driverList" id="driverList-0" checked="" style="width: 200px" value="1" type="radio" class="input__radio">--%>
		<%--<label for="driverList-0">Ограничений список</label>--%>
		<%--<a class="js-driver-add"></a>--%>
		<%--<div class="clear"></div>--%>
		<%--<div for="driverList" class="field__error"></div>--%>
		<%--<input name="driverCount" id="driverCount" style="display:none" value="1" class="null">--%>
	<%--</td>--%>
<%--</tr>--%>

<%--<tr class="kbm-general" style="display: none;">--%>
	<%--<td>--%>
		<%--<span>Класс бонуса-малуса</span>--%>
		<%--<span data-placement="bottom" class="tooltip-show" title="" data-original-title="Определяется по собственнику автомобиля"></span>--%>
	<%--</td>--%>
	<%--<td>--%>
		<%--<span class="kbm-selectize" style="float:left;width:60px;">--%>
			<%--<select name="kbm" style="width: 50px; display: none;" class="simple-selectize selectized" tabindex="-1"><option value="3" selected="selected">3</option></select><div class="selectize-control simple-selectize single" style="width: 50px;"><div class="selectize-input items full has-options has-items"><div data-value="3" class="item">3</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single simple-selectize" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
		<%--</span>--%>
		<%--<div class="clear"></div>--%>
		<%--<div for="kbm" class="field__error"></div>--%>
	<%--</td>--%>
<%--</tr>--%>





	<%--<tr class="js-driver-main osago-driver" id="driver0">--%>
		<%--<td class="col-1" style="font-weight: normal;">--%>
			<%--<span>--%>
				<%--Возраст--%>
			<%--</span>--%>
			<%--<span title="" data-toggle="tooltip" data-placement="bottom" class="driver-tooltip-show tooltip-show" data-original-title="Количество полных лет"></span>--%>
			<%--<div style="margin-right:25px;">--%>
				<%--<input name="age0" id="age0" style="width: 45px; text-align: right;" value="22" type="text" class="auto-clear input__text" data-prev-value="">--%>
			<%--</div>--%>
			<%--<div class="clear"></div>--%>
			<%--<div for="age0" class="field__error"></div>--%>
		<%--</td>--%>
		<%--<td>--%>
			<%--<div>--%>
				<%--<span>--%>
					<%--Cтаж водителя--%>
				<%--</span>--%>
				<%--<span title="" data-toggle="tooltip" data-placement="bottom" class="driver-tooltip-show tooltip-show" data-original-title="Стаж водителя"></span>--%>
				<%--<div style="margin-right:30px;">--%>
					<%--<input name="stage0" id="stage0" style="width: 45px; text-align: right;" value="2" type="text" class="auto-clear input__text" data-prev-value="">--%>
				<%--</div>--%>
				<%--<div class="clear"></div>--%>
				<%--<div for="stage0" class="field__error"></div>--%>
			<%--</div>--%>

			<%--<div>--%>
				<%--<span>--%>
					<%--Класс бонуса-малуса--%>
				<%--</span>--%>
				<%--<span data-placement="bottom" class="driver-tooltip-show tooltip-show" title="" data-original-title="Определяется исходя из количества аварий, виновником которых были Вы, в период действия годового договора ОСАГО."></span>--%>
				<%--<span class="kbm-selectize">--%>
					<%--<select name="kbm0" style="width: 50px; display: none;" class="simple-selectize selectized" tabindex="-1"><option value="3" selected="selected">3</option></select><div class="selectize-control simple-selectize single" style="width: 50px;"><div class="selectize-input items full has-options has-items"><div data-value="3" class="item">3</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single simple-selectize" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
				<%--</span>--%>
				<%--<div class="clear"></div>--%>
				<%--<div for="kbm0" class="field__error"></div>--%>
			<%--</div>--%>

			<%--<div style="float:right;"><a class="js-driver-del js-driver-del-0" style="display: none;"></a></div>--%>
		<%--</td>--%>
	<%--</tr>--%>



<%--<tr class="js-driver-label" style="display: none;"></tr>--%>

<%--<tr class="even" style="display:none;">--%>
	<%--<td class="col-1">Страховая сумма ДГО</td>--%>
	<%--<td class="col-2">--%>
		<%--<span style="float:left; width:209px; position:relative;">--%>
			<%--<select name="iSumLiability" id="iSumLiability" style="width: 190px; display: none;" class="simple-selectize selectized" tabindex="-1"><option value="300000" selected="selected">300 000</option></select><div class="selectize-control simple-selectize single" style="width: 190px;"><div class="selectize-input items full has-options has-items"><div data-value="300000" class="item">300 000</div><input type="text" autocomplete="off" tabindex="" style="width: 4px;"></div><div class="selectize-dropdown single simple-selectize" style="display: none;"><div class="selectize-dropdown-content"></div></div></div>--%>
		<%--</span>--%>
		<%--<span>--%>
			<%--Год выпуска ТС--%>


			<%--<input name="yearOfManufacture" id="yearOfManufacture" style="width: 60px; text-align: right;" value="2019" type="text" class="auto-clear input__text">--%>
		<%--</span>--%>

	<%--</td>--%>
<%--</tr>--%>


<%--<tr>--%>
									<%--<td></td>--%>
									<%--<td>--%>
										<%--<div>--%>
											<%--<script src="${pageContext.request.contextPath}/resources/osago_reso/api.js"></script><div class="g-recaptcha" data-sitekey="6LfGyzUUAAAAAMvIApXdKm-0INy2J_fk10xXuD2j"><div style="width: 304px; height: 78px;"><div><iframe src="${pageContext.request.contextPath}/resources/osago_reso/anchor.html" width="304" height="78" role="presentation" name="a-390ixuqjrsp0" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div></div></div>--%>

										<%--<div class="clear"></div>--%>
										<%--<div style="margin-left: 10px;">--%>
											<%--<div for="codeImage" class="field__error"></div></div>--%>
									<%--</td>--%>
								<%--</tr>--%>

								<%--<tr>--%>
										<%--<td class="col-1"></td>--%>
										<%--<td class="col-2">--%>
											<%--<input class="input__button" value="Рассчитать" type="submit" onclick="return checkosago( this );">--%>
										<%--</td>--%>
									<%--</tr>--%>
								<%--</tbody>--%>
						<%--</table>--%>
					<%--</div>--%>

					<%--<input type="hidden" name="action" value="calculate">--%>

				<%--</form>--%>
			<%--</div>--%>

			<%--</div>--%>

	<%--</div>--%>

</div>

				<div class="date-lastmodified-push" style="display: block;"></div>

			</div>
		</div>


									<div class="sidebar clearfix">

										<div>












											<nav class="sidebar-buttons">
												<ul>



													<li class="active">
														<a href="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/">
															<span class="sb-ico-3" style="background: url(/export/system/modules/ru.reso/resources/images/oson/i2.png) no-repeat 50% 50%;"></span>
															<span class="overflow-hidden">Рассчитать стоимость ОСАГО</span>
														</a>

														<span class="sb-corner"></span>

													</li>



													<li class="">
														<a href="https://www.reso.ru/Retail/AGO/OSAGO/TO/signup.html">
															<span class="sb-ico-3" style="background: url(/export/system/modules/ru.reso/resources/images/oson/ihm-time.png) no-repeat 50% 50%;"></span>
															<span class="overflow-hidden">Записаться на ТО</span>
														</a>

													</li>

												</ul>
											</nav>




















											<nav class="sidebar-menu">






												<ul><li class="">
















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/indexlaw.html" class=" ">
														Об ОСАГО - официально
														<span class="sm-corner"></span>
													</a>









												</li><li class="">













													<a href="https://www.reso.ru/Retail/AGO/OSAGO/TO/" class=" ">
														Всё о техосмотре
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/rates_of_osago.html" class=" ">
														Тарифы по ОСАГО
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/direct.html" class=" ">
														Безальтернативное прямое возмещение убытков
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/europrotocol.html" class=" ">
														"Европейский протокол" - упрощенное оформление ДТП
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/profi.html" class=" ">
														Каско-Профи (больше, чем ОСАГО)
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/Nolicense/" class=" ">
														Отозванные лицензии по ОСАГО
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/lost.html" class=" ">
														Утерянные и украденные бланки ОСАГО
														<span class="sm-corner"></span>
													</a>









												</li><li class="">















													<a href="https://www.reso.ru/Retail/AGO/OSAGO/FAQ/" class=" ">
														Вопросы и ответы
														<span class="sm-corner"></span>
													</a>










												</li></ul></nav>














											<div class="frmtr-text">
												<div>
													<div class="fb-page fb_iframe_widget" data-href="https://www.facebook.com/reso.ru" data-width="259" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=&amp;container_width=258&amp;hide_cover=true&amp;href=https%3A%2F%2Fwww.facebook.com%2Freso.ru&amp;locale=ru_RU&amp;sdk=joey&amp;show_facepile=true&amp;small_header=true&amp;width=259"><span style="vertical-align: bottom; width: 258px; height: 137px;"><iframe name="f2ae817e66dc54c" width="259px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:page Facebook Social Plugin" src="${pageContext.request.contextPath}/resources/osago_reso/page.html" style="border: none; visibility: visible; width: 258px; height: 137px;" class=""></iframe></span></div>
												</div>
											</div>

										</div>

										<div class="slogan-push"></div>

									</div>
								</div>

								<div class="slogan"></div>

							</div>

						</div>

					</div><!-- content-inside -->
			</section><!-- content -->
		</div><!-- wrap -->


		<div class="wrap clearfix">


























			<div class="date-lastmodified date-lastmodified-shift">
				Обновлено
				12.09.2017
				в
				09:48
			</div>


		</div>


	</section><!-- content-columns -->


	<div class="footer-push"></div>

</div>








<footer class="footer-no-border">

	<div class="footer-top">
		<div class="wrap clearfix">

			<noindex>
				<div class="f-note clearfix">
					<h2>Автострахование от РЕСО-Гарантия</h2>
					<p>РЕСО-Гарантия © – универсальная страховая компания. В числе наших приоритетов автострахование (как автоКАСКО, так и страхование ОСАГО), добровольное медицинское страхование, страхование имущества (в т.ч. страхование недвижимости), страхование ответственности (в т.ч. добровольная автогражданка) и грузов. Для определения стоимости страховых полисов на калькуляторах сайта вы можете произвести расчет КАСКО (страхование рисков "Хищение", "Ущерб"), рассчитать стоимость полиса ОСАГО и дополнительного страхования АГО, "Зеленая карта" и таких услуг, как ипотечное страхование, страхование квартиры, страхование дачи, ДМС, страхование путешественников, страхование жизни.<br></p>
					<br>
					<p>СПАО «РЕСО-Гарантия» раскрывает информацию на странице в сети Интернет информационного агентства, аккредитованного ЦБ РФ на раскрытие информации, по адресу: <a href="http://www.disclosure.ru/issuer/7710045520/" rel="nofollow" style="color: black; border-bottom: 0px none;">http://www.disclosure.ru/issuer/7710045520/</a></p>
					<br>
					<p><a href="https://www.reso.ru/About/Shareholders/list-of-participants-12.03.2019.pdf">Информация об акционерах и лицах, под контролем или значительным влиянием которых находится страховщик на 12.03.2019г.</a><br><a href="https://www.reso.ru/About/Company/">Информация о компании по базовым стандартам Центробанка</a></p>
				</div>
			</noindex>














			<div class="f-nav-block">
				<table class="f-nav">
					<tbody>
					<tr>





						<td class="">

							<a href="https://secure.reso.ru/sites_https/reso/Feedback/index.html">Служба качества</a>
						</td>


						<td class="">

							<a href="https://secure.reso.ru/sites_https/reso/Feedback/index.html">Обратная связь</a>
						</td>


						<td class="">

							<a href="https://www.reso.ru/Branches/">Контакты</a>
						</td>


						<td class="">

							<a href="https://www.reso.ru/About/">О компании</a>
						</td>


						<td class="">

							<a href="https://www.reso.ru/Career/">Карьера в РЕСО</a>
						</td>


						<td class="">

							<a href="https://www.reso.ru/RESOGroup/">Группа РЕСО</a>
						</td>


						<td class="">

							<a href="https://www.reso.ru/Shareholders/">Акционерам</a>
						</td>




						<td class="last-child">

							<a href="https://www.reso.ru/Zakupki/index.html">Закупки</a>
						</td>


					</tr>
					</tbody>
				</table>
			</div>

		</div><!-- wrap -->
	</div><!-- footer-top -->

	<noindex>
		<div class="footer-bottom">
			<div class="wrap clearfix">














				<div class="dev clearfix">
					<a class="clearfix" href="https://www.reso.ru/" rel="nofollow">
						© 2019, «РЕСО-Гарантия»
					</a>


					<a class="clearfix dev-webmaster" href="mailto:webmaster@reso.ru" rel="nofollow">
						webmaster@reso.ru
					</a>


					<a class="dev-design" href="http://qrstyle.ru/" rel="nofollow">
						Разработка дизайна — QR
					</a>
				</div><!-- dev -->














				<div class="f-social clearfix">
					<div class="f-social-note">Мы в социальных сетях</div>
					<ul class="f-social-list clearfix">
						<li><a class="f-social-facebook" title="facebook" href="https://ru-ru.facebook.com/reso.ru" rel="nofollow">facebook</a></li>
						<li><a class="f-social-vkontakte" title="vkontakte" href="http://vk.com/reso_garantia" rel="nofollow">vkontakte</a></li>
					</ul><!-- f-social-list -->
				</div>













				<ul class="f-partner-list clearfix">

					<li><a href="http://www.unityre.ru/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner1.jpg" width="51" height="26" alt="">
					</a></li>

					<li><a href="http://www.reso-med.com/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/reso_med.png" height="26" alt="">
					</a></li>

					<li><a href="http://www.resocreditbank.ru/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner3.jpg" width="64" height="26" alt="">
					</a></li>

					<li><a href="http://www.resoleasing.com/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner4.jpg" width="62" height="26" alt="">
					</a></li>

					<li><a href="http://www.wwf.ru/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner5.jpg" width="24" height="26" alt="">
					</a></li>

					<li><a href="http://www.standardandpoors.com/ru_RU/web/guest/home" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner6.jpg" width="78" height="26" alt="">
					</a></li>

					<li><a href="http://www.raexpert.ru/database/companies/reso-garantiya/" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner7.jpg" width="76" height="26" alt="">
					</a></li>

					<li><a href="http://narodnayamarka.ru/odl-winners/pobediteli-konkursa-narodnaya-marka--2007.html" rel="nofollow">
						<img src="${pageContext.request.contextPath}/resources/osago_reso/partner8.jpg" width="30" height="26" alt="">
					</a></li>

				</ul><!-- f-partner-list -->


			</div><!-- wrap -->
		</div><!-- footer-bottom -->
	</noindex>

</footer>

















<a class="totop" href="https://www.reso.ru/Retail/AGO/OSAGO/Calculator/#" style="display: none;">Наверх</a>







<ul id="ui-id-1" tabindex="0" class="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front" style="display: none;"></ul><div role="status" aria-live="assertive" aria-relevant="additions" class="ui-helper-hidden-accessible"></div><div style="background-color: rgb(255, 255, 255); border: 1px solid rgb(204, 204, 204); box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px; position: absolute; transition: visibility 0s linear 0.3s, opacity 0.3s linear 0s; opacity: 0; visibility: hidden; z-index: 2000000000; left: 0px; top: -10000px;"><div style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 2000000000; background-color: rgb(255, 255, 255); opacity: 0.05;"></div><div class="g-recaptcha-bubble-arrow" style="border: 11px solid transparent; width: 0px; height: 0px; position: absolute; pointer-events: none; margin-top: -11px; z-index: 2000000000;"></div><div class="g-recaptcha-bubble-arrow" style="border: 10px solid transparent; width: 0px; height: 0px; position: absolute; pointer-events: none; margin-top: -10px; z-index: 2000000000;"></div><div style="z-index: 2000000000; position: relative;"><iframe title="проверка recaptcha" src="${pageContext.request.contextPath}/resources/osago_reso/bframe.html" name="c-390ixuqjrsp0" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" style="width: 100%; height: 100%;"></iframe></div></div></body></html>