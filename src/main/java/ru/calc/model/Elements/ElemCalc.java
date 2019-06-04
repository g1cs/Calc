package ru.calc.model.Elements;

import java.util.List;

public class ElemCalc
{
  Integer defaultValue;
  List<ListElemsCalc> list;

  public ElemCalc(Integer defaultValue, List<ListElemsCalc> list) {
    this.defaultValue = defaultValue;
    this.list = list;
  }
}
