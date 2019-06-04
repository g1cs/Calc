package ru.calc.servlets.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.calc.dao.UserDAO;
import ru.calc.model.*;
import ru.calc.model.Elements.Element;
import ru.calc.model.Elements.ListValue;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;


@WebServlet("/editGetElemsCalcs")
public class EditGetElemsCalcServlet extends HttpServlet {

//  public static Calc calc;

  private Map<String, Calc> defaultCalcs;

  @Override
  public void init() throws ServletException {

    final Object defaultCalcs = getServletContext().getAttribute("defaultCalcs");

    if (defaultCalcs == null || !(defaultCalcs instanceof ConcurrentHashMap)) {

      throw new IllegalStateException("You're repo does not initialize!");
    } else {

      this.defaultCalcs = (ConcurrentHashMap<String, Calc>) defaultCalcs;
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    System.out.println("PageIndexServlet_GET");
    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    System.out.println(role);

    if (!role.equals(User.ROLE.UNKNOWN)) {

      List<String> list = new ArrayList<>();
      list.add("Осаго");
      list.add("Кредит");
      list.add("Вклады");
      list.add("Ипотека");
      list.add("Тариф сотовой связи");

//      response.setContentType("application/json");
//      response.setCharacterEncoding("UTF-8");
      response.getWriter().write(new Gson().toJson(list));
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    System.out.println("PageIndexServlet_POST");
    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    System.out.println(role);

    //@SuppressWarnings("unchecked")
    //final AtomicReference<UserDAO> dao = (AtomicReference<UserDAO>) request.getServletContext().getAttribute("dao");

    if (!role.equals(User.ROLE.UNKNOWN)) {

      Gson gson = new Gson();
      JsonObject data = gson.fromJson(request.getReader(), JsonObject.class);
      String typeCalc = data.get("typeCalc").getAsString();
      String json = "";
      System.out.println("typeCalc: " + typeCalc);

      switch (typeCalc) {
        case "Осаго": {
          CalcOsago calcOsago = (CalcOsago) defaultCalcs.get(typeCalc);
          json = gson.toJson(calcOsago);
          System.out.println(json);
        } break;
        case "Кредит": {
          CalcCredit calcCredit = (CalcCredit) defaultCalcs.get(typeCalc);
          json = gson.toJson(calcCredit);
          System.out.println(json);
        } break;
        case "Ипотека": {
          CalcIpoteka calcIpoteka = (CalcIpoteka) defaultCalcs.get(typeCalc);
          json = gson.toJson(calcIpoteka);
          System.out.println(json);
        } break;
        case "Вклады": {
        } break;
        default:
          break;
      }

      response.getWriter().write(json);
    }
  }
}