package ru.calc.model.Elements;

import java.util.List;

class ElementInfoListCheckbox extends ElementInfoInput{

  public List<ListValue2> list;  // список значений выпадающего списка

  public ElementInfoListCheckbox(String text, List<ListValue2> list, Double value) {
    super(text, value);
    this.list = list;
  }
}