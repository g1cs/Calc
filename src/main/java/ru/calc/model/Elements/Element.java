package ru.calc.model.Elements;

public class Element
{
  public String idName;
  public String name;
  public String type;
  public Object info;

  public Element() {}

  public Element(String idName, String name, String type, Object info){
    this.idName = idName;
    this.name = name;
    this.type = type;
    this.info = info;
  }
}