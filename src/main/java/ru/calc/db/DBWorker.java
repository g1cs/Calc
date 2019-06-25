//package ru.calc.db;
//
//import ru.calc.model.Calc;
//import ru.calc.model.CalcCredit;
//import ru.calc.model.CalcOsago;
//import ru.calc.model.Elements.*;
//import ru.calc.model.User;
//
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.CopyOnWriteArrayList;
//
//import static java.util.Objects.nonNull;
//
////public class DBWorker1 {
////
////  private Connection connection = null;
////
////  //  private final String driverName = "com.mysql.jdbc.Driver";
//////  private final String DBHOST = "localhost";
//////  private final String DBPORT = "3306";
//////  private final String DBNAME = "dbcalc";
//////  private final String USERNAME = "root";
//////  private final String PASSWORD = "root_user";
//////  private final String URL = "jdbc:mysql://" + DBHOST + ":" + DBPORT + "/" + DBNAME + "?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
////  private DBSourse dbSourse;
////
////  public DBWorker() {
////    dbSourse = new DBSourse("org.postgresql.Driver", "postgresql",
////        "ec2-54-217-225-16.eu-west-1.compute.amazonaws.com", "5432",
////        "d74gvg78td3vu5","dbcalc", "efuohzbvovvzqo",
////        "eef7181ac74cb4d2908ad982708abb8e6518749010eec52202ea2379e3ad5128",
////        "?sslmode=require");
////
////    openConnection();
////  }
////
////  // открыть соединение с БД
////  public void openConnection() {
////    try {
////      Class.forName(dbSourse.DRIVER);
////    } catch (ClassNotFoundException e) {
////      System.out.println("Не удалось загрузить класс драйвера!");
////      e.printStackTrace();
////      return;
////    }
////
////
////    try {
////      connection = DriverManager.getConnection(dbSourse.URL, dbSourse.USER, dbSourse.PASSWORD);
////      if (!connection.isClosed())
////        System.out.println("Соединеие с БД установлено!");
////    } catch (SQLException e) {
////      System.out.println("Не удалось соединиться с БД!");
////      e.printStackTrace();
////    }
////  }
////
////  // закрыть соединение с БД
////  public void closeConnection() {
////    try {
////      connection.close();
////      if (connection.isClosed())
////        System.out.println("Соединеие с БД закрыто!");
////    } catch (SQLException e) {
////      System.out.println("Не удалось закрыть соединение с БД!");
////      e.printStackTrace();
////    }
////  }
////
////  // существует ли такой пользователь
////  public boolean userIsExist(final String login, final String password) {
////
////    if (login == null || password == null)
////      return false;
////    else
////      return nonNull(getUserByLoginPassword(login, password));
////  }
////
////  // получить пользователя по логину и паролю
////  public User getUserByLoginPassword(final String login, final String password) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.users WHERE login=\"%s\" and password=\"%s\";",
////          dbSourse.DB, dbSourse.SCHEMAS, login, password);
////      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
////      if(resultSet.next()) {
////        int role = resultSet.getInt("role");
////        int id = resultSet.getInt("iduser");
////        return new User(id, login, password, User.ROLE.values()[role]);
////      }
////    }
////    catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить id из users (L,P)!");
////    }
////    return null;
////  }
////  private Integer getIdUserByLogin(final String login) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.users WHERE login=\"%s\";",
////          dbSourse.DB, dbSourse.SCHEMAS, login);
////      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
////      if(resultSet.next())
////        return resultSet.getInt("iduser");
////    }
////    catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить id из users (L)!");
////    }
////    return null;
////  }
////
////
////
////  private String selectNameFromTypeCalc(Integer idTypeCalc) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.type_calc WHERE idtypecalc=\"%d\";",
////          dbSourse.DB, dbSourse.SCHEMAS, idTypeCalc);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if(resultSet.next())
////        return resultSet.getString("name");
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить id типа калькулятора из type_calc!");
////    }
////    return null;
////  }
////
////
////
////
////
////  public void deleteCalc(Integer userId, Integer index) {
////
////    List<Calc> calcs = getUserCalc(userId);
////    Integer calcId = calcs.get(index).calcId;
////
////    deleteFromListElements(calcId);
////    deleteFromUserCalc(calcId);
////    deleteFromCalc(calcId);
////  }
////
////  private void deleteFromListElements(Integer idCalc){
////
////    deleteFromElem(selectListIdElemsByIdCalc(idCalc));
////    try {
////      String query = String.format("DELETE FROM %s.%s.list_elements WHERE (idcalc = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteFromListElem: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из list_elements!");
////    }
////  }
////  private void deleteFromElem(List<Integer> list_idElem) {
////
////    deleteElemData(list_idElem);
////    for (Integer idElem : list_idElem) {
////      try {
////        String query = String.format("DELETE FROM %s.%s.public WHERE (idelem = '%d');",
////            dbSourse.DB, dbSourse.SCHEMAS, idElem);
////        Integer i = connection.createStatement().executeUpdate(query);
////        System.out.println("deleteFromElem: " + i);
////      } catch (SQLException e) {
////        e.printStackTrace();
////        System.out.println("Не удалось удалить из deleteFromElem!");
////      }
////    }
////  }
////  private void deleteElemData(List<Integer> list_idElem) {
////    for (Integer idElem : list_idElem) {
////      try {
////        String query = String.format("SELECT * FROM %s.%s.elem WHERE idelem=\"%d\";",
////            dbSourse.DB, dbSourse.SCHEMAS, idElem);
////        ResultSet resultSet = connection.createStatement().executeQuery(query);
////        while (resultSet.next()) {
////          Integer idTypeElem = resultSet.getInt("idtypeelem");
////          Integer idElemData = resultSet.getInt("idelemdata");
////
////          String typeElem = selectTypeElem(idTypeElem);
////          switch (typeElem)
////          {
////            case "input":
////            case "slider": {
////              deleteFromElemDataInputSelect(idElemData, typeElem);
////            } break;
////            case "radio":
////            case "select":
////            case "listCheckbox": {
////              deleteFromElemDataSelect(idElemData);
////            } break;
////          }
////        }
////      } catch (SQLException e) {
////        e.printStackTrace();
////        System.out.println("Не удалось получить калькулятор!");
////      }
////    }
////  }
////  private void deleteFromElemDataInputSelect(Integer idElemData, String typeElem) {
////    String id = (typeElem.equals("input")) ? "idelemdatainput" : "idelemdataselect";
////    String dbTable = "elem_data_" + typeElem;
////    try {
////      String query = String.format("DELETE FROM %s.%s.%s WHERE (%s = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, dbTable, id, idElemData);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteFromElemData_" + dbTable + ": " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из elem_data_" + dbTable + "!");
////    }
////  }
////  private void deleteFromElemDataSelect(Integer idElemData) {
////
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_data_select WHERE idelemdataselect='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next())
////        deleteListValue(resultSet.getInt("idlistvalues"));
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить элемент Select!");
////    }
////
////    try {
////      String query = String.format("DELETE FROM %s.%s.elem_data_select WHERE (idelemdataselect = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteFromElemDataSelect: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из elem_data_select!");
////    }
////  }
////  // получить список данных элемента
////  private void deleteListValue(Integer idListValues) {
////    List<ListValue> listValues = null;
////    try {
////      String query = String.format("SELECT * FROM %s.%s.list_values WHERE idlistvalues='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idListValues);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      while (resultSet.next())
////        deleteValues(resultSet.getInt("idvalue"));
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить список данных элемента!");
////    }
////
////    try {
////      String query = String.format("DELETE FROM %s.%s.list_values WHERE (idlistvalues = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idListValues);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteListValue: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из list_values!");
////    }
////  }
////  // получить данные элемента
////  private void deleteValues(Integer idValue) {
////    try {
////      String query = String.format("DELETE FROM %s.%s.values_data WHERE (idvalue = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idValue);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteValues: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из values_data!");
////    }
////  }
////  private void deleteFromCalc(Integer idCalc) {
////    try {
////      String query = String.format("DELETE FROM %s.%s.calc WHERE (idcalc = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteFromCalc: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из calc!");
////    }
////  }
////  private void deleteFromUserCalc(Integer idCalc) {
////    try {
////      String query = String.format("DELETE FROM %s.%s.user_calc WHERE (idcalc = '%d');",
////          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
////      Integer i = connection.createStatement().executeUpdate(query);
////      System.out.println("deleteFromUserCalc: " + i);
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось удалить из calc!");
////    }
////  }
////
////
////
////  // получить количество элементов
////  private Integer countFromElem(Statement statement) {
////    try {
////      String query = String.format("SELECT COUNT(*) AS 'num' FROM %s.%s.elem;", dbSourse.DB, dbSourse.SCHEMAS);
////
////      ResultSet resultSet = statement.executeQuery(query);
////
////      if(resultSet.next()) {
////        return resultSet.getInt("num");
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить количество элементов!");
////    }
////    return null;
////  }
////
////
////  public List<Calc> getDefaultCalcs() {
////    return getUserCalc("admin");
////  }
////  public List<Calc> getUserCalc(Integer idUser) {
////    List<Integer> idCalcs = selectListIdCalcsByIdUser(idUser);
////    List<Calc> calcs = selectListCalcsByListIdCalcs(idUser, idCalcs);
////    return calcs;
////  }
////  public List<Calc> getUserCalc(String userLogin) {
////    return getUserCalc(getIdUserByLogin(userLogin));
////  }
////  // получить список id-калькуляторов пользователя
////  private List<Integer> selectListIdCalcsByIdUser(Integer idUser) {
////    List<Integer> list_idCalc = null;
////    try {
////      String query = String.format("SELECT * FROM %s.%s.user_calc WHERE iduser='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idUser);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////      list_idCalc = new CopyOnWriteArrayList<>();
////      while (resultSet.next()) {
////        list_idCalc.add(resultSet.getInt("idcalc"));
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить список id калькуляторов пользователя из user_calc!");
////    }
////    return list_idCalc;
////  }
////  // получить пользовательские калькуляторы
////  private List<Calc> selectListCalcsByListIdCalcs(Integer idUser, List<Integer> list_idCalc) {
////
////    List<Calc> calcs = new CopyOnWriteArrayList<>();
////    for (Integer idCalc : list_idCalc) {
////      try {
////        String query = String.format("SELECT * FROM %s.%s.calc WHERE idcalc='%d';",
////            dbSourse.DB, dbSourse.SCHEMAS, idCalc);
////        ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////        while (resultSet.next()) {
////          String name = resultSet.getString("name");
////          Integer idTypeCalc = resultSet.getInt("idTypeCalc");
////          String typeCalc = selectNameFromTypeCalc(idTypeCalc);
////
////          Calc calc = selectCalcs(idCalc, typeCalc, name);
////          calc.calcId = idCalc;
////          calc.userId = idUser;
////          calcs.add(calc);
////        }
////      } catch (SQLException e) {
////        e.printStackTrace();
////        System.out.println("Не удалось получить список калькуляторов из calc!");
////      }
////    }
////    return calcs;
////  }
////  // получить калькулятор
////  private Calc selectCalcs(Integer idCalc, String typeCalc, String name) {
////    Calc calc;
////    switch (typeCalc) {
////      case "Осаго":   calc = new CalcOsago(name);
////      case "Кредит":  calc = new CalcCredit(name);
////      default:        calc = new Calc(name);
////    }
////    calc.type = typeCalc;
////    calc.elements = new CopyOnWriteArrayList<>();
////
////    List<Integer> list_idElem = selectListIdElemsByIdCalc(idCalc);
////    for (Integer idElem : list_idElem) {
////      try {
////        String query = String.format("SELECT * FROM %s.%s.elem WHERE idElem='%d';",
////            dbSourse.DB, dbSourse.SCHEMAS, idElem);
////        ResultSet resultSet = connection.createStatement().executeQuery(query);
////        while (resultSet.next()) {
////          String idName = resultSet.getString("idName");
////          Integer idTypeElem = resultSet.getInt("idTypeElem");
////          Integer idElemData = resultSet.getInt("idElemData");
////          Integer idElemName = resultSet.getInt("idElemName");
////
////          String typeElem = selectTypeElem(idTypeElem);
////          String nameElem = selectNameElem(idElemName);
////          switch (typeElem)
////          {
////            case "input": {
////              calc.elements.add(selectElemDataInput(idName, nameElem, typeElem, idElemData));
////            } break;
////            case "radio":
////            case "select":
////            case "listCheckbox": {
////              calc.elements.add(selectElemDataSelect(idName, nameElem, typeElem, idElemData));
////            } break;
////            case "slider": {
////              calc.elements.add(selectElemDataSlider(idName, nameElem, typeElem, idElemData));
////            } break;
////          }
////        }
////      } catch (SQLException e) {
////        e.printStackTrace();
////        System.out.println("Не удалось получить калькулятор из elem!");
////      }
////    }
////    return calc;
////  }
////  // получить список id-элементов
////  private List<Integer> selectListIdElemsByIdCalc(Integer idCalc) {
////    List<Integer> listIdElems = null;
////    try {
////      String query = String.format("SELECT * FROM %s.%s.list_elements WHERE idCalc='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      listIdElems = new CopyOnWriteArrayList<>();
////      while (resultSet.next()) {
////        listIdElems.add(resultSet.getInt("idElem"));
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из list_elements!");
////    }
////    return listIdElems;
////  }
////  // получить тип элемента
////  private String selectTypeElem(Integer idTypeElem) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.type_elem WHERE idTypeElem='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idTypeElem);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next())
////        return resultSet.getString("name");
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из type_elem!");
////    }
////    return null;
////  }
////  // получить название элемента
////  private String selectNameElem(Integer idElemName) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_name WHERE idElemName='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemName);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next())
////        return resultSet.getString("name");
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из elem_name!");
////    }
////    return null;
////  }
////  // получить элемент (Input)
////  private Element selectElemDataInput(String idName, String nameElem, String typeElem, Integer idElemData) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_data_input WHERE idElemDataInput='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next()) {
////        String text = resultSet.getString("text");
////        Double value = resultSet.getDouble("value");
////        return new Element(idName, nameElem, typeElem, new ElementInfoInput(text, value));
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из elem_data_input!");
////    }
////    return null;
////  }
////  // получить элемент (Slider)
////  private Element selectElemDataSlider(String idName, String nameElem, String typeElem, Integer idElemData) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_data_slider WHERE idElemDataSlider='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next()) {
////        String text = resultSet.getString("text");
////        Double value = resultSet.getDouble("value");
////        Double minValue = resultSet.getDouble("minValue");
////        Double maxValue = resultSet.getDouble("maxValue");
////        return new Element(idName, nameElem, typeElem, new ElementInfoSlider(text, value, minValue, maxValue));
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из elem_data_slider!");
////    }
////    return null;
////  }
////  // получить элемент (Select)
////  private Element selectElemDataSelect(String idName, String nameElem, String typeElem, Integer idElemData) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_data_select WHERE idElemDataSelect='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next()) {
////        String text = resultSet.getString("text");
////        Double value = resultSet.getDouble("value");
////        Integer idListValues = resultSet.getInt("idListValues");
////
////        List<ListValue> list = selectListValue(idListValues);
////        return new Element(idName, nameElem, typeElem, new ElementInfoSelect(text, list, value));
////      }
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из elem_data_select!");
////    }
////    return null;
////  }
////  // получить список данных элемента
////  private List<ListValue> selectListValue(Integer idListValues) {
////    List<ListValue> listValues = null;
////    try {
////      String query = String.format("SELECT * FROM %s.%s.list_values WHERE idListValues='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idListValues);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      listValues = new ArrayList<>();
////      while (resultSet.next())
////        listValues.add(selectValues(resultSet.getInt("idValue")));
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из list_values!");
////    }
////    return listValues;
////  }
////  // получить данные элемента
////  private ListValue selectValues(Integer idValue) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.values_data WHERE idValue='%d';",
////          dbSourse.DB, dbSourse.SCHEMAS, idValue);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////      if (resultSet.next())
////        return new ListValue(resultSet.getString("name"), resultSet.getDouble("value"));
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из values_data!");
////    }
////    return null;
////  }
////
////
////
////  // процедура добавления калькулятора
////  // добавить элементы калькулятора
////  //    получить тип элемента idTypeElem
////  //    вставить Elem (название, тип элемента) и получиь idElem
////  //        (idElemInfo = idElem)
////  //    втавить ElemInfo<Name> (text, value и т.д.), где Name - (Input, Select и т.д.) и получить idElemInfo
////  //    вставить ElemInfo (idElem, idTypeElem, idElemInfo)
////  // добавить калькулятор
////  //    вставить калькулятор (idTypecalc, idElem) и получить idCalc
////  // добавить пользовательский калькулятор
////  //    вставить userCalc (idUser, idCalc)
////  public void addUserCalc(Calc calc) {
////    Integer idTypeCalc = selectFromTypeCalc(calc.type);
////    Integer idCalc = insertToCalc(calc.name, idTypeCalc);
////
////    for (Element elem : calc.elements) {
////      Integer idTypeElem = selectFromTypeElem(elem.type);
////      Integer idElemName = selectFromElemName(elem.name);
////      Integer idElemData = 0;
////      switch (elem.type) {
////        case "input": {
////          idElemData = insertToElemDataInput((ElementInfoInput) elem.info);
////        } break;
////        case "radio":
////        case "select":
////        case "listCheckbox": {
////          idElemData = insertToElemDataSelect((ElementInfoSelect) elem.info);
////        } break;
////        case "slider": {
////          idElemData = insertToElemDataSlider((ElementInfoSlider) elem.info);
////
////        } break;
////      }
////      Integer idElem = insertToElem(elem.idName, idTypeElem, idElemData, idElemName);
////      insertToListElems(idCalc, idElem);
////    }
////    insertToUserCalc(calc.userId, idCalc);
////  }
////  // получить тип элемента
////  private Integer selectFromTypeCalc(String typeCalc) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.type_calc WHERE name='%s';",
////          dbSourse.DB, dbSourse.SCHEMAS, typeCalc);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////      if(resultSet.next())
////        return resultSet.getInt("idTypeCalc");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить id типа калькулятора из type_calc!");
////    }
////    return null;
////  }
////  // вставить калькулятор
////  private Integer insertToCalc(String nameCalc, Integer idTypeCalc) {
////    try {
////      String query = "INSERT INTO ?.?.calc (name, idTypeCalc) VALUES(?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setString(3, nameCalc);
////      ps.setInt(4, idTypeCalc);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.calc limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if (resultSet.next())
////        return resultSet.getInt("id");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в calc!");
////    }
////    return null;
////  }
////  // получить тип элемента
////  private Integer selectFromTypeElem(String typeElem) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.type_elem WHERE name='%s';",
////          dbSourse.DB, dbSourse.SCHEMAS, typeElem);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////      if(resultSet.next())
////        return resultSet.getInt("idTypeElem");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из type_elem!");
////    }
////    return null;
////  }
////  // получить название элемента
////  private Integer selectFromElemName(String elemName) {
////    try {
////      String query = String.format("SELECT * FROM %s.%s.elem_name WHERE name='%s'",
////          dbSourse.DB, dbSourse.SCHEMAS, elemName);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////      if(resultSet.next())
////        return resultSet.getInt("idElemName");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить из elem_name!");
////    }
////    return null;
////  }
////  // вставить данные элемента (input)
////  private Integer insertToElemDataInput(ElementInfoInput elementInfoInput) {
////    try {
////      String query = "INSERT INTO ?.?.elem_data_input (text, value) values(?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setString(3, elementInfoInput.text);
////      ps.setDouble(4, elementInfoInput.value);
////      ps.execute();
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.elem_data_input limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if (resultSet.next())
////        return resultSet.getInt("id");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в elem_data_input!");
////    }
////    return null;
////  }
////  // вставить данные элемента (slider)
////  private Integer insertToElemDataSlider(ElementInfoSlider elementInfoSlider){
////    try {
////      String query = "INSERT INTO ?.?.elem_data_slider (`text`, `value`, `minValue`, `maxValue`) values(?,?,?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setString(3, elementInfoSlider.text);
////      ps.setDouble(4, elementInfoSlider.value);
////      ps.setDouble(5, elementInfoSlider.minValue);
////      ps.setDouble(6, elementInfoSlider.maxValue);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.elem_data_slider limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if (resultSet.next())
////        return resultSet.getInt("id");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в elem_data_slider!");
////    }
////    return null;
////  }
////  // вставить данные элемента (select)
////  private Integer insertToElemDataSelect(ElementInfoSelect elementInfoSelect){
////
////    Integer idListValues = countFromListValues();
////    idListValues++;
////    List<Integer> list_idValue = insertToValues(elementInfoSelect.list);
////    insertToListValues(idListValues, list_idValue);
////
////    try {
////      String query = "INSERT INTO ?.?.elem_data_select (text, value, idListValues) values(?,?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setString(3, elementInfoSelect.text);
////      ps.setDouble(4, elementInfoSelect.value);
////      ps.setInt(5, idListValues);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.elem_data_select limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if (resultSet.next())
////        return resultSet.getInt("id");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в elem_data_select!");
////    }
////    return null;
////  }
////  // получить количество элементов
////  private Integer countFromListValues() {
////    try {
////      String query = String.format("SELECT count(DISTINCT idListValues) AS 'num' FROM %s.%s.list_values;",
////          dbSourse.DB, dbSourse.SCHEMAS);
////      ResultSet resultSet = connection.createStatement().executeQuery(query);
////
////      if(resultSet.next())
////        return resultSet.getInt("num");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось получить count(DISTINCT idListValues) из list_values!");
////    }
////    return null;
////  }
////  // вставить даныые элемента
////  private List<Integer> insertToValues(List<ListValue> listValues) {
////
////    try {
////      List<Integer> list = new CopyOnWriteArrayList<>();
////      for (ListValue listValue : listValues) {
////        String query = "INSERT INTO ?.?.values_data (name, value) VALUES (?,?);";
////        PreparedStatement ps = connection.prepareStatement(query);
////        ps.setString(1, dbSourse.DB);
////        ps.setString(2, dbSourse.SCHEMAS);
////        ps.setString(3, listValue.name);
////        ps.setDouble(4, listValue.value);
////        ps.execute();
////        ResultSet resultSet = connection.createStatement()
////            .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.values_data limit 1",
////                dbSourse.DB, dbSourse.SCHEMAS));
////        resultSet.next();
////        list.add(resultSet.getInt("id"));
////      }
////      return list;
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в values_data!");
////    }
////    return null;
////  }
////  // вставить даныые элемента
////  private Boolean insertToListValues(Integer idListValues, List<Integer> list_idValue) {
////    try {
////      for (Integer idValue : list_idValue) {
////        String query = "INSERT INTO ?.?.list_values (idListValues, idValue) VALUES (?,?);";
////        PreparedStatement ps = connection.prepareStatement(query);
////        ps.setString(1, dbSourse.DB);
////        ps.setString(2, dbSourse.SCHEMAS);
////        ps.setInt(3, idListValues);
////        ps.setInt(4, idValue);
////        ps.execute();
////      }
////      return true;
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в list_values!");
////    }
////    return false;
////  }
////  // вставка элемента
////  private Integer insertToElem(String idName, Integer idTypeElem, Integer idElemData, Integer idElemName) {
////    try {
////      String query = "INSERT INTO ?.?.elem (`idName`, `idTypeElem`, `idElemData`,`idElemName`) VALUES (?,?,?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setString(3, idName);
////      ps.setInt(4, idTypeElem);
////      ps.setInt(5, idElemData);
////      ps.setInt(6, idElemName);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.elem limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if (resultSet.next())
////        return resultSet.getInt("id");
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в elem!");
////    }
////    return null;
////  }
////  private Boolean insertToListElems(Integer idCalc, Integer idElem) {
////    try {
////      String query = "INSERT INTO ?.?.list_elements (idCalc, idElem) VALUES (?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setInt(3, idCalc);
////      ps.setInt(4, idElem);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.list_elements limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if(resultSet.next())
////        return true;
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в list_elements!");
////    }
////    return false;
////  }
////  private Boolean insertToUserCalc(Integer idUser, Integer idCalc) {
////    try {
////      String query = "INSERT INTO ?.?.user_calc (idUser, idCalc) VALUES (?,?);";
////      PreparedStatement ps = connection.prepareStatement(query);
////      ps.setString(1, dbSourse.DB);
////      ps.setString(2, dbSourse.SCHEMAS);
////      ps.setInt(3, idUser);
////      ps.setInt(4, idCalc);
////      ps.execute();
////
////      ResultSet resultSet = connection.createStatement()
////          .executeQuery(String.format("Select LAST_INSERT_ID() AS id from %s.%s.user_calc limit 1",
////              dbSourse.DB, dbSourse.SCHEMAS));
////      if(resultSet.next())
////        return true;
////
////    } catch (SQLException e) {
////      e.printStackTrace();
////      System.out.println("Не удалось вставить в user_calc!");
////    }
////    return false;
////  }
////
////}
//public class DBWorker {
//
//  private Connection connection = null;
//
//  //  private final String driverName = "com.mysql.jdbc.Driver";
////  private final String DBHOST = "localhost";
////  private final String DBPORT = "3306";
////  private final String DBNAME = "dbcalc";
////  private final String USERNAME = "root";
////  private final String PASSWORD = "root_user";
////  private final String URL = "jdbc:mysql://" + DBHOST + ":" + DBPORT + "/" + DBNAME + "?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
//  private DBSourse dbSourse;
//
//  public DBWorker() {
//    dbSourse = new DBSourse("com.mysql.jdbc.Driver", "mysql","localhost", "3306",
//        "dbcalc", "root", "root_user",
//        "?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC");
//
////    dbSourse = new DBSourse("org.postgresql.Driver", "postgresql",
////        "ec2-54-217-225-16.eu-west-1.compute.amazonaws.com", "5432",
////        "d74gvg78td3vu5","efuohzbvovvzqo",
////        "eef7181ac74cb4d2908ad982708abb8e6518749010eec52202ea2379e3ad5128", "?sslmode=require");
//
//    openConnection();
//  }
//
//  // открыть соединение с БД
//  public void openConnection() {
//    try {
//      Class.forName(dbSourse.DRIVER);
//    } catch (ClassNotFoundException e) {
//      System.out.println("Не удалось загрузить класс драйвера!");
//      e.printStackTrace();
//      return;
//    }
//
//    try {
//      connection = DriverManager.getConnection(dbSourse.URL, dbSourse.USER, dbSourse.PASSWORD);
//      if (!connection.isClosed())
//        System.out.println("Соединеие с БД установлено!");
//    } catch (SQLException e) {
//      System.out.println("Не удалось соединиться с БД!");
//      e.printStackTrace();
//    }
//  }
//
//  // закрыть соединение с БД
//  public void closeConnection() {
//    try {
//      connection.close();
//      if (connection.isClosed())
//        System.out.println("Соединеие с БД закрыто!");
//    } catch (SQLException e) {
//      System.out.println("Не удалось закрыть соединение с БД!");
//      e.printStackTrace();
//    }
//  }
//
//  // существует ли такой пользователь
//  public boolean userIsExist(final String login, final String password) {
//
//    if (login == null || password == null)
//      return false;
//    else
//      return nonNull(getUserByLoginPassword(login, password));
//  }
//
//  // получить пользователя по логину и паролю
//  public User getUserByLoginPassword(final String login, final String password) {
//
//    String query = String.format("SELECT * FROM users WHERE login=\"%s\" and password=\"%s\";",
//        login, password);
//    try {
//      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
//
//      if(resultSet.next()) {
//        int role = resultSet.getInt("role");
//        int id = resultSet.getInt("iduser");
//        return new User(id, login, password, User.ROLE.values()[role]);
//      }
//    }
//    catch (SQLException e) {
//      e.printStackTrace();
//    }
//    return null;
//  }
//  private Integer getIdUserByLogin(final String login) {
//    try {
//      String query = String.format("SELECT * FROM users WHERE login=\"%s\";", login);
//      //String query = String.format("SELECT * FROM `%s`.`public` WHERE login=\"%s\";", dbSourse.NAME, login);
//      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
//      if(resultSet.next()) {
//        return resultSet.getInt("idUser");
//      }
//    }
//    catch (SQLException e) {
//      e.printStackTrace();
//    }
//    return null;
//  }
//
//
//
//
//  private String selectNameFromTypeCalc(Integer idTypeCalc) {
//    try {
//      String query = String.format("SELECT * FROM type_calc WHERE idTypeCalc=\"%d\";", idTypeCalc);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      if(resultSet.next()) {
//        return resultSet.getString("name");
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить id типа калькулятора из БД!");
//    }
//    return null;
//  }
//
//
//
//
//  public void deleteCalc(Integer userId, Integer index) {
//
//    List<Calc> calcs = getUserCalc(userId);
//    Integer calcId = calcs.get(index).calcId;
//
//    deleteFromListElements(calcId);
//    deleteFromUserCalc(calcId);
//    deleteFromCalc(calcId);
//  }
//
//  private void deleteFromListElements(Integer idCalc){
//
//    deleteFromElem(selectListIdElemsByIdCalc(idCalc));
//
//    try {
//      String query = String.format("DELETE FROM `list_elements` WHERE (`idCalc` = '%d');", idCalc);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteFromListElem: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из list_elements!");
//    }
//  }
//  private void deleteFromElem(List<Integer> list_idElem) {
//
//    deleteElemData(list_idElem);
//
//    for (Integer idElem : list_idElem) {
//      try {
//        String query = String.format("DELETE FROM `%s`.`public` WHERE (`idElem` = '%d');", idElem);
//        Integer i = connection.createStatement().executeUpdate(query);
//        System.out.println("deleteFromElem: " + i);
//      } catch (SQLException e) {
//        e.printStackTrace();
//        System.out.println("Не удалось удалить из deleteFromElem!");
//      }
//    }
//  }
//  private void deleteElemData(List<Integer> list_idElem) {
//    for (Integer idElem : list_idElem) {
//      try {
//        String query = String.format("SELECT * FROM elem WHERE idElem=\"%d\";", idElem);
//        ResultSet resultSet = connection.createStatement().executeQuery(query);
//        while (resultSet.next()) {
//          Integer idTypeElem = resultSet.getInt("idTypeElem");
//          Integer idElemData = resultSet.getInt("idElemData");
//
//          String typeElem = selectTypeElem(idTypeElem);
//          switch (typeElem)
//          {
//            case "input":
//            case "slider": {
//              deleteFromElemDataInputSelect(idElemData, typeElem);
//            } break;
//            case "radio":
//            case "select":
//            case "listCheckbox": {
//              deleteFromElemDataSelect(idElemData);
//            } break;
//          }
//        }
//      } catch (SQLException e) {
//        e.printStackTrace();
//        System.out.println("Не удалось получить калькулятор!");
//      }
//    }
//  }
//  private void deleteFromElemDataInputSelect(Integer idElemData, String typeElem) {
//    String id = (typeElem.equals("input")) ? "idElemDataInput" : "idElemDataSelect";
//    String dbTable = "elem_data_" + typeElem;
//    try {
//      String query = String.format("DELETE FROM `%s` WHERE (`%s` = '%d');", dbTable, id, idElemData);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteFromElemData_" + dbTable + ": " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из elem_data_" + dbTable + "!");
//    }
//  }
//  private void deleteFromElemDataSelect(Integer idElemData) {
//
//    try {
//      String query = String.format("SELECT * FROM elem_data_select WHERE idElemDataSelect=\"%d\";", idElemData);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        deleteListValue(resultSet.getInt("idListValues"));
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить элемент Select!");
//    }
//
//    try {
//      String query = String.format("DELETE FROM `elem_data_select` WHERE (`idElemDataSelect` = '%d');", idElemData);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteFromElemDataSelect: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из elem_data_select!");
//    }
//  }
//  // получить список данных элемента
//  private void deleteListValue(Integer idListValues) {
//    List<ListValue> listValues = null;
//    try {
//      String query = String.format("SELECT * FROM list_values WHERE idListValues=\"%d\";", idListValues);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      while (resultSet.next())
//        deleteValues(resultSet.getInt("idValue"));
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список данных элемента!");
//    }
//
//    try {
//      String query = String.format("DELETE FROM `list_values` WHERE (`idListValues` = '%d');", idListValues);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteListValue: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из list_values!");
//    }
//  }
//  // получить данные элемента
//  private void deleteValues(Integer idValue) {
//    try {
//      String query = String.format("DELETE FROM `values_data` WHERE (`idValue` = '%d');", idValue);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteValues: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из values_data!");
//    }
//  }
//  private void deleteFromCalc(Integer idCalc) {
//    try {
//      String query = String.format("DELETE FROM `calc` WHERE (`idCalc` = '%d');", idCalc);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteFromCalc: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из calc!");
//    }
//  }
//  private void deleteFromUserCalc(Integer idCalc) {
//    try {
//      String query = String.format("DELETE FROM `user_calc` WHERE (`idCalc` = '%d');", idCalc);
//      Integer i = connection.createStatement().executeUpdate(query);
//      System.out.println("deleteFromUserCalc: " + i);
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось удалить из calc!");
//    }
//  }
//
//
//
//
//  // получить количество элементов
//  private Integer countFromElem(Statement statement) {
//    try {
//      String query = String.format("SELECT COUNT(*) AS \"num\" FROM elem;");
//
//      ResultSet resultSet = statement.executeQuery(query);
//
//      if(resultSet.next()) {
//        return resultSet.getInt("num");
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить количество элементов!");
//    }
//    return null;
//  }
//
//
//  public List<Calc> getDefaultCalcs() {
//    return getUserCalc("admin");
//  }
//
//  public List<Calc> getUserCalc(Integer idUser) {
//
//    List<Integer> idCalcs = selectListIdCalcsByIdUser(idUser);
//    List<Calc> calcs = selectListCalcsByListIdCalcs(idUser, idCalcs);
//    return calcs;
//  }
//  public List<Calc> getUserCalc(String userLogin) {
//
//    return getUserCalc(getIdUserByLogin(userLogin));
//  }
//  // получить список id-калькуляторов пользователя
//  private List<Integer> selectListIdCalcsByIdUser(Integer idUser) {
//
//    List<Integer> list_idCalc = null;
//    try {
//      String query = String.format("SELECT * FROM user_calc WHERE idUser=\"%d\";", idUser);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      list_idCalc = new CopyOnWriteArrayList<>();
//      while (resultSet.next()) {
//        list_idCalc.add(resultSet.getInt("idCalc"));
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список id калькуляторов пользователя!");
//    }
//    return list_idCalc;
//  }
//
//
//  public Calc selectCalcByIdCalcs(Integer idCalc) {
//    try {
//      String query = String.format("SELECT * FROM calc WHERE idCalc='%d';", idCalc);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      while (resultSet.next()) {
//        String name = resultSet.getString("name");
//        Integer idTypeCalc = resultSet.getInt("idTypeCalc");
//        String typeCalc = selectNameFromTypeCalc(idTypeCalc);
//
//        Calc calc = selectCalcs(idCalc, typeCalc, name);
//        calc.calcId = idCalc;
//        return calc;
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список калькуляторов!");
//    }
//    return null;
//  }
//  // получить пользовательские калькуляторы
//  private List<Calc> selectListCalcsByListIdCalcs(Integer idUser, List<Integer> list_idCalc) {
//
//    List<Calc> calcs = new CopyOnWriteArrayList<>();
//    for (Integer idCalc : list_idCalc) {
//      Calc calc = selectCalcByIdCalcs(idCalc);
//      if (calc != null)
//        calcs.add(calc);
//    }
//    return calcs;
//  }
//  // получить калькулятор
//  private Calc selectCalcs(Integer idCalc, String typeCalc, String name) {
//    Calc calc;
//    switch (typeCalc) {
//      case "Осаго":   calc = new CalcOsago(name);
//      case "Кредит":  calc = new CalcCredit(name);
//      default:        calc = new Calc(name);
//    }
//    calc.type = typeCalc;
//    calc.elements = new CopyOnWriteArrayList<>();
//
//    List<Integer> list_idElem = selectListIdElemsByIdCalc(idCalc);
//    for (Integer idElem : list_idElem) {
//      try {
//        String query = String.format("SELECT * FROM elem WHERE idElem=\"%d\";", idElem);
//        ResultSet resultSet = connection.createStatement().executeQuery(query);
//        while (resultSet.next()) {
//          String idName = resultSet.getString("idName");
//          Integer idTypeElem = resultSet.getInt("idTypeElem");
//          Integer idElemData = resultSet.getInt("idElemData");
//          Integer idElemName = resultSet.getInt("idElemName");
//
//          String typeElem = selectTypeElem(idTypeElem);
//          String nameElem = selectNameElem(idElemName);
//          switch (typeElem)
//          {
//            case "input": {
//              calc.elements.add(selectElemDataInput(idName, nameElem, typeElem, idElemData));
//            } break;
//            case "radio":
//            case "select":
//            case "listCheckbox": {
//              calc.elements.add(selectElemDataSelect(idName, nameElem, typeElem, idElemData));
//            } break;
//            case "slider": {
//              calc.elements.add(selectElemDataSlider(idName, nameElem, typeElem, idElemData));
//            } break;
//          }
//        }
//      } catch (SQLException e) {
//        e.printStackTrace();
//        System.out.println("Не удалось получить калькулятор!");
//      }
//    }
//    return calc;
//  }
//  // получить список id-элементов
//  private List<Integer> selectListIdElemsByIdCalc(Integer idCalc) {
//    List<Integer> listIdElems = null;
//    try {
//      String query = String.format("SELECT * FROM list_elements WHERE idCalc=\"%d\";", idCalc);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      listIdElems = new CopyOnWriteArrayList<>();
//      while (resultSet.next()) {
//        listIdElems.add(resultSet.getInt("idElem"));
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список id-элементов!");
//    }
//    return listIdElems;
//  }
//  // получить тип элемента
//  private String selectTypeElem(Integer idTypeElem) {
//    try {
//      String query = String.format("SELECT * FROM type_elem WHERE idTypeElem=\"%d\";", idTypeElem);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        return resultSet.getString("name");
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return null;
//  }
//  // получить название элемента
//  private String selectNameElem(Integer idElemName) {
//    try {
//      String query = String.format("SELECT * FROM elem_name WHERE idElemName=\"%d\";", idElemName);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        return resultSet.getString("name");
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить название элемента!");
//    }
//    return null;
//  }
//  // получить элемент (Input)
//  private Element selectElemDataInput(String idName, String nameElem, String typeElem, Integer idElemData) {
//    try {
//      String query = String.format("SELECT * FROM elem_data_input WHERE idElemDataInput=\"%d\";", idElemData);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next()) {
//        String text = resultSet.getString("text");
//        Double value = resultSet.getDouble("value");
//        return new Element(idName, nameElem, typeElem, new ElementInfoInput(text, value));
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить элемент Input!");
//    }
//    return null;
//  }
//  // получить элемент (Slider)
//  private Element selectElemDataSlider(String idName, String nameElem, String typeElem, Integer idElemData) {
//    try {
//      String query = String.format("SELECT * FROM elem_data_slider WHERE idElemDataSlider=\"%d\";", idElemData);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next()) {
//        String text = resultSet.getString("text");
//        Double value = resultSet.getDouble("value");
//        Double minValue = resultSet.getDouble("minValue");
//        Double maxValue = resultSet.getDouble("maxValue");
//        return new Element(idName, nameElem, typeElem, new ElementInfoSlider(text, value, minValue, maxValue));
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить элемент Slider!");
//    }
//    return null;
//  }
//  // получить элемент (Select)
//  private Element selectElemDataSelect(String idName, String nameElem, String typeElem, Integer idElemData) {
//    try {
//      String query = String.format("SELECT * FROM elem_data_select WHERE idElemDataSelect=\"%d\";", idElemData);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next()) {
//        String text = resultSet.getString("text");
//        Double value = resultSet.getDouble("value");
//        Integer idListValues = resultSet.getInt("idListValues");
//
//        List<ListValue> list = selectListValue(idListValues);
//        return new Element(idName, nameElem, typeElem, new ElementInfoSelect(text, list, value));
//      }
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить элемент Select!");
//    }
//    return null;
//  }
//  // получить список данных элемента
//  private List<ListValue> selectListValue(Integer idListValues) {
//    List<ListValue> listValues = null;
//    try {
//      String query = String.format("SELECT * FROM list_values WHERE idListValues=\"%d\";", idListValues);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      listValues = new ArrayList<>();
//      while (resultSet.next())
//        listValues.add(selectValues(resultSet.getInt("idValue")));
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список данных элемента!");
//    }
//    return listValues;
//  }
//  // получить данные элемента
//  private ListValue selectValues(Integer idValue) {
//    try {
//      String query = String.format("SELECT * FROM values_data WHERE idValue=\"%d\";", idValue);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        return new ListValue(resultSet.getString("name"), resultSet.getDouble("value"));
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить данные элемента!");
//    }
//    return null;
//  }
//
//
//
//  // процедура добавления калькулятора
//  // добавить элементы калькулятора
//  //    получить тип элемента idTypeElem
//  //    вставить Elem (название, тип элемента) и получиь idElem
//  //        (idElemInfo = idElem)
//  //    втавить ElemInfo<Name> (text, value и т.д.), где Name - (Input, Select и т.д.) и получить idElemInfo
//  //    вставить ElemInfo (idElem, idTypeElem, idElemInfo)
//  // добавить калькулятор
//  //    вставить калькулятор (idTypecalc, idElem) и получить idCalc
//  // добавить пользовательский калькулятор
//  //    вставить userCalc (idUser, idCalc)
//  public void addUserCalc(Calc calc) {
//    Integer idTypeCalc = selectFromTypeCalc(calc.type);
//    Integer idCalc = insertToCalc(calc.name, idTypeCalc);
//
//    for (Element elem : calc.elements) {
//      Integer idTypeElem = selectFromTypeElem(elem.type);
//      Integer idElemName = selectFromElemName(elem.name);
//      Integer idElemData = 0;
//      switch (elem.type) {
//        case "input": {
//          idElemData = insertToElemDataInput((ElementInfoInput) elem.info);
//        } break;
//        case "radio":
//        case "select":
//        case "listCheckbox": {
//          idElemData = insertToElemDataSelect((ElementInfoSelect) elem.info);
//        } break;
//        case "slider": {
//          idElemData = insertToElemDataSlider((ElementInfoSlider) elem.info);
//
//        } break;
//      }
//      Integer idElem = insertToElem(elem.idName, idTypeElem, idElemData, idElemName);
//      insertToListElems(idCalc, idElem);
//    }
//    insertToUserCalc(calc.userId, idCalc);
//  }
//  // получить тип элемента
//  private Integer selectFromTypeCalc(String typeCalc) {
//    try {
//      String query = String.format("SELECT * FROM type_calc WHERE name=\"%s\";", typeCalc);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      if(resultSet.next())
//        return resultSet.getInt("idTypeCalc");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить id типа калькулятора из БД!");
//    }
//    return null;
//  }
//  // вставить калькулятор
//  private Integer insertToCalc(String nameCalc, Integer idTypeCalc) {
//    try {
//      String query = "INSERT INTO calc (name, idTypeCalc) VALUES(?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setString(1, nameCalc);
//      ps.setInt(2, idTypeCalc);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement().executeQuery("Select LAST_INSERT_ID() AS id from calc limit 1");
//      if (resultSet.next())
//        return resultSet.getInt("id");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось вставить калькулятор в БД!");
//    }
//    return null;
//  }
//  // получить тип элемента
//  private Integer selectFromTypeElem(String typeElem) {
//    try {
//      String query = String.format("SELECT * FROM type_elem WHERE name=\"%s\";", typeElem);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      if(resultSet.next())
//        return resultSet.getInt("idTypeElem");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return null;
//  }
//  // получить название элемента
//  private Integer selectFromElemName(String elemName) {
//    try {
//      String query = String.format("SELECT * FROM elem_name WHERE name=\"%s\"", elemName);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      if(resultSet.next())
//        return resultSet.getInt("idElemName");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return null;
//  }
//  // вставить данные элемента (input)
//  private Integer insertToElemDataInput(ElementInfoInput elementInfoInput) {
//    try {
//      String query = "INSERT INTO elem_data_input (text, value) values(?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setString(1, elementInfoInput.text);
//      ps.setDouble(2, elementInfoInput.value);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from elem_data_input limit 1");
//      if (resultSet.next())
//        return resultSet.getInt("id");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось id данных элемента input!");
//    }
//    return null;
//  }
//  // вставить данные элемента (slider)
//  private Integer insertToElemDataSlider(ElementInfoSlider elementInfoSlider){
//    try {
//      String query = "INSERT INTO `elem_data_slider` (`text`, `value`, `minValue`, `maxValue`) values(?,?,?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setString(1, elementInfoSlider.text);
//      ps.setDouble(2, elementInfoSlider.value);
//      ps.setDouble(3, elementInfoSlider.minValue);
//      ps.setDouble(4, elementInfoSlider.maxValue);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from elem_data_slider limit 1");
//      if (resultSet.next())
//        return resultSet.getInt("id");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось id данных элемента slider!");
//    }
//    return null;
//  }
//  // вставить данные элемента (select)
//  private Integer insertToElemDataSelect(ElementInfoSelect elementInfoSelect){
//
//    Integer idListValues = countFromListValues();
//    idListValues++;
//    List<Integer> list_idValue = insertToValues(elementInfoSelect.list);
//    insertToListValues(idListValues, list_idValue);
//
//    try {
//      String query = "INSERT INTO elem_data_select (text, value, idListValues) values(?,?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setString(1, elementInfoSelect.text);
//      ps.setDouble(2, elementInfoSelect.value);
//      ps.setInt(3, idListValues);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from elem_data_select limit 1");
//      if (resultSet.next())
//        return resultSet.getInt("id");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось id данных элемента select!");
//    }
//    return null;
//  }
//  // получить количество элементов
//  private Integer countFromListValues() {
//    try {
//      String query = String.format("SELECT count(DISTINCT idListValues) AS \"num\" FROM list_values;");
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//
//      if(resultSet.next())
//        return resultSet.getInt("num");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить количество элементов ListValues!");
//    }
//    return null;
//  }
//  // вставить даныые элемента
//  private List<Integer> insertToValues(List<ListValue> listValues) {
//
//    try {
//      List<Integer> list = new CopyOnWriteArrayList<>();
//      for (ListValue listValue : listValues) {
//        String query = "INSERT INTO values_data (name, value) VALUES (?,?);";
//        PreparedStatement ps = connection.prepareStatement(query);
//        ps.setString(1, listValue.name);
//        ps.setDouble(2, listValue.value);
//        ps.execute();
//
//
//        ResultSet resultSet = connection.createStatement()
//            .executeQuery("Select LAST_INSERT_ID() AS id from values_data limit 1");
//        resultSet.next();
//        list.add(resultSet.getInt("id"));
//      }
//      return list;
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить список id данных элелемнов!");
//    }
//    return null;
//  }
//  // вставить даныые элемента
//  private Boolean insertToListValues(Integer idListValues, List<Integer> list_idValue) {
//    try {
//      for (Integer idValue : list_idValue) {
//        String query = "INSERT INTO list_values (idListValues, idValue) VALUES (?,?);";
//        PreparedStatement ps = connection.prepareStatement(query);
//        ps.setInt(1, idListValues);
//        ps.setInt(2, idValue);
//        ps.execute();
//      }
//      return true;
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить количество элементов!");
//    }
//    return false;
//  }
//  // вставка элемента
//  private Integer insertToElem(String idName, Integer idTypeElem, Integer idElemData, Integer idElemName) {
//    try {
//      String query = "INSERT INTO `elem` (`idName`, `idTypeElem`, `idElemData`,`idElemName`) VALUES (?,?,?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setString(1, idName);
//      ps.setInt(2, idTypeElem);
//      ps.setInt(3, idElemData);
//      ps.setInt(4, idElemName);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from elem limit 1");
//      if (resultSet.next())
//        return resultSet.getInt("id");
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return null;
//  }
//  private Boolean insertToListElems(Integer idCalc, Integer idElem) {
//    try {
//      String query = "INSERT INTO list_elements (idCalc, idElem) VALUES (?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setInt(1, idCalc);
//      ps.setInt(2, idElem);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from list_elements limit 1");
//      if(resultSet.next())
//        return true;
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return false;
//  }
//  private Boolean insertToUserCalc(Integer idUser, Integer idCalc) {
//    try {
//      String query = "INSERT INTO user_calc (idUser, idCalc) VALUES (?,?);";
//      PreparedStatement ps = connection.prepareStatement(query);
//      ps.setInt(1, idUser);
//      ps.setInt(2, idCalc);
//      ps.execute();
//
//      ResultSet resultSet = connection.createStatement()
//          .executeQuery("Select LAST_INSERT_ID() AS id from user_calc limit 1");
//      if(resultSet.next())
//        return true;
//
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить тип элемента!");
//    }
//    return false;
//  }
//
//}