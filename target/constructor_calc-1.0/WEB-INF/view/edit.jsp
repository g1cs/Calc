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
  <link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/css/edit.css" rel="stylesheet"/>
  <%-- js --%>
  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-3.4.1.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/js/calc.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/js/edit.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-ui-1.12.1.js"></script>




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


<div class="col-sm-offset-2 col-sm-3" id="typeCalcs"></div>
<div class="col-sm-offset-2 col-sm-3" id="elementsCalcs"></div>
<div class="col-sm-offset-4 col-sm-8" id="constructor"></div>
<div class="col-sm-offset-4 col-sm-4" id="div_result"></div>

<div id="modal" class="modalwindow" style="top: 126.5px; left: 425px; display: none;">

  <!-- Modal window Title -->
  <h2>Simple jQuery Modal Window</h2>

  <!-- close button is defined as close class -->
  <a href="#" class="close">X</a>

  <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

</div>

</body>
</html>
