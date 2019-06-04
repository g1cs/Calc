package ru.calc.servlets.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/calcs")
public class PageCalcsServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    System.out.println("PageCalcsServlet");
    final HttpSession session = request.getSession();
    final ru.calc.model.User.ROLE role = (ru.calc.model.User.ROLE) session.getAttribute("role");

    if (role.equals(ru.calc.model.User.ROLE.ADMIN)) {
      request.getRequestDispatcher("/WEB-INF/view/calcs.jsp").forward(request, response);

    } else if (role.equals(ru.calc.model.User.ROLE.USER)) {
      request.getRequestDispatcher("/WEB-INF/view/calcs.jsp").forward(request, response);
    }
  }


  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
  }
}
