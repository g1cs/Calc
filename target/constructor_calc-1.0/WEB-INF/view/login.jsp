<!DOCTYPE html>


<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>



<html>
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <%--   &lt;%&ndash; <spring:url value="/resources/bootstrap/css/bootstrap.css" var="bootstrap"/>
        <spring:url value="/resources/bootstrap/css/modern-business.css" var="startertemplate"/>
        <spring:url value="/resources/bootstrap/js/jquery-3.4.1.js" var="jquery"/>&ndash;%&gt;
        <link href="${bootstrap}" rel="stylesheet" />
        <link href="${startertemplate}" rel="stylesheet" />
        <script src="${jquery}" ></script>--%>

    <link href="${pageContext.request.contextPath}/resources/css/login.css" rel="stylesheet" />
    <title>Login</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.0/css/bootstrap.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.0/js/bootstrap.min.js"></script>

    <style>
        body{
            background: #ADA996; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
    </style>
</head>
<body>


<div class="container">
    <div class="row">

        <div class="col-md-offset-3 col-md-6">
            <form class="form-horizontal">
                <span class="heading">АВТОРИЗАЦИЯ</span>
                <div class="form-group">
                    <input name="login" type="text" class="form-control" id="inputLogin" placeholder="Login">
                    <i class="fa fa-user"></i>
                </div>
                <div class="form-group help">
                    <input name="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
                    <i class="fa fa-lock"></i>
                    <a  class="fa fa-question-circle text1" data-toggle="popover" data-container="body"  data-content="Андрей лох" data-placement="right"></a>
                </div>
                <div class="form-group">
                    <div class="main-checkbox">
                        <input type="checkbox" value="none" id="checkbox1" name="check"/>
                        <label for="checkbox1"></label>
                    </div>
                    <span class="text">Запомнить</span>
                    <button type="submit" class="btn btn-default">ВХОД</button>
                </div>
            </form>
        </div>

    </div><!-- /.row -->
</div><!-- /.container -->

<%-- <div class="form">

     <h1>Вход в систему</h1>
     <form id="mail_form" method="post" action="">

         <input type="text" required placeholder="login" name="login">
         <input type="password" required placeholder="password" name="password">
         <input class="button" type="submit" value="Войти">
         <span id='error' style='color:red; font-weight:bold;'></span>

     </form>
 </div>--%>
<script>
    $('#mail_form').on('submit', function() {
        var dataIn = $(this).serialize(); //serialize turns the form data into a string that can be passed to mail.php. Try doing alert(dataIn); to see what it holds.
        $.post("", dataIn)
            .done(function (dataOut) {
                //dataOut holds the response from mail.php. The response would be any html mail.php outputs. I typically echo out json encoded arrays as responses that you can parse here in the jQuery.
                var myArray = JSON.parse(dataOut);
                if (myArray['success'] == true) //Check if it was successfull.
                {
                    $("#mail_form").html("Congrats! We just e-mailed you!");
                }
                else //there were errors
                {
                    $('#error').html(""); //Clear error span

                    $.each(myArray['errors'], function (i) {
                            $('#error').append(myArray['errors'][i] + "");
                        }
                    );
                }
                return false; //Make sure you do this or it will submit the form and redirect
            });
    });
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });

    function qwe(name) {
        $('[data-toggle="name"]').popover();
    }
</script>
</body>
</html>
