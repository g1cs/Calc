package ru.calc.model.Elements;

public class ElementInfoSlider extends ElementInfoInput{

  public Double minValue;
  public Double maxValue;

  public ElementInfoSlider() {
    super();
  }
  public ElementInfoSlider(String text, Double value, Double minValue, Double maxValue) {
    super(text, value);
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
}