package ru.calc.model;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.reflect.TypeToken;
import ru.calc.model.Elements.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CalcIpoteka extends CalcCredit {

  public CalcIpoteka(String name) {
    super(name);
  }

  public void init() {
    super.init();
    type = "Ипотека";
    elements.add(new Element(Enum.Names.initialPayment.getId(), Enum.Names.initialPayment.getName(),
        "input", new ElementInfoInput(Enum.Names.initialPayment.getInfo(), Enum.Names.initialPayment.getDefaultValue())));
  }

  public Result getDefaultResult() {

    Result r = super.getDefaultResult();
    r.res.add(new ListValue(Enum.Names.initialPayment.getId(), Enum.Names.initialPayment.getDefaultValue()));
    return r;
  }

  public static String getResult(Result defaultRes, List<Element> res) {
    return CalcCredit.getResult(defaultRes, res);
  }
}

