//package ru.calc.servlets.servlet;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import ru.calc.model.Calc;
//import ru.calc.model.User;
//
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.CopyOnWriteArrayList;
//
//@WebServlet("/getCalcs")
//public class GetCalcServlet extends HttpServlet {
//
//  private static List<Calc> calcs;
//
//  @Override
//  public void init() throws ServletException {
//
//    final Object calcs = getServletContext().getAttribute("calcs");
//
//    if (calcs == null || !(calcs instanceof CopyOnWriteArrayList)) {
//
//      throw new IllegalStateException("You're repo does not initialize!");
//    } else {
//
//      GetCalcServlet.calcs = (CopyOnWriteArrayList<Calc>) calcs;
//    }
//  }
//
//  @Override
//  protected void doGet(HttpServletRequest request, HttpServletResponse response)
//      throws ServletException, IOException {
//
//    System.out.println("GetCalcServlet_GET");
//    final HttpSession session = request.getSession();
//    final User.ROLE role = (User.ROLE) session.getAttribute("role");
//    final Integer userId = (Integer) session.getAttribute("userId");
//    System.out.println(role);
//    System.out.println(userId);
//
//    if (!role.equals(User.ROLE.UNKNOWN)) {
//
//
//      response.setContentType("application/json");
//      response.setCharacterEncoding("UTF-8");
//      response.getWriter().write(json);
//
//    }
//
//
//    JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
//    String type = data.get("type").getAsString();
//    String go = data.get("go").getAsString();
//
//    String json = "";
//    switch (type)
//    {
//      case "CALCS":
//      {
//        json = new Gson().toJson(calcs);
//      } break;
//      case "Осаго":
//      {
//        switch (go)
//        {
//          case "GET":
//          {
//          } break;
//          case "SET":
//          {
//
//          } break;
//          default: break;
//        }
//      } break;
//      case "Кредит":
//        switch (go) {
//          // элементы калькулятора
//          case "GET":
//            break;
//          case "SET":
//            break;
//          default: break;
//        } break;
//      case "Вклады":
//        switch (go) {
//          // элементы калькулятора
//          case "GET":
//            break;
//          case "SET":
//            break;
//          default: break;
//        } break;
//      case "Ипотека":
//        switch (go) {
//          // элементы калькулятора
//          case "GET":
//            break;
//          case "SET":
//            break;
//          default: break;
//        } break;
//      default:  break;
//    }
//
//    response.setContentType("application/json");
//    response.setCharacterEncoding("UTF-8");
//    response.getWriter().write(json);
//  }
//
//}