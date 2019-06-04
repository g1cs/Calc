package ru.calc.model.Elements;

public class ListValue2 extends ListValue
{
  public String idName;

  public ListValue2(String idName, String name, Double value){
    super(name, value);
    this.idName = idName;
  }
}