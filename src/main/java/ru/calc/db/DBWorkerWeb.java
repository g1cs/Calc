package ru.calc.db;

import ru.calc.model.Calc;
import ru.calc.model.CalcCredit;
import ru.calc.model.CalcOsago;
import ru.calc.model.Elements.*;
import ru.calc.model.User;

import java.sql.*;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.CopyOnWriteArrayList;

import static java.util.Objects.nonNull;

public class DBWorkerWeb {

  private Connection connection = null;
  private DBSourse dbSourse;

  public DBWorkerWeb() {
    dbSourse = new DBSourse("org.postgresql.Driver", "postgresql",
        "ec2-54-217-225-16.eu-west-1.compute.amazonaws.com", "5432",
        "d74gvg78td3vu5","efuohzbvovvzqo",
        "eef7181ac74cb4d2908ad982708abb8e6518749010eec52202ea2379e3ad5128",
        "?sslmode=require", "dbcalc");

    openConnection();
  }

  // открыть соединение с БД
  public void openConnection() {
    try {
      Class.forName(dbSourse.DRIVER);
    } catch (ClassNotFoundException e) {
      System.out.println("Не удалось загрузить класс драйвера!");
      e.printStackTrace();
      return;
    }

    try {
      connection = DriverManager.getConnection(dbSourse.URL, dbSourse.USER, dbSourse.PASSWORD);
      if (!connection.isClosed())
        System.out.println("Соединеие с БД установлено!");
    } catch (SQLException e) {
      System.out.println("Не удалось соединиться с БД!");
      e.printStackTrace();
    }
  }

  // закрыть соединение с БД
  public void closeConnection() {
    try {
      connection.close();
      if (connection.isClosed())
        System.out.println("Соединеие с БД закрыто!");
    } catch (SQLException e) {
      System.out.println("Не удалось закрыть соединение с БД!");
      e.printStackTrace();
    }
  }

  // существует ли такой пользователь
  public boolean userIsExist(final String login, final String password) {

    if (login == null || password == null)
      return false;
    else
      return nonNull(getUserByLoginPassword(login, password));
  }

  // получить пользователя по логину и паролю
  public User getUserByLoginPassword(final String login, final String password) {
    try {
      String query = String.format("SELECT * FROM %s.%s.users WHERE login='%s' and password='%s';",
          dbSourse.DB, dbSourse.SCHEMAS, login, password);
      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
      if(resultSet.next()) {
        int role = resultSet.getInt("role");
        int id = resultSet.getInt("iduser");
        return new User(id, login, password, User.ROLE.values()[role]);
      }
    }
    catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить id из users (L,P)!");
    }
    return null;
  }
  private Integer getIdUserByLogin(final String login) {
    try {
      String query = String.format("SELECT * FROM %s.%s.users WHERE login='%s';",
          dbSourse.DB, dbSourse.SCHEMAS, login);
      ResultSet resultSet = this.connection.createStatement().executeQuery(query);
      if(resultSet.next())
        return resultSet.getInt(1);
    }
    catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить id из users (L)!");
    }
    return null;
  }




  // удалить калькулятор
  public void deleteCalc(Integer userId, Integer calcId) {
    deleteCalcById(userId, calcId);
  }
  private void deleteCalcById(Integer idUser, Integer idCalc) {
    List<Calc> calcs = getUserCalc(idUser);
    for (Calc calc : calcs) {
      if (calc.calcId.equals(idCalc)) {
        deleteElemsCalcByIdCalc(idCalc);
        deleteCalcWhithElemsByIdCalc(idCalc);
      }
    }
  }
  // удалить элементы калькулятора
  private void deleteElemsCalcByIdCalc(Integer idCalc) {

    List<Integer> listElementsId = selectListIdElemsByIdCalc(idCalc);
    deleteDataElemsCalcByIdCalc(listElementsId);

    try {
      Statement st = connection.createStatement();
      for (Integer idElem : listElementsId) {
        String query = String.format("DELETE FROM %s.%s.elem WHERE idElem=%d;",
            dbSourse.DB, dbSourse.SCHEMAS, idElem);
        System.out.println(query);
        st.executeUpdate(query);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось удалить elem!");
    }
  }
  // удалить данные элемента
  private void deleteDataElemsCalcByIdCalc(List<Integer> listElementsId) {

    try {
      Statement st = connection.createStatement();
      for (Integer idElem : listElementsId) {
        String query = String.format("SELECT * FROM %s.%s.elem WHERE idElem='%d';",
            dbSourse.DB, dbSourse.SCHEMAS, idElem);
        ResultSet resultSet = st.executeQuery(query);
        while (resultSet.next()) {
          Integer idTypeElem = resultSet.getInt("idTypeElem");
          Integer idElemData = resultSet.getInt("idElemData");

          String typeElem = selectNameInfoElemBuId("type_elem", "idTypeElem", idTypeElem);
          assert typeElem != null;
          switch (typeElem) {
            case "input": {
              deleteElemDataById("elem_data_input", "idElemDataInput", idElemData);
            }
            break;
            case "radio":
            case "select":
            case "listCheckbox": {
              deleteElemDataById("elem_data_select", "idElemDataSelect", idElemData);
            }
            break;
            case "slider": {
              deleteElemDataById("elem_data_slider", "idElemDataSlider", idElemData);
            }
            break;
          }
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить elem для удаления elemData!");
    }
  }
  private void deleteElemDataById(String table, String idName, Integer idElemData) {

    try {
      Statement st = connection.createStatement();
      String query = String.format("DELETE FROM %s.%s.%s WHERE %s=%d;",
          dbSourse.DB, dbSourse.SCHEMAS, table, idName, idElemData);
      System.out.println(query);
      st.executeUpdate(query);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось удалить из "+table+"!");
    }
  }
  // удалить калькулятор
  private void deleteCalcWhithElemsByIdCalc(Integer idCalc) {

    try {
      Statement st = connection.createStatement();
      String query = String.format("DELETE FROM %s.%s.calc WHERE idCalc=%d;",
          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
      System.out.println(query);
      st.executeUpdate(query);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось удалить из calc!");
    }
  }




  // получить тип калькулятора
  private String selectTypeCalcFromIdTypeCalc(Integer idTypeCalc) {
    try {
      String query = String.format("SELECT * FROM %s.%s.type_calc WHERE idtypecalc='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idTypeCalc);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if(resultSet.next())
        return resultSet.getString("name");
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить id типа калькулятора из type_calc!");
    }
    return null;
  }
  // получить тип элемента
  private Integer selectFromTypeCalc(String typeCalc) {
    try {
      String query = String.format("SELECT * FROM %s.%s.type_calc WHERE name='%s';",
          dbSourse.DB, dbSourse.SCHEMAS, typeCalc);
      //System.out.println(query);
      ResultSet resultSet = connection.createStatement().executeQuery(query);

      if(resultSet.next())
        return resultSet.getInt("idTypeCalc");

    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить id типа калькулятора из type_calc!");
    }
    return null;
  }
  // получить тип элемента
  // получить название элемента
  // получить название элемента
  private Integer selectIdInfoElemByName(String table, String name) {
    try {
      String query = String.format("SELECT * FROM %s.%s.%s WHERE name='%s';",
          dbSourse.DB, dbSourse.SCHEMAS, table, name);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if (resultSet.next())
        return resultSet.getInt(1);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить id из "+table+"!");
    }
    return null;
  }


  // получить количество элементов
//  private Integer countFromElem(Statement statement) {
//    try {
//      String query = String.format("SELECT COUNT(*) AS 'num' FROM %s.%s.elem;", dbSourse.DB, dbSourse.SCHEMAS);
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

  // получить список id-калькуляторов пользователя
  private List<Integer> selectListIdCalcsByIdUser(Integer idUser) {
    List<Integer> list_idCalc = null;
    try {
      String query = String.format("SELECT * FROM %s.%s.user_calc WHERE iduser='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idUser);
      ResultSet resultSet = connection.createStatement().executeQuery(query);

      list_idCalc = new CopyOnWriteArrayList<>();
      while (resultSet.next()) {
        list_idCalc.add(resultSet.getInt("idcalc"));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить список id калькуляторов пользователя из user_calc!");
    }
    return list_idCalc;
  }
  // получить пользовательские калькуляторы
  private Calc selectCalcById(Statement st, Integer idCalc) {

    Calc calc = null;
    try {
      String query = String.format("SELECT * FROM %s.%s.calc WHERE idcalc='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
      ResultSet resultSet = st.executeQuery(query);

      while (resultSet.next()) {
        String name = resultSet.getString("name");
        Integer idTypeCalc = resultSet.getInt("idTypeCalc");
        String typeCalc = selectTypeCalcFromIdTypeCalc(idTypeCalc);

        assert typeCalc != null;
        calc = selectCalcs(idCalc, typeCalc, name);
        calc.calcId = idCalc;
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить список калькуляторов из calc!");
    }
    return calc;
  }
  private List<Calc> selectListCalcsByListIdCalcs(Integer idUser, List<Integer> list_idCalc) {

    List<Calc> calcs = new CopyOnWriteArrayList<>();

    try {
      Statement st = connection.createStatement();
      for (Integer idCalc : list_idCalc) {
        Calc calc = selectCalcById(st, idCalc);
        calc.userId = idUser;
        calcs.add(calc);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить список калькуляторов из calc!");
    }
    return calcs;
  }
  // получить калькулятор
  private Calc selectCalcs(Integer idCalc, String typeCalc, String name) {
    Calc calc;
    switch (typeCalc) {
      case "Осаго":   calc = new CalcOsago(name);
      case "Кредит":  calc = new CalcCredit(name);
      default:        calc = new Calc(name);
    }
    calc.type = typeCalc;
    calc.elements = new CopyOnWriteArrayList<>();

    List<Integer> list_idElem = selectListIdElemsByIdCalc(idCalc);
    try {
      Statement st = connection.createStatement();
      for (Integer idElem : list_idElem) {
        String query = String.format("SELECT * FROM %s.%s.elem WHERE idElem='%d';",
            dbSourse.DB, dbSourse.SCHEMAS, idElem);
        ResultSet resultSet = st.executeQuery(query);
        while (resultSet.next()) {
          Integer idElemName = resultSet.getInt("idElemName");
          Integer idTypeElem = resultSet.getInt("idTypeElem");
          Integer idElemData = resultSet.getInt("idElemData");
          Integer idElemIdName = resultSet.getInt("idElemIdName");

          String typeElem = selectNameInfoElemBuId("type_elem", "idTypeElem", idTypeElem);
          String nameElem = selectNameInfoElemBuId("elem_name", "idElemName", idElemName);
          String idName   = selectNameInfoElemBuId("elem_idname", "idElemIdName", idElemIdName);
          assert typeElem != null;
          switch (typeElem) {
            case "input": {
              calc.elements.add(selectElemDataInput(idName, nameElem, typeElem, idElemData));
            }
            break;
            case "radio":
            case "select":
            case "listCheckbox": {
              calc.elements.add(selectElemDataSelect(idName, nameElem, typeElem, idElemData));
            }
            break;
            case "slider": {
              calc.elements.add(selectElemDataSlider(idName, nameElem, typeElem, idElemData));
            }
            break;
          }
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить калькулятор из elem!");
    }

    return calc;
  }
  // получить список id-элементов
  private List<Integer> selectListIdElemsByIdCalc(Integer idCalc) {
    List<Integer> listIdElems = null;
    try {
      String query = String.format("SELECT * FROM %s.%s.list_elements WHERE idCalc='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idCalc);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      listIdElems = new CopyOnWriteArrayList<>();
      while (resultSet.next()) {
        listIdElems.add(resultSet.getInt("idElem"));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из list_elements!");
    }
    return listIdElems;
  }
  // получить тип элемента
  private String selectNameInfoElemBuId(String table, String row, Integer idTypeElem) {
    try {
      String query = String.format("SELECT * FROM %s.%s.%s WHERE %s='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, table, row, idTypeElem);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if (resultSet.next())
        return resultSet.getString("name");
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из "+table+"!");
    }
    return null;
  }
//  private String selectTypeElem(Integer idTypeElem) {
//    try {
//      String query = String.format("SELECT * FROM %s.%s.type_elem WHERE idTypeElem='%d';",
//          dbSourse.DB, dbSourse.SCHEMAS, idTypeElem);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        return resultSet.getString("name");
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить из type_elem!");
//    }
//    return null;
//  }
//  // получить название элемента
//  private String selectNameElem(Integer idElemName) {
//    try {
//      String query = String.format("SELECT * FROM %s.%s.elem_name WHERE idElemName='%d';",
//          dbSourse.DB, dbSourse.SCHEMAS, idElemName);
//      ResultSet resultSet = connection.createStatement().executeQuery(query);
//      if (resultSet.next())
//        return resultSet.getString("name");
//    } catch (SQLException e) {
//      e.printStackTrace();
//      System.out.println("Не удалось получить из elem_name!");
//    }
//    return null;
//  }
  // получить элемент (Input)
  private Element selectElemDataInput(String idName, String nameElem, String typeElem, Integer idElemData) {
    try {
      String query = String.format("SELECT * FROM %s.%s.elem_data_input WHERE idElemDataInput='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if (resultSet.next()) {
        String text = resultSet.getString("text");
        Double value = resultSet.getDouble("value");
        return new Element(idName, nameElem, typeElem, new ElementInfoInput(text, value));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из elem_data_input!");
    }
    return null;
  }
  // получить элемент (Slider)
  private Element selectElemDataSlider(String idName, String nameElem, String typeElem, Integer idElemData) {
    try {
      String query = String.format("SELECT * FROM %s.%s.elem_data_slider WHERE idElemDataSlider='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if (resultSet.next()) {
        String text = resultSet.getString("text");
        Double value = resultSet.getDouble("value");
        Double minValue = resultSet.getDouble("minValue");
        Double maxValue = resultSet.getDouble("maxValue");
        return new Element(idName, nameElem, typeElem, new ElementInfoSlider(text, value, minValue, maxValue));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из elem_data_slider!");
    }
    return null;
  }
  // получить элемент (Select)
  private Element selectElemDataSelect(String idName, String nameElem, String typeElem, Integer idElemData) {
    try {
      String query = String.format("SELECT * FROM %s.%s.elem_data_select WHERE idElemDataSelect='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idElemData);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if (resultSet.next()) {
        String text = resultSet.getString("text");
        Double value = resultSet.getDouble("value");
        Integer idListValues = resultSet.getInt("idListValue");

        List<ListValue> list = selectListValue(idListValues);
        return new Element(idName, nameElem, typeElem, new ElementInfoSelect(text, list, value));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из elem_data_select!");
    }
    return null;
  }
  // получить список данных элемента
  private List<ListValue> selectListValue(Integer idListValues) {
    try {
      String query = String.format("SELECT * FROM %s.%s.list_value WHERE idListValue='%d';",
          dbSourse.DB, dbSourse.SCHEMAS, idListValues);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      List<Integer> list_idValue = new CopyOnWriteArrayList<>();
      while (resultSet.next())
        list_idValue.add(resultSet.getInt("idDataValue"));

      return selectValues(list_idValue);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из list_values!");
    }
    return null;
  }
  // получить данные элемента
  private List<ListValue> selectValues(List<Integer> list_idValue) {
    List<ListValue> list = null;
    try {
      Statement st = connection.createStatement();
      list = new CopyOnWriteArrayList<>();
      for (Integer idValue : list_idValue) {
        String query = String.format("SELECT * FROM %s.%s.data_value WHERE idDataValue='%d';",
            dbSourse.DB, dbSourse.SCHEMAS, idValue);
        ResultSet resultSet = st.executeQuery(query);
        if (resultSet.next())
          list.add(new ListValue(resultSet.getString("text"), resultSet.getDouble("value")));
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить из values_data!");
    }
    return list;
  }



  public List<Calc> getDefaultCalcs() {
    return getUserCalc("admin");
  }
  private List<Calc> getUserCalc(String userLogin) {
    return getUserCalc(getIdUserByLogin(userLogin));
  }
  public List<Calc> getUserCalc(Integer idUser) {
    List<Integer> idCalcs = selectListIdCalcsByIdUser(idUser);
    return selectListCalcsByListIdCalcs(idUser, idCalcs);
  }

  public Calc getCalcById(Integer idCalc) {

    Calc calc = null;
    try {
      Statement st = connection.createStatement();
      calc = selectCalcById(st, idCalc);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить калькулятор из calc!");
    }
    return calc;
  }


  // процедура добавления калькулятора
  // добавить элементы калькулятора
  //    получить тип элемента idTypeElem
  //    вставить Elem (название, тип элемента) и получиь idElem
  //        (idElemInfo = idElem)
  //    втавить ElemInfo<Name> (text, value и т.д.), где Name - (Input, Select и т.д.) и получить idElemInfo
  //    вставить ElemInfo (idElem, idTypeElem, idElemInfo)
  // добавить калькулятор
  //    вставить калькулятор (idTypecalc, idElem) и получить idCalc
  // добавить пользовательский калькулятор
  //    вставить userCalc (idUser, idCalc)


  public void addUserCalc(Calc calc) {
    addUserCalc(calc, false);
  }
  public void addUserCalc(Calc calc, Boolean isUpdate) {
    Integer idTypeCalc = selectFromTypeCalc(calc.type);
    Integer idCalc = (!isUpdate) ? insertToCalc(calc.name, idTypeCalc) : insertToCalc(calc.calcId, calc.name);
    if (!isUpdate)
      insertToUserCalc(calc.userId, idCalc);

    if (isUpdate)
      deleteElemsCalcByIdCalc(calc.calcId);

    List<Integer> list_elements = new CopyOnWriteArrayList<>();
    for (Element elem : calc.elements) {
      Integer idTypeElem = selectIdInfoElemByName("type_elem", elem.type);
      Integer idElemName = selectIdInfoElemByName("elem_name", elem.name);
      Integer idElemIdName = selectIdInfoElemByName("elem_idname", elem.idName);
      Integer idElemData = 0;
      switch (elem.type) {
        case "input": {
          idElemData = insertToElemDataInput((ElementInfoInput) elem.info);
        } break;
        case "radio":
        case "select":
        case "listCheckbox": {
          idElemData = insertToElemDataSelect((ElementInfoSelect) elem.info);
        } break;
        case "slider": {
          idElemData = insertToElemDataSlider((ElementInfoSlider) elem.info);

        } break;
      }
      Integer idElem = insertToElem(idElemIdName, idTypeElem, idElemData, idElemName);
      list_elements.add(idElem);
    }
    insertToListElems(idCalc, list_elements);
  }

  // вставить калькулятор
  private Integer insertToCalc(String nameCalc, Integer idTypeCalc) {

    String query = String.format("INSERT INTO %s.%s.calc (name, idTypeCalc) VALUES('%s',%d)",
        dbSourse.DB, dbSourse.SCHEMAS, nameCalc, idTypeCalc);
    try {
      return insertToCalc(query);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в calc!");
    }
    return null;
  }
  private Integer insertToCalc(Integer calcId, String nameCalc) {

    String query = String.format("UPDATE %s.%s.calc SET name='%s' WHERE idcalc=%d",
        dbSourse.DB, dbSourse.SCHEMAS, nameCalc, calcId);
    try {
      return insertToCalc(query);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Не удалось обновить calc!");
    }
    return null;
  }
  private Integer insertToCalc(String query) {
    try {
      Statement st = connection.createStatement();
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next())
        return rs.getInt(1);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в calc!");
    }
    return null;
  }


  // вставить данные элемента (input)
  private Integer insertToElemDataInput(ElementInfoInput elementInfoInput) {
    try {
      Statement st = connection.createStatement();
      String query = String.format(Locale.ROOT, "INSERT INTO %s.%s.elem_data_input (text, value) values('%s', %f)",
          dbSourse.DB, dbSourse.SCHEMAS, elementInfoInput.text, elementInfoInput.value);
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next())
        return rs.getInt(1);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в elem_data_input!");
    }
    return null;
  }
  // вставить данные элемента (slider)
  private Integer insertToElemDataSlider(ElementInfoSlider elementInfoSlider){
    try {
      Statement st = connection.createStatement();
      String query = String.format(Locale.ROOT, "INSERT INTO %s.%s.elem_data_slider (text, value, minValue, maxValue) " +
              "values('%s',%f,%f,%f);", dbSourse.DB, dbSourse.SCHEMAS, elementInfoSlider.text,
          elementInfoSlider.value, elementInfoSlider.minValue, elementInfoSlider.maxValue);
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next())
        return rs.getInt(1);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в elem_data_slider!");
    }
    return null;
  }
  // вставить данные элемента (select)
  private Integer insertToElemDataSelect(ElementInfoSelect elementInfoSelect){

    List<Integer> list_idDataValue = insertToDataValue(elementInfoSelect.list);
    Integer idListValue = maxIdFromListValue();
    try {
      Statement st = connection.createStatement();
      String query = String.format(Locale.ROOT, "INSERT INTO %s.%s.elem_data_select (text, value, idListValue) values('%s',%f,%d);",
          dbSourse.DB, dbSourse.SCHEMAS, elementInfoSelect.text, elementInfoSelect.value, idListValue);
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next()) {
        assert list_idDataValue != null;
        insertToListValue(idListValue, list_idDataValue);
        return rs.getInt(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в elem_data_select!");
    }
    return null;
  }
  // получить количество элементов
  private Integer maxIdFromListValue() {
    try {
      String query = String.format("SELECT max(DISTINCT idListValue) AS num FROM %s.%s.list_value;",
          dbSourse.DB, dbSourse.SCHEMAS);
      //System.out.println(query);
      ResultSet resultSet = connection.createStatement().executeQuery(query);
      if(resultSet.next()) {
        Integer max = resultSet.getInt("num");
        return (nonNull(max)) ? ++max : 1;
      }

    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось получить count(DISTINCT idListValues) из list_values!");
    }
    return null;
  }
  // вставить даныые элемента
  private List<Integer> insertToDataValue(List<ListValue> listDataValues) {

    try {
      List<Integer> list = new CopyOnWriteArrayList<>();
      Statement st = connection.createStatement();
      for (ListValue dataValue : listDataValues) {
        String query = String.format(Locale.ROOT, "INSERT INTO %s.%s.data_value (text, value) VALUES ('%s',%f);",
            dbSourse.DB, dbSourse.SCHEMAS, dataValue.name, dataValue.value);
        //System.out.println(query);
        st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
        ResultSet rs = st.getGeneratedKeys();
        if (rs.next())
          list.add(rs.getInt(1));
      }
      return list;
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в values_data!");
    }
    return null;
  }
  // вставить даныые элемента
  private void insertToListValue(Integer idListValue, List<Integer> list_idDataValue) {

    try {
      Statement st = connection.createStatement();
      for (Integer idDataValue : list_idDataValue) {
        String query = String.format("INSERT INTO %s.%s.list_value (idListValue, idDataValue) VALUES (%d,%d);",
            dbSourse.DB, dbSourse.SCHEMAS, idListValue, idDataValue);
        //System.out.println(query);
        st.executeUpdate(query);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в list_value!");
    }
  }
  // вставка элемента
  private Integer insertToElem(Integer idElemIdName, Integer idTypeElem, Integer idElemData, Integer idElemName) {
    try {
      Statement st = connection.createStatement();
      String query = String.format("INSERT INTO %s.%s.elem (idElemIdName, idTypeElem, idElemData, idElemName)" +
          " VALUES (%d,%d,%d,%d);", dbSourse.DB, dbSourse.SCHEMAS, idElemIdName, idTypeElem, idElemData, idElemName);
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next())
        return rs.getInt(1);
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в elem!");
    }
    return null;
  }
  private void insertToListElems(Integer idCalc, List<Integer> list_elements) {
    try {
      Statement st = connection.createStatement();
      for (Integer idElem : list_elements) {
        String query = String.format("INSERT INTO %s.%s.list_elements (idCalc, idElem) VALUES (%d,%d);",
            dbSourse.DB, dbSourse.SCHEMAS, idCalc, idElem);
        //System.out.println(query);
        st.executeUpdate(query);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в list_elements!");
    }
  }
  private void insertToUserCalc(Integer idUser, Integer idCalc) {
    try {
      Statement st = connection.createStatement();
      String query = String.format("INSERT INTO %s.%s.user_calc (idUser, idCalc) VALUES (%d,%d);",
          dbSourse.DB, dbSourse.SCHEMAS, idUser, idCalc);
      //System.out.println(query);
      st.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
      ResultSet rs = st.getGeneratedKeys();
      if (rs.next()) {
        rs.getInt(1);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.out.println("Не удалось вставить в user_calc!");
    }
  }

}