<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
  <title>Javastudy.ru MVC_HTML5_Angular</title>
  <spring:url value="/resources/bootstrap/css/bootstrap.css" var="bootstrap"/>
  <spring:url value="/resources/bootstrap/css/modern-business.css" var="startertemplate"/>
  <spring:url value="/resources/bootstrap/js/jquery-3.4.1.js" var="jquery"/>

  <link href="${bootstrap}" rel="stylesheet" />
  <link href="${startertemplate}" rel="stylesheet" />
  <script src="${jquery}" ></script>

  <spring:url value="/resources/css/main.css" var="maincss"/>
  <spring:url value="/resources/js/calc.js" var="calcjs"/>
  <link href="${maincss}" rel="stylesheet" />
  <script src="${calcjs}"></script>
  <script>
      jQuery(document).ready(function($) {
          loadCalcs();
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
      <a class="navbar-brand" href="/#">Zagr & Masl</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="active" ><a href="/edit">Создать</a></li>
        <li><a href="/calcs">Примеры</a></li>
        <li><a data-toggle="modal" data-target="#myModal" href="#myModal"><i class="fa fa-envelope-o"></i></a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>
<div class="container">
  <div id="dg">
    <div class="container">
      <div>
        <h4>LATEST WORKS</h4>
        <br>
        <div>
          <%--<div><input type="checkbox" onclick="onchangeEdit(this);"/>Редактировать</div>--%>
          <%--<br><br>--%>
          <h1 id="title">Калькуляторы</h1>
          <%--<br><br>--%>
          <%--<button type="submit" id="btnLoadTypeCalcs">Начать</button>--%>
          <br><br>
          <div class="" id="typeCalcs"></div>
          <br><br>
          <div class="" id="elementsCalcs"></div>
          <br><br>
          <div class="" id="constructor"></div>
            <br><br>
            <div class="border" id="div_result"></div>
        </div>
        </div>
      </div>
      <!-- row -->
    </div>
    <!-- container -->
  </div>
  <!-- DG -->

</div>
</body>
</html>
