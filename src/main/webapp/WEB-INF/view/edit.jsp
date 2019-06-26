<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
  <title>Edit</title>


  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/modern-business.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:400,300,700,900" rel="stylesheet">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
  <link href="${pageContext.request.contextPath}/resources/css/edit.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/css/class.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/css/elements.css" rel="stylesheet"/>
  <%-- js --%>
  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-ui-1.12.1.js"></script>
  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-3.4.1.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/js/calc.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/js/edit.js" ></script>


  <script>
      jQuery(document).ready(function($) {
          var type = $.urlParam('typeCalc');
          switch (type) {
              case 'Осаго':     $('#title').text("Создание калькулятора (Осаго)");    loadCalc(type);   break;
              case "Кредит":    $('#title').text("Создание калькулятора (Кредит)");   loadCalc(type);   break;
              case "Вклады":    $('#title').text("Создание калькулятора (Вклады)");   loadCalc(type);   break;
              case "Ипотека":   $('#title').text("Создание калькулятора (Ипотека)");  loadCalc(type);   break;
              default:          $('#title').text("Создание калькулятора");            loadListCalcs();
          }
      });
  </script>

</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/index">Zagr & Masl</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="active " ><a href="/edit">Создать</a></li>
        <li><a href="/calcs">Мои калькуляторы</a></li>
        <li><a data-toggle="modal" data-target="#myModal" href="/logout "><i class="fa"><i class="fa-times"></i></i></a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>

<div class="container">

  <%--<div><input type="checkbox" onclick="onchangeEdit(this);"/>Редактировать</div>--%>
  <%--<br><br>--%>
  <h1 class="centered" id="title">Создание калькулятора</h1>
  <br><br><br>

</div>
<%--<br><br>--%>
<%--<button type="submit" id="btnLoadTypeCalcs" class="btn btn-primary btn-lg ">Начать</button>--%>


<div class="inline_box">

  <div class="typeCalcs" id="typeCalcs"></div>
    <div class="elementsCalcs" id="elementsCalcs"></div>
    <div class="constructor" id="constructor"></div>


</div>
<div class="div_result" id="div_result" style="display: none;"></div>

<%--<table border="1" style="width: 80%;">--%>
  <%--<tr>--%>
    <%--<td style="min-width: auto;"><div class="typeCalcs" id="typeCalcs"></div></td>--%>
    <%--<td style="min-width: auto;"><div class="elementsCalcs" id="elementsCalcs"></div></td>--%>
    <%--<td style="min-width: auto;"><div class="constructor" id="constructor"></div></td>--%>
  <%--</tr>--%>
<%--</table>--%>

<%--<div id="div_result"></div>--%>


</body>
</html>
