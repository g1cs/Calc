package ru.calc.model.Elements;

public class ElementInfoInput {

  public String text;     // информация
  public Double value;    // значение

  public ElementInfoInput() {}

  public ElementInfoInput(String text, Double value) {
    this.text = text;
    this.value = value;
  }
}