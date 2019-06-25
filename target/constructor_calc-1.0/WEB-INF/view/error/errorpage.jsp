<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<html>
<head>
    <title>Ошибка 404</title>
</head>
<body>
<img src="graphics/404.gif" alt="Ошибка 404">
<p>К сожалению, запрашиваемая Вами страница не найдена..</p>
<p>Почему?</p>
<ol>
    <li>Ссылка, по которой Вы пришли, неверна.
    <li>Вы неправильно указали путь или название страницы.
    <li>Страница была удалёна со времени Вашего последнего посещения.
</ol>
<p>Для продолжения работы с сайтом Вы можете воспользоваться формой поиска по сайту:</p>
<form>
    <input type="text" size="30">
    <input type="submit" value="Поиск">
</form>
<p>..или перейти на:</p>
<ul>
    <li><a href="/">Главную страницу сайта.</a>
</ul>
</body>
</html>