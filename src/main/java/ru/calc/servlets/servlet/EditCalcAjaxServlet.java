package ru.calc.servlets.servlet;

import ru.calc.db.DBWorker;
import ru.calc.model.*;
import ru.calc.model.Elements.*;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
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
import java.util.concurrent.CopyOnWriteArrayList;


@WebServlet("/editCalcAjax")
public class EditCalcAjaxServlet extends HttpServlet {

//  public static Calc calc;

  private static DBWorker dbWorker;
  private static List<Calc> defaultCalcs;
  private static List<Calc> calcs;
  private static Integer AdminId = 1;
  private User.ROLE userRole;
  private Boolean isAdmin = false;

  @Override
  public void init() throws ServletException {

    final Object defaultCalcs = getServletContext().getAttribute("defaultCalcs");
    final Object calcs = getServletContext().getAttribute("calcs");
    final Object dbWorker = getServletContext().getAttribute("dbWorker");


    if (defaultCalcs == null || !(defaultCalcs instanceof CopyOnWriteArrayList)) {

      throw new IllegalStateException("defaultCalcs does not initialize!");
    } else {

      EditCalcAjaxServlet.defaultCalcs = (CopyOnWriteArrayList<Calc>) defaultCalcs;
    }
    if (calcs == null || !(calcs instanceof CopyOnWriteArrayList)) {

      throw new IllegalStateException("calcs does not initialize!");
    } else {

      EditCalcAjaxServlet.calcs = (CopyOnWriteArrayList<Calc>) calcs;
    }
    if (dbWorker == null || !(dbWorker instanceof DBWorker)) {

      throw new IllegalStateException("dbWorker does not initialize!");
    } else {

      EditCalcAjaxServlet.dbWorker = (DBWorker) dbWorker;
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    System.out.println("EditCalcAjaxServlet_GET");
    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    System.out.println(role);

    if (role.equals(User.ROLE.UNKNOWN))
      return;

    List<String> list = new ArrayList<>();
    list.add("Осаго");
    list.add("Кредит");
    list.add("Вклады");
    list.add("Ипотека");
    list.add("Тариф сотовой связи");

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(new Gson().toJson(list));
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    System.out.println("EditCalcAjaxServlet_POST");
    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    final Boolean isAdmin;
    System.out.println(role);

    if (role.equals(User.ROLE.ADMIN))
      isAdmin = true;
    else if (role.equals(User.ROLE.USER))
      isAdmin = false;
    else
      return;

    final Integer userId = (Integer) session.getAttribute("userId");
    final JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
    System.out.println(userId);

    String json = getJsonResult(data, userId, isAdmin);

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(json);
  }
  
  private String getJsonResult(JsonObject data, Integer userId, Boolean isAdmin) {

    String typeCalc = data.get("typeCalc").getAsString();
    String query = data.get("query").getAsString();
    
    switch (query) {
      case "GET":
        return getJsonResultOnQueryGet(userId, typeCalc, isAdmin);

      case "SAVE":
        JsonElement jsonElement = data.get("list");
        return getJsonResultOnQuerySave(userId, typeCalc, data.get("name").getAsString(), jsonElement);

      case "RES":
        JsonElement jsonElementList = data.get("list");
        return getJsonResultOnQueryRes(userId, typeCalc, data.get("name").getAsString(), jsonElementList);

      case "DEL":
        Integer index = data.get("index").getAsInt();
        return getJsonResultOnQueryDel(userId, index, isAdmin);

      default:
        return "Ошибка!";
    }
  }

  private String getJsonResultOnQueryGet(Integer userId, String typeCalc, Boolean isAdmin) {

    Gson gson = new Gson();
    List<Calc> temp = defaultCalcs; // стандартные калькуляторы

    switch (typeCalc) {
      case "Осаго":
      case "Кредит":
      case "Ипотека":
        for (Calc calc : temp)
          if (calc.type.equals(typeCalc))
            return gson.toJson(calc);
      // пользовательские калькуляторы
      case "ALL":
      case "":
        if (!isAdmin)
          return gson.toJson(dbWorker.getUserCalc(userId));
        else
          return gson.toJson(defaultCalcs);
//        if (!isAdmin)
//          temp = calcs;
//        List<Calc> resList = new CopyOnWriteArrayList<>();
//        for (Calc calc : temp) {
//          if (calc.userId.equals(userId))
//            resList.add(calc);
//        }
//        return gson.toJson(resList);
      case "Вклады":
      default:
        return "Ошибка!";
    }
  }

  private String getJsonResultOnQuerySave(Integer userId, String typeCalc, String name, JsonElement jsonElement) {

    if (getJsonResultOnQueryRes(userId, typeCalc, name, jsonElement).equals("Ошибка!"))
      return "Ошибка! Не правильно составлен калькулятор.";

    Calc newCalc = null;
    switch (typeCalc) {
      case "Осаго": {
        newCalc = new CalcOsago(name);
        Type listType = new TypeToken<List<Element>>() {}.getType();
        List<Element> list = new Gson().fromJson(jsonElement, listType);
        ((CalcOsago) newCalc).setElements(list);
      } break;
      case "Кредит": {
        newCalc = new CalcCredit(name);
        Type listType = new TypeToken<List<Element>>() {}.getType();
        List<Element> list = new Gson().fromJson(jsonElement, listType);
        ((CalcCredit) newCalc).setElements(list);
      } break;
      case "Вклады": {
      } break;
      case "Ипотека": {
        newCalc = new CalcIpoteka(name);
        Type listType = new TypeToken<List<Element>>() {}.getType();
        List<Element> list = new Gson().fromJson(jsonElement, listType);
        ((CalcIpoteka) newCalc).setElements(list);
      } break;
      default: break;
    }
    newCalc.userId = userId;
    newCalc.type = typeCalc;

    dbWorker.addUserCalc(newCalc);
    EditCalcAjaxServlet.calcs.add(newCalc);
    return new Gson().toJson(newCalc);
  }

  private String getJsonResultOnQueryRes(Integer userId, String typeCalc, String name, JsonElement jsonElement) {

    String json = "", out = "";
    
    switch (typeCalc) {
      case "Осаго": {
        CalcOsago calc = new CalcOsago(name);
        Type listType = new TypeToken<List<ListValue>>() {}.getType();
        List<ListValue> list = new Gson().fromJson(jsonElement, listType);
        out = CalcOsago.getResult(calc.getDefaultResult(), list);
        json = new Gson().toJson(out);
      }
      break;
      case "Кредит": {
        CalcCredit calc = new CalcCredit(name);
        Type listType = new TypeToken<List<Element>>() {}.getType();
        List<Element> list = new Gson().fromJson(jsonElement, listType);
        json = CalcCredit.getResult(calc.getDefaultResult(), list);
      }
      break;
      case "Вклады": {
      }
      break;
      case "Ипотека": {
        CalcIpoteka calc = new CalcIpoteka(name);
        Type listType = new TypeToken<List<Element>>() {}.getType();
        List<Element> list = new Gson().fromJson(jsonElement, listType);
        json = CalcIpoteka.getResult(calc.getDefaultResult(), list);
      }
      break;
      default:
        break;
    }
    
    return json;
  }

  private String getJsonResultOnQueryDel(Integer userId, Integer index, Boolean isAdmin) {

    if (!isAdmin) {
      dbWorker.deleteCalc(userId, index);
      defaultCalcs.remove(index);
      return "Успешно удалено!";
    }
    return "Ошибка!";
  }
}