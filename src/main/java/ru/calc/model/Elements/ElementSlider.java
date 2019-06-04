package ru.calc.model.Elements;

public class ElementSlider extends Element
{
//  protected ElementInfoSlider info;

  public enum Names {}

  public ElementSlider(String idName, String name, String type, ElementInfoSlider info){
    this.idName = idName;
    this.name = name;
    this.type = type;
    this.info = info;
  }
}