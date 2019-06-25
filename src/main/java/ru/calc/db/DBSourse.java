package ru.calc.db;

public class DBSourse {
  public String DRIVER;
  public String JDBC;
  public String HOST;
  public String PORT;
  public String DB;
  public String USER;
  public String PASSWORD;
  public String URL;
  public String SCHEMAS;


  DBSourse(String DRIVER, String JDBC, String HOST, String PORT, String DB,
           String USER, String PASSSWORD, String URLINFO, String SCHEMAS) {
    this.DRIVER = DRIVER;
    this.JDBC = JDBC;
    this.HOST = HOST;
    this.PORT = PORT;
    this.DB = DB;
    this.SCHEMAS = SCHEMAS;
    this.USER = USER;
    this.PASSWORD = PASSSWORD;
    this.URL = "jdbc:" + JDBC + "://" + HOST + ":" + PORT + "/" + DB + URLINFO;
  }
  DBSourse(String DRIVER, String JDBC, String HOST, String PORT, String DB,
           String USER, String PASSSWORD, String URLINFO) {
    this.DRIVER = DRIVER;
    this.JDBC = JDBC;
    this.HOST = HOST;
    this.PORT = PORT;
    this.DB = DB;
    this.USER = USER;
    this.PASSWORD = PASSSWORD;
    this.URL = "jdbc:" + JDBC + "://" + HOST + ":" + PORT + "/" + DB + URLINFO;
  }
}