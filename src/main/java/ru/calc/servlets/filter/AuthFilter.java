package ru.calc.servlets.filter;

import ru.calc.dao.UserDAO;
import ru.calc.db.DBWorker;
import ru.calc.model.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicReference;

import javax.servlet.http.HttpServlet;

import static java.util.Objects.nonNull;

@WebFilter("/")
public class AuthFilter implements Filter {

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
  }

  @Override
  public void destroy() {
  }

  @Override
  public void doFilter(final ServletRequest request,
                       final ServletResponse response,
                       final FilterChain filterChain)
      throws IOException, ServletException {

    System.out.println("AuthFilter");

    request.setCharacterEncoding("UTF-8");
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    final HttpServletRequest req = (HttpServletRequest) request;
    final HttpServletResponse res = (HttpServletResponse) response;

    final String login = req.getParameter("login");
    final String password = req.getParameter("password");
    final HttpSession session = req.getSession();

    //@SuppressWarnings("unchecked")
    //final AtomicReference<UserDAO> users = (AtomicReference<UserDAO>) req.getServletContext().getAttribute("users");
    final DBWorker dbWorker = (DBWorker) req.getServletContext().getAttribute("dbWorker");

    System.out.println("login: " + login);

    if (nonNull(session) &&
        nonNull(session.getAttribute("role")) &&
        nonNull(session.getAttribute("login")) &&
        nonNull(session.getAttribute("userId")) &&
        nonNull(session.getAttribute("password"))) {
      // авторизованный пользователь

      final User.ROLE role = (User.ROLE) session.getAttribute("role");
      moveToMenu(req, res, role);

    } else if (dbWorker.userIsExist(login, password)) {
      // авторизация пользователя

      final User user = dbWorker.getUserByLoginPassword(login, password);

      req.getSession().setAttribute("role", user.getRole());
      req.getSession().setAttribute("userId", user.getId());
      req.getSession().setAttribute("password", password);
      req.getSession().setAttribute("login", login);

      moveToMenu(req, res, user.getRole());

    } else {
      // неизвестный пользователь
      moveToMenu(req, res, User.ROLE.UNKNOWN);
    }
//    if (nonNull(session) &&
//        nonNull(session.getAttribute("login")) &&
//        nonNull(session.getAttribute("password"))) {
//
//      final User.ROLE role = (User.ROLE) session.getAttribute("role");
//
//      moveToMenu(req, res, role);
//
//    } else if (users.get().userIsExist(login, password)) {
//
//
//      final User user = users.get().getUserByLoginPassword(login, password);
//
//      req.getSession().setAttribute("password", password);
//      req.getSession().setAttribute("login", login);
//      req.getSession().setAttribute("role", user.getRole());
//      req.getSession().setAttribute("userId", user.getId());
//
//      moveToMenu(req, res, user.getRole());
//
//    } else {
//
//      moveToMenu(req, res, User.ROLE.UNKNOWN);
//    }
  }

  private void moveToMenu(final HttpServletRequest req,
                          final HttpServletResponse res,
                          final User.ROLE role)
      throws ServletException, IOException {




    int r = role.ordinal();
    System.out.println("role: " + r);

    if (role.equals(User.ROLE.UNKNOWN)) {

      req.getRequestDispatcher("/WEB-INF/view/login.jsp").forward(req, res);
    } else {

      res.sendRedirect("/index");
    }


//    if (role.equals(User.ROLE.ADMIN)) {
//
//      //req.getRequestDispatcher("/WEB-INF/view/admin_menu.jsp").forward(req, res);
//
//    } else if (role.equals(User.ROLE.USER)) {
//
//      //req.getRequestDispatcher("/WEB-INF/view/user_menu.jsp").forward(req, res);
//
//    } else {
//
//      req.getRequestDispatcher("/WEB-INF/view/login.jsp").forward(req, res);
//    }
  }
}
