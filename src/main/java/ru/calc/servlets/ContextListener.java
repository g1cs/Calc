package ru.calc.servlets;

import ru.calc.dao.UserDAO;
import ru.calc.db.DBWorker;
import ru.calc.model.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicReference;

import static ru.calc.model.User.ROLE.ADMIN;
import static ru.calc.model.User.ROLE.USER;

@WebListener
public class ContextListener implements ServletContextListener {
  /**
   * Fake database connector.
   */
  //private AtomicReference<UserDAO> users;
  private List<Calc> defaultCalcs;
  private List<Calc> calcs;

  private DBWorker dbWorker;


  private void addAdminCalcs() {
    final CalcOsago calcOsago = new CalcOsago("Калькулятор Осаго");
    calcOsago.init();
    calcOsago.userId = 1;
    dbWorker.addUserCalc(calcOsago);
    final CalcCredit calcCredit = new CalcCredit("Кредитный калькулятор");
    calcCredit.init();
    calcCredit.userId = 1;
    dbWorker.addUserCalc(calcCredit);
    final CalcIpoteka calcIpoteka = new CalcIpoteka("Ипотечный калькулятор");
    calcIpoteka.init();
    calcIpoteka.userId = 1;
    dbWorker.addUserCalc(calcIpoteka);
  }



  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {

    System.out.println("contextInitialized");
    dbWorker = new DBWorker();
    dbWorker.openConnection();

    defaultCalcs = new CopyOnWriteArrayList<>();
    calcs = new CopyOnWriteArrayList<>();

    //addAdminCalcs();

    defaultCalcs = dbWorker.getDefaultCalcs();

    final ServletContext servletContext =
        servletContextEvent.getServletContext();

    //servletContext.setAttribute("users", users);
    servletContext.setAttribute("defaultCalcs", defaultCalcs);
    servletContext.setAttribute("calcs", calcs);
    servletContext.setAttribute("dbWorker", dbWorker);
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {

    System.out.println("contextDestroyed");
    dbWorker.closeConnection();
  }
}