<!DOCTYPE HTML>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/modern-business.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/css/index.css" rel="stylesheet"/>

  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:400,300,700,900" rel="stylesheet">

  <script src="${pageContext.request.contextPath}/resources/bootstrap/js/jquery-2.2.0.js" type="text/javascript"></script>

</head>
<!-- ///////////////////////////////////////////////////////////      -->
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
<div class="container" >
  <div>
    <br><br>
    <h1 id="title"><center>Калькуляторы и формы<br>
      для сайтов, мессенджеров и соцсетей</center></h1>
    <h3><center>Сделайте их сами без навыков программирования, потратив 0 рублей и 10 минут времени.</center></h3>
    <br><br>

  </div>
</div><!-- /.container -->
<div class="col-md-offset-1">
  <form action="/osagoreso">
    <center><button type="submit" class="btn btn-primary btn-lg">Пример встраимого калькулятора</button></center>
  </form>
  <form action="/edit">
    <div class="button-container">
      <a type="submit" name="typeCalc" href="/edit?typeCalc=Осаго">Создать калькулятор Осаго</a>
      <a type="submit" name="typeCalc" href="/edit?typeCalc=Кредит">Создать калькулятор Кредит</a>
      <a type="submit" name="typeCalc" href="/edit?typeCalc=Ипотека">Создать калькулятор Ипотека</a>
    </div>
  </form>




</div>



<%--<div><img src="/resources/img/bank.jpeg"></div>--%>

<!-- FOOTER -->
<div id="f" class="navbar-fixed-bottom">
  <div class="container">
    <div class="row centered">
      <a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-dribbble"></i></a>
    </div>
    <!-- row -->
  </div>
  <!-- container -->
</div>
<!-- Footer -->
<!-- ///////////////////////////////////////////////////////     -->
</body>
</html>