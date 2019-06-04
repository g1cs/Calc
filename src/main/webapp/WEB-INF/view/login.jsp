<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>

</head>
<body>

    <div class="form">

        <h1>Вход в систему</h1><br>
        <form id="mail_form" method="post" action="">

            <input type="text" required placeholder="login" name="login"><br>
            <input type="password" required placeholder="password" name="password"><br><br>
            <input class="button" type="submit" value="Войти">
            <span id='error' style='color:red; font-weight:bold;'></span>

        </form>
    </div>
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
                            $('#error').append(myArray['errors'][i] + "<br>");
                        }
                    );
                }
                return false; //Make sure you do this or it will submit the form and redirect
            });
    });
</script>
</body>
</html>
