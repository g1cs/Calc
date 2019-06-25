package ru.calc.servlets.servlet;

import ru.calc.db.DBWorkerWeb;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import ru.calc.model.Calc;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/getCalcFromThirdParty")
public class GetCalcFromThirdPartyServlet extends HttpServlet {

  private static DBWorkerWeb dbWorker;

  @Override
  public void init() throws ServletException {

    final Object dbWorker = getServletContext().getAttribute("dbWorker");

    if (dbWorker == null || !(dbWorker instanceof DBWorkerWeb)) {

      throw new IllegalStateException("dbWorker does not initialize!");
    } else {

      GetCalcFromThirdPartyServlet.dbWorker = (DBWorkerWeb) dbWorker;
    }
  }


  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    final JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
    Integer idCalc;

    try {
      idCalc = data.get("idCalc").getAsInt();
    } catch (Exception e) {
      response.sendError(400, "Сервер не понял запрос. Проверьте правильность переменной 'idCalc'!!!");
      return;
    }

    Calc calc = dbWorker.getCalcById(idCalc);
    response.getWriter().write(new Gson().toJson(calc));
  }
}

