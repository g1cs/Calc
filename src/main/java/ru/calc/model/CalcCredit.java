package ru.calc.model;

import ru.calc.model.Elements.*;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CalcCredit extends Calc {

  public CalcCredit(String name) {
    super(name);
  }

  public void init() {
    type = "Кредит";

    elements = new CopyOnWriteArrayList<>();
    elements.add(new Element(Enum.Names.sumCredit.getId(), Enum.Names.sumCredit.getName(),
        "slider", new ElementInfoSlider(Enum.Names.sumCredit.getInfo(), Enum.Names.sumCredit.getDefaultValue(),
        0.0, 1000000.0)));
    elements.add(new Element(Enum.Names.periodCredit.getId(), Enum.Names.periodCredit.getName(),
        "slider", new ElementInfoSlider(Enum.Names.periodCredit.getInfo(), Enum.Names.periodCredit.getDefaultValue(),
        1.0, 24.0)));
    elements.add(new Element(Enum.Names.rate.getId(), Enum.Names.rate.getName() ,
        "slider", new ElementInfoSlider(Enum.Names.rate.getInfo(), Enum.Names.rate.getDefaultValue(),
        0.0, 100.0)));

    List<ListValue> typeCredit = new CopyOnWriteArrayList<>();
    typeCredit.add(new ListValue(Enum.Names.typeCreditD.getName(),	Enum.Names.typeCreditD.getDefaultValue()));
    typeCredit.add(new ListValue(Enum.Names.typeCreditA.getName(),	Enum.Names.typeCreditA.getDefaultValue()));
    elements.add(new Element(Enum.Names.typeCredit.getId(), Enum.Names.typeCredit.getName(),
        "radio", new ElementInfoSelect(Enum.Names.typeCredit.getInfo(), typeCredit, Enum.Names.typeCredit.getDefaultValue())));

    elements.add(new Element(Enum.Names.oneTimeCommission.getId(), Enum.Names.oneTimeCommission.getName(),
        "input", new ElementInfoInput(Enum.Names.oneTimeCommission.getInfo(), Enum.Names.oneTimeCommission.getDefaultValue())));

    elements.add(new Element(Enum.Names.monthlyCommission.getId(), Enum.Names.monthlyCommission.getName(),
        "input", new ElementInfoInput(Enum.Names.monthlyCommission.getInfo(), Enum.Names.monthlyCommission.getDefaultValue())));

    List<ListValue> checkBox = new CopyOnWriteArrayList<>();
    checkBox.add(new ListValue("Условие 1 (-2%)",-2.0));
    checkBox.add(new ListValue("Условие 2 (-3%)",-3.0));
    elements.add(new Element(Enum.Names.additionalConditions.getId(), Enum.Names.additionalConditions.getName(),
        "listCheckbox", new ElementInfoSelect(Enum.Names.additionalConditions.getInfo(), checkBox, Enum.Names.additionalConditions.getDefaultValue())));
    //result = getDefaultResult();
  }

  public Result getDefaultResult() {
    List<ListValue> el = new CopyOnWriteArrayList<>();
    el.add(new ListValue(Enum.Names.sumCredit.getId(), 1000.0));
    el.add(new ListValue(Enum.Names.periodCredit.getId(), 12.0));
    el.add(new ListValue(Enum.Names.rate.getId(), 20.0));
    el.add(new ListValue(Enum.Names.typeCredit.getId(), 1.0));
    return new Result(null, null, el);
  }

  public static String getResult(Result defaultRes, List<Element> res) {

    Integer Period = 0;           // период платежа (месяцы)
    Double Sum = 0.0,             // сумма кредита
        Rate = 0.0,               // процентная ставка
        OneTimeCommission = 0.0,  // единовременнный платеж
        MonthlyCommission = 0.0,  // ежемесячный платеж
        InitialPayment = 0.0;     // первоначальный взнос
    boolean TypeCreditD = true;   // диффиринцированный ли плажет
    boolean[] errors = new boolean[13];    // default {false}

    for (Element elem : res) {

      if (elem.idName == null || !(elem.idName instanceof String) ||
          (elem.type == null || !(elem.type instanceof String)) ||
          (elem.name == null || !(elem.name instanceof String)))
        return "Ошибка! Неверные данные.";

      ElementInfoSelect elementInfoSelect = new ElementInfoSelect();
      Double maxValue = null, minValue = null, value = null, typeCredit = null;
      value = (Double) ((LinkedTreeMap) elem.info).get("value");
      switch (elem.type)
      {
        case "slider":
          minValue = (Double) ((LinkedTreeMap) elem.info).get("minValue");
          maxValue = (Double) ((LinkedTreeMap) elem.info).get("maxValue");
          break;
        case "radio":
          // value = (Double) ((LinkedTreeMap) elem.info).get("value");
          break;
        case "listCheckbox":
          elementInfoSelect.value = value;
          elementInfoSelect.text = (String) ((LinkedTreeMap) elem.info).get("text");
          String json = new Gson().toJson((List<Object>) ((LinkedTreeMap) elem.info).get("list"));
          elementInfoSelect.list = new Gson().fromJson(json, new TypeToken<List<ListValue>>() {}.getType());
          break;
      }

      switch (Enum.Names.myValueOfId(elem.idName)) {
        case sumCredit:
          errors[0] = true;
          Sum = value;
          break;
        case initialPayment:
          InitialPayment = value;
          break;
        case periodCredit:
          errors[3] = true;
          Period = value.intValue();
          break;
        case rate:
          errors[6] = true;
          Rate += value;
          break;
        case typeCredit:
          TypeCreditD = value == 1.0;
          break;
        case oneTimeCommission:
          OneTimeCommission = value;
          System.out.println("OneTimeCommission: " + OneTimeCommission);
          break;
        case monthlyCommission:
          MonthlyCommission = value;
          System.out.println("MonthlyCommission: " + MonthlyCommission);
          break;
        case additionalConditions:
          for (ListValue listValue : elementInfoSelect.list)
          {
            System.out.println("{"+ listValue.name + " = " + listValue.value + "}");
            Rate += listValue.value;
          }
          break;
      }
      }
//        case sumCredit:
//          errors[0] = true;               // содержит элемент
//          if (elementInfoSlider != null) {
//            errors[1] = true;             // не пуст
//            Sum = value;
//            if (Sum >= minValue && Sum <= maxValue)
//              errors[2] = true;           // валиден
//          }
//          break;
//        case periodCredit:
//          errors[3] = true;
//          if (elementInfoSlider != null) {
//            errors[4] = true;             // не пуст
//            Period = elementInfoSlider.value.intValue();
//            if (Period >= elementInfoSlider.minValue && Period <= elementInfoSlider.maxValue)
//              errors[5] = true;           // валиден
//          }
//          break;
//        case rate:
//          errors[6] = true;
//          if (elementInfoSlider != null) {
//            errors[7] = true;             // не пуст
//            Rate = elementInfoSlider.value;
//            if (Rate >= elementInfoSlider.minValue && Rate <= elementInfoSlider.maxValue)
//              errors[8] = true;           // валиден
//          }
//          break;
//        case typeCredit:
//          TypeCreditD = (elementInfoRadio != null) ? elementInfoRadio.value == 1.0 : Enum.Names.typeCredit.getDefaultValue() == 1.0;
//          break;
//      }


    String result = "";
    if (!errors[0])
      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.sumCredit.getName() + ".\r\n";

    if (!errors[3])
      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.periodCredit.getName() + ".\r\n";

    if (!errors[6])
      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.rate.getName() + ".\r\n";
//    if (!errors[0])
//      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.sumCredit.getName() + ".\r\n";
//    else if (!errors[1])
//      result += "Ошибка! Элемент \"" + Enum.Names.sumCredit.getName() + "\" пуст.\r\n";
//    else if (!errors[2])
//      result += "Ошибка! Заначение элемента \"" + Enum.Names.sumCredit.getName() + "\" не соответствует действительности.\r\n";
//
//    if (!errors[3])
//      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.periodCredit.getName() + ".\r\n";
//    else if (!errors[4])
//      result += "Ошибка! Элемент \"" + Enum.Names.periodCredit.getName() + "\" пуст.\r\n";
//    else if (!errors[5])
//      result += "Ошибка! Заначение элемента \"" + Enum.Names.periodCredit.getName() + "\" не соответствует действительности.\r\n";
//
//    if (!errors[6])
//      result += "Ошибка! Калькулятор не содержит элемента " + Enum.Names.rate.getName() + ".\r\n";
//    else if (!errors[7])
//      result += "Ошибка! Элемент \"" + Enum.Names.rate.getName() + "\" пуст.\r\n";
//    else if (!errors[8])
//      result += "Ошибка! Заначение элемента \"" + Enum.Names.rate.getName() + "\" не соответствует действительности.\r\n";

    if (!result.equals(""))
      return result;

    return getResultCredit(TypeCreditD, Sum - InitialPayment, Period, Rate, OneTimeCommission, MonthlyCommission);
  }

  private static String getResultCredit(Boolean TypeCreditD, Double Sum, Integer Period, Double Rate,
                                        Double OneTimeCommission, Double MonthlyCommission) {
    List<Payment> payments = new ArrayList<>();
    double sum = 0.0, rate = 0.0, debt = 0.0, paymant = 0.0, fRate = 0.0, fPayment;
    int iters = Period;

    if (Rate > 1.0 && Rate <= 100.0)
      Rate /= 100;

    if (TypeCreditD) {      // Дифференцированный расчет кредита
      sum = Sum;
      debt = Math.round(Sum / Period * 100.0) / 100.0;
      iters--;
    }
    else {                  // Аннуитетный расчет кредита
      paymant = (Sum * (Rate / Period)) / (1 - (1 / Math.pow(1 + Rate / Period, Period)));
      paymant = Math.round(paymant * 100.0) / 100.0;
      sum = Sum + paymant;
    }

    for (int i = 0; i < iters; i++) {
      sum = Math.round((sum - paymant + rate) * 100.0) / 100.0;     // задолжность
      rate = Math.round((sum * (Rate / Period)) * 100.0) / 100.0;   // начисленные проценты
      if (TypeCreditD)      // Дифференцированный расчет кредита
        paymant = Math.round((rate + debt) * 100.0) / 100.0;        // ежемесячный платеж
      else                  // Аннуитетный расчет кредита
        debt = Math.round((paymant - rate) * 100.0) / 100.0;        // основной долг
      fRate += rate;                                                // (всего) начисленные проценты
      fPayment = paymant + MonthlyCommission;
      payments.add(new Payment(sum, rate, debt, Math.round(fPayment * 100.0) / 100.0));
    }

    if (TypeCreditD){       // Дифференцированный расчет кредита
      debt = Sum - (debt * (Period - 1));                             // долг за последний месяц
      sum = debt;                                                     // задолжность за последний месяц
      rate = Math.round((sum * (Rate / Period)) * 100.0) / 100.0;     // начисленные проценты за последний месяц
      paymant = rate + debt;                                          // платеж за последний месяц
      fRate += rate;                                                  // (всего) начисленные проценты
      fPayment = paymant + MonthlyCommission;
      payments.add(new Payment(sum, rate, debt, Math.round(fPayment * 100.0) / 100.0));
    }

    fPayment = Sum + fRate + OneTimeCommission + MonthlyCommission * Period;
    fRate = Math.round(fRate * 100.0) / 100.0;
    payments.add(new Payment(0.0, fRate, Sum, Math.round(fPayment * 100.0) / 100.0));
    return new Gson().toJson(payments);
  }

  public void setElements(List<Element> elements) {
    super.setElements(elements);
  }

  private static class Payment {
    private Double sum;     // задолжность
    private Double rate;    // начисленные проценты
    private Double debt;    // основной долг
    private Double payment; // сумма платежа

    Payment(Double sum, Double debt, Double rate, Double payment) {
      this.sum = sum;
      this.debt = debt;
      this.rate = rate;
      this.payment = payment;
    }

    @Override
    public String toString() {
      return sum + "\t" + debt + "\t" + rate  + "\t" + payment;
    }
  }
}

