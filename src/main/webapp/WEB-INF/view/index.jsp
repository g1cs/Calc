<!DOCTYPE HTML>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
  <%--<spring:url value="/resources/bootstrap/css/bootstrap.css" var="bootstrap"/>--%>
  <%--<spring:url value="/resources/bootstrap/css/modern-business.css" var="startertemplate"/>--%>
    <%--<spring:url value="/resources/img/bank.jpeg" var="img"/>--%>
  <%--<spring:url value="/resources/js/jquery.js" var="jquery"/>--%>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js" type="text/javascript"></script>
  <%--<link href="${bootstrap}" rel="stylesheet" type="text/html"/>--%>
  <%--<link href="${startertemplate}" rel="stylesheet" type="text/html"/>--%>
  <%--<link href="${img}" rel="stylesheet" type="text/html"/>--%>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/css/modern-business.css" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/img/bank.jpeg" rel="stylesheet"/>
  <link href="${pageContext.request.contextPath}/resources/bootstrap/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:400,300,700,900" rel="stylesheet">

  <!-- Bootstrap core CSS -->

  <%--<script src="${jquery}" ></script>--%>

  <%--<spring:url value="/resources/css/main.css" var="maincss"/>--%>
  <%--<spring:url value="/resources/js/edit.js" var="editjs"/>--%>
  <%--<link href="${maincss}" rel="stylesheet"/>--%>
  <%--<script src="${editjs}" type="text/javascript"></script>--%>
  <link href="${pageContext.request.contextPath}/resources/css/main.css" rel="stylesheet"/>
  <script src="${pageContext.request.contextPath}/resources/js/edit.js"></script>

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
      <a class="navbar-brand" href="/#">Zagr & Masl</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="active " ><a href="/edit">Создать</a></li>
        <li><a href="/calcs">Примеры</a></li>
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
    <div >
      <form action="/edit">
        <center><button type="submit" class="btn btn-primary btn-lg">Создать калькулятор</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Осаго">Создать калькулятор Осаго</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Кредит">Создать калькулятор Кредит</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Вклады">Создать калькулятор Вклады</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Ипотека">Создать калькулятор Ипотека</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg">Создать калькулятор</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Осаго">Создать калькулятор Осаго</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Кредит">Создать калькулятор Кредит</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Вклады">Создать калькулятор Вклады</button></center>
        <center><button type="submit" class="btn btn-primary btn-lg" name="typeCalc" value="Ипотека">Создать калькулятор Ипотека</button></center>
      </form>
    </div>
    <div>
      <a href="/edit?typeCalc=Осаго">Создать калькулятор Осаго</a>
    </div>
  </div>
</div>


<%--<div><img src="/resources/img/bank.jpeg"></div>--%>

<!-- FOOTER -->
<div id="f">
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
