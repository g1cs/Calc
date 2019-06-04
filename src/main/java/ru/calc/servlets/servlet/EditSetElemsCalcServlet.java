//package ru.calc.servlets.servlet;
//
//import ru.calc.model.*;
//import ru.calc.model.Elements.*;
//
//import com.google.gson.Gson;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;
//import com.google.gson.reflect.TypeToken;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//import java.lang.reflect.Type;
//import java.util.ArrayList;
//import java.util.List;
//
//
//@WebServlet("/editSetElemsCalcs")
//public class EditSetElemsCalcServlet extends HttpServlet {
//
////  public static Calc calc;
//
//  @Override
//  protected void doGet(HttpServletRequest request, HttpServletResponse response)
//      throws ServletException, IOException {
//
//    System.out.println("PageIndexServlet_GET");
//    final HttpSession session = request.getSession();
//    final User.ROLE role = (User.ROLE) session.getAttribute("role");
//    System.out.println(role);
//
//    if (!role.equals(User.ROLE.UNKNOWN)) {
//
//      List<String> list = new ArrayList<>();
//      list.add("Осаго");
//      list.add("Кредит");
//      list.add("Вклады");
//      list.add("Ипотека");
//      list.add("Тариф сотовой связи");
//
//      response.setContentType("application/json");
//      response.setCharacterEncoding("UTF-8");
//      response.getWriter().write(new Gson().toJson(list));
//    }
//  }
//
//  @Override
//  protected void doPost(HttpServletRequest request, HttpServletResponse response)
//      throws ServletException, IOException {
//
//    System.out.println("PageIndexServlet_POST");
//    final HttpSession session = request.getSession();
//    final User.ROLE role = (User.ROLE) session.getAttribute("role");
//    System.out.println(role);
//
//    if (!role.equals(User.ROLE.UNKNOWN)) {
//      JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
//      String typeCalc = data.get("typeCalc").getAsString();
//      String query = data.get("query").getAsString();
//      String json = "";
//
//      System.out.println("typeCalc: " + typeCalc);
//      System.out.println("query: " + query);
//      switch (query) {
//        case "GET": {
//          switch (typeCalc) {
//            case "Осаго": {
//              CalcOsago calcOsago = new CalcOsago("OsagoCalc" + GetCalcServlet.calcs.size());
//              calcOsago.init();
//              json = new Gson().toJson(calcOsago);
//            }
//            break;
//            case "Кредит": {
//              CalcCredit calcCredit = new CalcCredit("CreditCalc" + GetCalcServlet.calcs.size());
//              calcCredit.init();
//              json = new Gson().toJson(calcCredit);
//              System.out.println(json);
//            }
//            break;
//            case "Вклады": {
//            }
//            break;
//            case "Ипотека": {
//            }
//            break;
//            default:
//              break;
//          }
//        }
//        break;
//        case "SET": {
//          JsonElement jsonElement = data.get("elems");
//          String name = data.get("name").getAsString();
//          Type listType = new TypeToken<List<Element>>() {
//          }.getType();
//          List<Element> elements = new Gson().fromJson(jsonElement, listType);
//          Calc newCalc = null;
//          switch (typeCalc) {
//            case "Осаго": {
//              newCalc = new CalcOsago(name);
//              newCalc.elements = elements;
//              GetCalcServlet.calcs.add(newCalc);
//            }
//            break;
//            case "Кредит": {
//              newCalc = new CalcCredit(name);
//              newCalc.elements = elements;
//              GetCalcServlet.calcs.add(newCalc);
//            }
//            break;
//            case "Вклады": {
//            }
//            break;
//            case "Ипотека": {
//            }
//            break;
//            default:
//              break;
//          }
//          json = new Gson().toJson(newCalc);
//        }
//        break;
//        case "RES": {
//          JsonElement jsonElement = data.get("list");
//          String name = data.get("name").getAsString();
//          String out = "";
//          System.out.println(jsonElement);
//
//          switch (typeCalc) {
//            case "Осаго": {
//              CalcOsago calc = new CalcOsago(name);
//              Type listType = new TypeToken<List<ListValue>>() {
//              }.getType();
//              List<ListValue> list = new Gson().fromJson(jsonElement, listType);
//              out = calc.getResult(calc.getDefaultResult(), list);
//              System.out.println(out);
//              json = new Gson().toJson(out);
//
//            }
//            break;
//            case "Кредит": {
//              CalcCredit calc = new CalcCredit(name);
//              Type listType = new TypeToken<List<Element>>() {
//              }.getType();
//              List<Element> list = new Gson().fromJson(jsonElement, listType);
//              json = calc.getResult(calc.getDefaultResult(), list);
//              System.out.println(json);
////            json = new Gson().toJson(out);
//            }
//            break;
//            case "Вклады": {
//            }
//            break;
//            case "Ипотека": {
//            }
//            break;
//            default:
//              break;
//          }
//
//        }
//        break;
//        default:
//          break;
//      }
//
//      response.setContentType("application/json");
//      response.setCharacterEncoding("UTF-8");
//      response.getWriter().write(json);
//    }
//  }
//}