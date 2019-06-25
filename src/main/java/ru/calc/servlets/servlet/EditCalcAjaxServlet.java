package ru.calc.servlets.servlet;

import ru.calc.db.DBWorkerWeb;
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

  private static DBWorkerWeb dbWorker;
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
    if (dbWorker == null || !(dbWorker instanceof DBWorkerWeb)) {

      throw new IllegalStateException("dbWorker does not initialize!");
    } else {

      EditCalcAjaxServlet.dbWorker = (DBWorkerWeb) dbWorker;
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");

    if (role.equals(User.ROLE.UNKNOWN))
      return;

    List<String> list = new ArrayList<>();
    list.add("Осаго");
    list.add("Кредит");
    list.add("Ипотека");

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().write(new Gson().toJson(list));
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    boolean isAdmin = false;

    if (role == null || role.equals(User.ROLE.UNKNOWN))
      return;

    if (role.equals(User.ROLE.ADMIN))
      isAdmin = true;

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    Integer userId;
    try {
      userId = (Integer) session.getAttribute("userId");
    } catch (Exception e) {
      response.sendError(500, "Запрос не выполнен. Сервер попал в непредвиденные условия. Пройдите авторизацию заново!!!");
      return;
    }
    final JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
    System.out.println(userId);

    String json = getJsonResult(response, data, userId, isAdmin);

    if (json != null)
      response.getWriter().write(json);
  }

  private String getJsonResult(HttpServletResponse response, JsonObject data, Integer userId, Boolean isAdmin)
      throws ServletException, IOException {

    String typeCalc, query = data.get("query").getAsString();

    try {
      typeCalc = data.get("typeCalc").getAsString();
    } catch (Exception e) {
      response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'typeCalc'!!!");
      return null;
    }
    JsonElement jsonElement = null;
    Integer calcId = null;
    String name = null;


    switch (query) {

      case "SAVE":
      case "UPDATE":
      case "RES":
        try {
          jsonElement = data.get("list");
        } catch (Exception e) {
          response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'list'!!!");
          return null;
        }
        try {
          name = data.get("name").getAsString();
        } catch (Exception e) {
          response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'name'!!!");
          return null;
        }
      default: break;
    }

    switch (query) {

      case "UPDATE":
      case "DEL":
        try {
          calcId = data.get("idCalc").getAsInt();
        } catch (Exception e) {
          response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'idCalc'!!!");
          return null;
        }
      default: break;
    }


    switch (query) {
      case "GET":
        return getJsonResultOnQueryGet(response, userId, typeCalc, isAdmin);

      case "SAVE":
        return getJsonResultOnQuerySave(response, userId, typeCalc, name, jsonElement);

      case "UPDATE":
        return getJsonResultOnQuerySave(response, userId, typeCalc, name, jsonElement, calcId);

      case "RES":
        return getJsonResultOnQueryRes(response, userId, typeCalc, name, jsonElement);

      case "DEL":
        return getJsonResultOnQueryDel(response, userId, calcId, isAdmin);

      default:
        response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'query'!!!");
        return null;
    }
  }

  private String getJsonResultOnQueryGet(HttpServletResponse response, Integer userId, String typeCalc, Boolean isAdmin)
      throws IOException {

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
      default:
        response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'typeCalc'!!!");
        return null;
    }
  }

  private Calc newCalc(Integer userId, String typeCalc, String name, JsonElement jsonElement) {
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
    if (newCalc != null) {
      newCalc.userId = userId;
      newCalc.type = typeCalc;
    }
    return newCalc;
  }

  private String getJsonResultOnQuerySave(HttpServletResponse response, Integer userId, String typeCalc, String name,
                                          JsonElement jsonElement) throws IOException {

    return getJsonResultOnQuerySave(response, userId, typeCalc, name, jsonElement, null);
  }
  private String getJsonResultOnQuerySave(HttpServletResponse response, Integer userId, String typeCalc, String name,
                                          JsonElement jsonElement, Integer calcId) throws IOException {

    if (getJsonResultOnQueryRes(response, userId, typeCalc, name, jsonElement).equals("Ошибка!")) {
      response.sendError(400, "Сервер не понял запрос. Не удалось произвести расчет данных. Проверьте правильность данных элементов калькулятора!!!");
      return null;
    }

    Calc newCalc = newCalc(userId, typeCalc, name, jsonElement);
    boolean isUpdate = false;
    if (calcId != null) {
      newCalc.calcId = calcId;
      isUpdate = true;
    }
    dbWorker.addUserCalc(newCalc, isUpdate);
    return new Gson().toJson(newCalc);
  }

  private String getJsonResultOnQueryRes(HttpServletResponse response, Integer userId, String typeCalc, String name, JsonElement jsonElement) throws IOException {

    String json = "", out = "";


    try {
      switch (typeCalc) {
        case "Осаго": {
          CalcOsago calc = new CalcOsago(name);
          Type listType = new TypeToken<List<ListValue>>() {}.getType();
          List<ListValue> list = new Gson().fromJson(jsonElement, listType);
          out = CalcOsago.getResult(calc.getDefaultResult(), list);
          json = new Gson().toJson(out);
        }
        break;
        case "Кредит":
        case "Ипотека": {
          Calc calc = null;
          Type listType = new TypeToken<List<Element>>() {}.getType();
          List<Element> list = new Gson().fromJson(jsonElement, listType);

          if (typeCalc.equals("Кредит")) {
            calc = new CalcCredit(name);
            json = CalcCredit.getResult(calc.getDefaultResult(), list);
          }
          else {
            calc = new CalcIpoteka(name);
            json = CalcIpoteka.getResult(calc.getDefaultResult(), list);
          }
        }
        break;
        default:
          response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'typeCalc'!!!");
          return null;
      }
    } catch (Exception e) {
      e.printStackTrace();
      response.sendError(400, "Сервер не понял запрос. Не удалось произвести расчет данных. Проверьте правильность данных элементов калькулятора!!!");
      return null;
    }
    return json;
  }

  private String getJsonResultOnQueryDel(HttpServletResponse response, Integer userId, Integer calcId, Boolean isAdmin) throws IOException {

    if (!isAdmin) {
      dbWorker.deleteCalc(userId, calcId);
      //defaultCalcs.remove(index);
      return new Gson().toJson("Успешно удалено!");
    }
    response.sendError(400, "Сервер не понял запрос. Удаление не произошло!!!");
    return null;
  }
}