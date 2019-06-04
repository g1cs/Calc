package ru.calc.model;

import java.util.List;
import ru.calc.model.Elements.*;


public class Result {
  public String formula;
  public String info;
  public List<ListValue> res;

  Result(String formula, String info, List<ListValue> res){
    this.formula = formula;
    this.info = info;
    this.res = res;
  }
}