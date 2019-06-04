package ru.calc.model;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.reflect.TypeToken;
import ru.calc.model.Elements.*;

public class Calc {
  public Integer userId;
  public Integer calcId;
  public String name;
  public String type;
  public List<Element> elements;
  //public Result result;

  public Calc() {}
  public Calc(String name) {this.name = name;}

  public void init() {}

  public String getResult(Result res) {return null;}

  public Result getDefaultResult() {return null;}

  public void setElements(List<Element> elements) {

    System.out.println(elements);

    if (this.elements == null)
      this.elements = new CopyOnWriteArrayList<>();
    else
      this.elements.clear();

    for (Element elem : elements) {

      String text = (String) ((LinkedTreeMap) elem.info).get("text");
      Double value = (Double) ((LinkedTreeMap) elem.info).get("value");
      Element element = null;
      switch (elem.type)
      {
        case "input": {
          ElementInfoInput elementInfoInput = new ElementInfoInput(text, value);
          element = new Element(elem.idName, elem.name, elem.type, elementInfoInput);
          this.elements.add(element);
        } break;
        case "select": {
          String json = new Gson().toJson((List<Object>) ((LinkedTreeMap) elem.info).get("list"));
          List<ListValue> list = new Gson().fromJson(json, new TypeToken<List<ListValue>>() {}.getType());
          this.elements.add(new Element(elem.idName, elem.name, elem.type, new ElementInfoSelect(text, list, value)));
        } break;
        case "slider": {
          Double minValue = (Double) ((LinkedTreeMap) elem.info).get("minValue");
          Double maxValue = (Double) ((LinkedTreeMap) elem.info).get("maxValue");
          ElementInfoSlider elementInfoSlider = new ElementInfoSlider(text, value, minValue, maxValue);
          element = new Element(elem.idName, elem.name, elem.type, elementInfoSlider);
          this.elements.add(element);
        } break;
        case "radio":
        case "listCheckbox": {
          String json = new Gson().toJson((List<Object>) ((LinkedTreeMap) elem.info).get("list"));
          List<ListValue> list = new Gson().fromJson(json, new TypeToken<List<ListValue>>() {}.getType());
          this.elements.add(new Element(elem.idName, elem.name, elem.type, new ElementInfoSelect(text, list, value)));
        } break;
      }
    }
  }
}
