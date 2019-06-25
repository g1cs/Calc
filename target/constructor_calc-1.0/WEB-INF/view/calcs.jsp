<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
  <title>Calcs</title>

  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/modern-business.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:400,300,700,900" rel="stylesheet">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
  <link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/css/edit.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/css/calcs.css" rel="stylesheet" />
  <link href="${pageContext.request.contextPath}/resources/css/qwe.css" rel="stylesheet"/>

  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-3.4.1.js" ></script>
  <script src="${pageContext.request.contextPath}/resources/js/edit.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/calc.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/calc_edit.js"></script>
  <script>
      jQuery(document).ready(function($) {
          loadUserCalcs();
          loadDefaultCalc();
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
        <li><a href="/calcs">Мои калькуляторы</a></li>
        <li><a data-toggle="modal" data-target="#myModal" href="#myModal"><i class="fa fa-envelope-o"></i></a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>
<div class="container">
  <div>
    <div class="container">
      <div>
        <h4><center>LATEST WORKS</center></h4>
        <br>

          <%--<div><input type="checkbox" onclick="onchangeEdit(this);"/>Редактировать</div>--%>
          <%--<br><br>--%>
          <h1 id="title"><center>Калькуляторы</center>  </h1>
          <%--<br><br>--%>
          <%--<button type="submit" id="btnLoadTypeCalcs">Начать</button>--%>
          <br><br>
        <div class="col-sm-8 col-sm-offset-3">
          <div class="" id="typeCalcs"></div>
          <br><br>
          <div class="" id="elementsCalcs"></div>
          <br><br>
          <div class="" id="constructor"></div>
            <br><br>
            <div class="stylelable" id="div_result"></div>
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
