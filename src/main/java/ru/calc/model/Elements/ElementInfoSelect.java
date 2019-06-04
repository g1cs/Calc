package ru.calc.model.Elements;

import java.util.List;

public class ElementInfoSelect extends ElementInfoInput{

  public List<ListValue> list;  // список значений выпадающего списка

  public ElementInfoSelect() {
    super();
  }
  public ElementInfoSelect(String text, List<ListValue> list, Double value) {
    super(text, value);
    this.list = list;
  }
}