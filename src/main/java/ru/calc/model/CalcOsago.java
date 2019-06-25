package ru.calc.model;

import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.reflect.TypeToken;
import ru.calc.model.Elements.*;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CalcOsago extends Calc {

  public CalcOsago(String name) {
    super(name);
  }

  public void init1() {
    type = "Осаго";
//    String baseRate = "ТБ";
//    String elemsCountry = "КТ";
//    String elemsBonusMalus = "КБМ";
//    String elemsAgeAndExperience = "КВС";
//    String elemsAutoCategory = "elemsAutoCategory";
//    String elemsAutoInfo = "КМ";
//    String elemsPeriodOfUse = "КС";
//    String elemsPersons = "elemsPersons";

    elements = new CopyOnWriteArrayList<>();

    elements.add(new Element(Enum.Names.baseRate.getId(), Enum.Names.baseRate.getName(),
        "input", new ElementInfoInput(Enum.Names.baseRate.getInfo(), Enum.Names.baseRate.getDefaultValue())));

    elements.add(new Element(Enum.Names.country.getId(), Enum.Names.country.getName(),
        "select", new ElementInfoSelect(Enum.Names.country.getInfo(), null, Enum.Names.country.getDefaultValue())));

    elements.add(new Element(Enum.Names.bonusMalus.getId(),Enum.Names.bonusMalus.getName(),
        "select", new ElementInfoSelect(Enum.Names.bonusMalus.getInfo(), null, Enum.Names.bonusMalus.getDefaultValue())));

    elements.add(new Element(Enum.Names.ageAndExperience.getId(),Enum.Names.ageAndExperience.getName(),
        "select", new ElementInfoSelect(Enum.Names.ageAndExperience.getInfo(), null, Enum.Names.ageAndExperience.getDefaultValue())));

    elements.add(new Element(Enum.Names.autoInfo.getId(), Enum.Names.autoInfo.getName(),
        "select", new ElementInfoSelect(Enum.Names.autoInfo.getInfo(), null, Enum.Names.autoInfo.getDefaultValue())));

    elements.add(new Element(Enum.Names.periodOfUse.getId(), Enum.Names.periodOfUse.getName(),
        "select", new ElementInfoSelect(Enum.Names.periodOfUse.getInfo(), null, Enum.Names.periodOfUse.getDefaultValue())));

  }

  public void init() {
    type = "Осаго";

//    String baseRate = "ТБ";
//    String elemsCountry = "КТ";
//    String elemsBonusMalus = "КБМ";
//    String elemsAgeAndExperience = "КВС";
//    String elemsAutoCategory = "elemsAutoCategory";
//    String elemsAutoInfo = "КМ";
//    String elemsPeriodOfUse = "КС";
//    String elemsPersons = "elemsPersons";


    elements = new CopyOnWriteArrayList<>();

    elements.add(new Element(Enum.Names.baseRate.getId(), Enum.Names.baseRate.getName(),
        "input", new ElementInfoInput(Enum.Names.baseRate.getInfo(), Enum.Names.baseRate.getDefaultValue())));

    List<ListValue> Country = new CopyOnWriteArrayList<>();
    Country.add(new ListValue("Москва", 2.0));
    Country.add(new ListValue("Московская область", 1.7));
    Country.add(new ListValue("Санкт-Петербург", 1.8));
    Country.add(new ListValue("Ленинградская область", 1.3));
    Country.add(new ListValue("Екатеринбург", 1.8));
    Country.add(new ListValue("Якутск", 1.2));
    Country.add(new ListValue("Краснодар, Новороссийск", 1.8));
    Country.add(new ListValue("Пермь", 2.0));
    Country.add(new ListValue("Владимир", 1.6));
    elements.add(new Element(Enum.Names.country.getId(), Enum.Names.country.getName(),
        "select", new ElementInfoSelect(Enum.Names.country.getInfo(), Country, Enum.Names.country.getDefaultValue())));


    List<ListValue> BonusMalus = new CopyOnWriteArrayList<>();
    BonusMalus.add(new ListValue("М",	2.45));
    BonusMalus.add(new ListValue("0",	2.3));
    BonusMalus.add(new ListValue("1",	1.55));
    BonusMalus.add(new ListValue("2",	1.4));
    BonusMalus.add(new ListValue("3",	1.0));
    BonusMalus.add(new ListValue("4",	0.95));
    BonusMalus.add(new ListValue("5",	0.9));
    BonusMalus.add(new ListValue("6",	0.85));
    BonusMalus.add(new ListValue("7",	0.8));
    BonusMalus.add(new ListValue("8",	0.75));
    BonusMalus.add(new ListValue("9",	0.7));
    BonusMalus.add(new ListValue("10",	0.65));
    BonusMalus.add(new ListValue("11",	0.6));
    BonusMalus.add(new ListValue("12",	0.55));
    BonusMalus.add(new ListValue("13",	0.5));
    elements.add(new Element(Enum.Names.bonusMalus.getId(),Enum.Names.bonusMalus.getName(),
        "select", new ElementInfoSelect(Enum.Names.bonusMalus.getInfo(), BonusMalus, Enum.Names.bonusMalus.getDefaultValue())));


    List<ListValue> AgeAndExperience = new CopyOnWriteArrayList<>();
    AgeAndExperience.add(new ListValue("Возраст, лет: 16-21; стаж, лет: 0.",	1.87));
    AgeAndExperience.add(new ListValue("Возраст, лет: 16-21; стаж, лет: 1.",	1.87));
    AgeAndExperience.add(new ListValue("Возраст, лет: 16-21; стаж, лет: 2.",	1.87));
    AgeAndExperience.add(new ListValue("Возраст, лет: 16-21; стаж, лет: 3-4.",	1.66));
    AgeAndExperience.add(new ListValue("Возраст, лет: 16-21; стаж, лет: 5-6.",	1.66));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 0.",	1.77));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 1.",	1.77));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 2.",	1.77));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 3-4.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 5-6.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 22-44; стаж, лет: 7-9.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 0.",	1.77));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 1.",	1.69));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 2.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 3-4.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 5-6.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 7-9.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 25-29; стаж, лет: 10-14.",	1.01));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 0.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 1.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 2.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 3-4.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 5-6.",	1.04));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 7-9.",	1.01));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: 10-14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 30-34; стаж, лет: Более 14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 0.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 1.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 2.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 3-4.",	0.99));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 5-6.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 7-9.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: 10-14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 35-39; стаж, лет: Более 14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 0.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 1.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 2.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 3-4.",	0.99));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 5-6.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 7-9.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: 10-14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 40-49; стаж, лет: Более 14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 0.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 1.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 2.",	1.63));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 3-4.",	0.99));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 5-6.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 7-9.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: 10-14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: 50-59; стаж, лет: Более 14.",	0.96));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 0.",	1.60));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 1.",	1.60));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 2.",	1.60));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 3-4.",	0.93));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 5-6.",	0.93));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 7-9.",	0.93));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: 10-14.",	0.93));
    AgeAndExperience.add(new ListValue("Возраст, лет: старше 59; стаж, лет: Более 14.",	0.93));
    elements.add(new Element(Enum.Names.ageAndExperience.getId(),Enum.Names.ageAndExperience.getName(),
        "select", new ElementInfoSelect(Enum.Names.ageAndExperience.getInfo(), AgeAndExperience, Enum.Names.ageAndExperience.getDefaultValue())));


    // КО
//    List<ListValue> AutoCategory = new ArrayList<>();
//    AutoCategory.add(new ListValue("До 50 включительно",	0.6));


    List<ListValue> AutoInfo = new CopyOnWriteArrayList<>();
    AutoInfo.add(new ListValue("До 50 включительно",	0.6));
    AutoInfo.add(new ListValue("Свыше 50 до 70 включительно",	1.0));
    AutoInfo.add(new ListValue("Свыше 70 до 100 включительно", 1.1));
    AutoInfo.add(new ListValue("Свыше 100 до 120 включительно",	1.2));
    AutoInfo.add(new ListValue("Свыше 120 до 150 включительно",	1.4));
    AutoInfo.add(new ListValue("Свыше 150",	1.6));
    elements.add(new Element(Enum.Names.autoInfo.getId(), Enum.Names.autoInfo.getName(),
        "select", new ElementInfoSelect(Enum.Names.autoInfo.getInfo(), AutoInfo, Enum.Names.autoInfo.getDefaultValue())));


    List<ListValue> PeriodOfUse = new CopyOnWriteArrayList<>();
    PeriodOfUse.add(new ListValue("3 месяца",	0.5));
    PeriodOfUse.add(new ListValue("4 месяца",	0.6));
    PeriodOfUse.add(new ListValue("5 месяцев",	0.65));
    PeriodOfUse.add(new ListValue("6 месяцев",	0.7));
    PeriodOfUse.add(new ListValue("7 месяцев",	0.8));
    PeriodOfUse.add(new ListValue("8 месяцев",	0.9));
    PeriodOfUse.add(new ListValue("9 месяцев",	0.95));
    PeriodOfUse.add(new ListValue("10 месяцев и более",	1.0));
    elements.add(new Element(Enum.Names.periodOfUse.getId(), Enum.Names.periodOfUse.getName(),
        "select", new ElementInfoSelect(Enum.Names.periodOfUse.getInfo(), PeriodOfUse, Enum.Names.periodOfUse.getDefaultValue())));


    //result = getDefaultResult();
  }

  public Result getDefaultResult() {
    List<ListValue> el = new ArrayList<>();
    el.add(new ListValue("ТБ", 4000.0));
    el.add(new ListValue("КТ", 1.0));
    el.add(new ListValue("КБМ", 1.0));
    el.add(new ListValue("КВС", 1.0));
    //el.add(new ListValue(elemsAutoCategory, 1.0));
    el.add(new ListValue("КМ", 1.0));
    el.add(new ListValue("КС", 1.0));
    el.add(new ListValue("КО", 1.8));
    return new Result("Т = ТБ x КТ x КБМ x КВС x КМ x КС x КО",
        "Расчет страховой премии производится по формуле: ", el);
  }

  public static String getResult(Result defaultRes, List<ListValue> res) {

    System.out.println(new Gson().toJson(defaultRes.res));
    System.out.println(new Gson().toJson(res));
    for (int i = 0; i < defaultRes.res.size(); i++) {
      for (ListValue re : res) {
        if (defaultRes.res.get(i).name.equals(re.name) && !defaultRes.res.get(i).value.equals(re.value)) {
          defaultRes.res.get(i).value = re.value;
        }
      }
    }

    Double r = 1.0;
    StringBuilder result;
    result = new StringBuilder(defaultRes.info + defaultRes.formula + '\n');
    for (int i = 0; i < defaultRes.res.size(); i++){
      ListValue elem = defaultRes.res.get(i);
      //result.append(elem.name).append(" = ").append(elem.value).append("; ");
      r *= elem.value;
    }
    //result.append(" = ").append(r);
    result.append(r);
    return result.toString();
  }

  public void setElements(List<Element> elements) {
    super.setElements(elements);
  }
}
