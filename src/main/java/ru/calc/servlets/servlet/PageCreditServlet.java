package ru.calc.servlets.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/credit")
public class PageCreditServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {


    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    request.getRequestDispatcher("/WEB-INF/view/credit.jsp").forward(request, response);
  }
}
