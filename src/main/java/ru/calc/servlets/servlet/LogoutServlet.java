package ru.calc.servlets.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("logout");
        final HttpSession session = request.getSession();

        session.removeAttribute("password");
        session.removeAttribute("login");
        session.removeAttribute("role");

        response.sendRedirect("/");
        //response.sendRedirect(super.getServletContext().getContextPath());
        //req.getRequestDispatcher("/WEB-INF/view/login.jsp").forward(req, resp);
    }

}
