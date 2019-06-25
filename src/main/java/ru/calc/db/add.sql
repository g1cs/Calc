CREATE TABLE d74gvg78td3vu5.dbcalc.users
(
  idUser serial PRIMARY KEY NOT NULL,
  login varchar(45) NOT NULL,
  password varchar(256) NOT NULL,
  role int NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.type_calc
(
  idTypeCalc serial PRIMARY KEY NOT NULL,
  name varchar(45) NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.calc
(
  idCalc serial PRIMARY KEY NOT NULL,
  name varchar(45) NOT NULL,
  idTypeCalc int NOT NULL,
  CONSTRAINT calc_type_calc_idtypecalc_fk FOREIGN KEY (idTypeCalc) REFERENCES d74gvg78td3vu5.dbcalc.type_calc (idtypecalc)
);

CREATE TABLE d74gvg78td3vu5.dbcalc.user_calc
(
  idUser int NOT NULL,
  idCalc int NOT NULL,
  CONSTRAINT user_calc_users_iduser_fk FOREIGN KEY (idUser) REFERENCES d74gvg78td3vu5.dbcalc.users (iduser) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_calc_calc_idcalc_fk FOREIGN KEY (idCalc) REFERENCES d74gvg78td3vu5.dbcalc.calc (idcalc) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX user_calc_idcalc_uindex ON d74gvg78td3vu5.dbcalc.user_calc (idcalc);




CREATE TABLE d74gvg78td3vu5.dbcalc.type_elem
(
  idTypeElem serial PRIMARY KEY NOT NULL,
  name varchar(45) NOT NULL
);


CREATE TABLE d74gvg78td3vu5.dbcalc.elem_name
(
  idElemName serial PRIMARY KEY NOT NULL,
  name varchar(45) NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.elem_IdName
(
  idElemIdName serial PRIMARY KEY NOT NULL,
  name varchar(45) NOT NULL
);


CREATE TABLE d74gvg78td3vu5.dbcalc.list_elements
(
  idCalc int NOT NULL,
  idElem int NOT NULL,
  CONSTRAINT list_elements_user_calc_idcalc_fk FOREIGN KEY (idcalc) REFERENCES dbcalc.user_calc (idcalc) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX list_elements_idelem_uindex ON d74gvg78td3vu5.dbcalc.list_elements (idelem);
--CREATE UNIQUE INDEX list_elements_idcalc_uindex ON d74gvg78td3vu5.dbcalc.list_elements (idcalc);


CREATE TABLE d74gvg78td3vu5.dbcalc.elem
(
  idElem serial PRIMARY KEY NOT NULL,
  idElemIdName int NOT NULL,
  idElemName int NOT NULL,
  idTypeElem int NOT NULL,
  idElemData int,
  CONSTRAINT elem_elem_name_idelemname_fk FOREIGN KEY (idelemname) REFERENCES dbcalc.elem_name (idelemname),
  CONSTRAINT elem_type_elem_idtypeelem_fk FOREIGN KEY (idTypeElem) REFERENCES d74gvg78td3vu5.dbcalc.type_elem (idtypeelem),
  CONSTRAINT elem_elem_idname_idelemidaname_fk FOREIGN KEY (idElemIdName) REFERENCES d74gvg78td3vu5.dbcalc.elem_idname (idelemidname)
  --CONSTRAINT elem_list_elements_idelem_fk FOREIGN KEY (idelem) REFERENCES d74gvg78td3vu5.dbcalc.list_elements (idelem) ON DELETE CASCADE ON UPDATE CASCADE
);
-- CREATE UNIQUE INDEX list_elements_idelem_uindex ON d74gvg78td3vu5.dbcalc.list_elements (idelem);

ALTER TABLE d74gvg78td3vu5.dbcalc.list_elements ADD CONSTRAINT list_elements_elem_idelem_fk FOREIGN KEY (idelem) REFERENCES d74gvg78td3vu5.dbcalc.elem (idelem) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE d74gvg78td3vu5.dbcalc.elem_data_input
(
  idElemDataInput serial PRIMARY KEY NOT NULL,
  text varchar(1024),
  value FLOAT NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.elem_data_slider
(
  idElemDataSlider serial PRIMARY KEY NOT NULL,
  text varchar(1024),
  value FLOAT NOT NULL,
  minValue FLOAT NOT NULL,
  maxValue FLOAT NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.elem_data_select
(
  idElemDataSelect serial PRIMARY KEY NOT NULL,
  text varchar(1024),
  value FLOAT NOT NULL,
  idListValue int NOT NULL
);
CREATE UNIQUE INDEX elem_data_select_idListValue_uindex ON d74gvg78td3vu5.dbcalc.elem_data_select (idListValue);

CREATE TABLE d74gvg78td3vu5.dbcalc.data_value
(
  idDataValue serial PRIMARY KEY NOT NULL,
  text varchar(45),
  value FLOAT NOT NULL
);

CREATE TABLE d74gvg78td3vu5.dbcalc.list_value
(
  idListValue int NOT NULL,
  idDataValue int NOT NULL,
  CONSTRAINT list_value_data_value_iddatavalue_fk FOREIGN KEY (iddatavalue) REFERENCES d74gvg78td3vu5.dbcalc.data_value (iddatavalue) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT list_value_elem_data_select_idlistvalue_fk FOREIGN KEY (idListValue) REFERENCES d74gvg78td3vu5.dbcalc.elem_data_select (idlistvalue) ON DELETE CASCADE ON UPDATE CASCADE
);
-- CREATE UNIQUE INDEX list_value_idDataValue_uindex ON d74gvg78td3vu5.dbcalc.list_value (idDataValue);



INSERT INTO d74gvg78td3vu5.dbcalc.users (login, password, role) VALUES('admin', 'admin', 2);
INSERT INTO d74gvg78td3vu5.dbcalc.users (login, password, role) VALUES('user', 'user', 1);
INSERT INTO d74gvg78td3vu5.dbcalc.users (login, password, role) VALUES('user1', 'user1', 1);

INSERT INTO d74gvg78td3vu5.dbcalc.type_calc (name) VALUES ('Осаго');
INSERT INTO d74gvg78td3vu5.dbcalc.type_calc (name) VALUES ('Кредит');
INSERT INTO d74gvg78td3vu5.dbcalc.type_calc (name) VALUES ('Ипотека');

INSERT INTO d74gvg78td3vu5.dbcalc.type_elem (name) VALUES ('input');
INSERT INTO d74gvg78td3vu5.dbcalc.type_elem (name) VALUES ('select');
INSERT INTO d74gvg78td3vu5.dbcalc.type_elem (name) VALUES ('slider');
INSERT INTO d74gvg78td3vu5.dbcalc.type_elem (name) VALUES ('radio');
INSERT INTO d74gvg78td3vu5.dbcalc.type_elem (name) VALUES ('listCheckbox');

INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Базовая ставка');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Место жительства');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Класс бонуса-малуса');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Возраст и стаж водителя');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Информация о авто (мощности)');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Период использования');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Сумма кредита');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Срок кредита');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Процентная ставка');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Вид платежа');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Дифференцированный');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Аннуитетный');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Единовременная комиссия');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Ежемесячная комиссия');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Дополнительные условия');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Сумма недвижимости');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('Первоначальный взнос');

INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('ТБ');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('КТ');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('КБМ');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('КВС');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('КМ');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('КС');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('sumCredit');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('periodCredit');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('rate');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('typeCredit');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('typeCreditD');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('typeCreditA');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('oneTimeCommission');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('monthlyCommission');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('additionalConditions');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('sumRealty');
INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('initialPayment');

-- INSERT INTO d74gvg78td3vu5.dbcalc.calc (name, idTypeCalc) VALUES ('осого', 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.user_calc (idCalc, idUser) VALUES (1, 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.elem_name (name) VALUES ('sum');
-- INSERT INTO d74gvg78td3vu5.dbcalc.elem_IdName (name) VALUES ('sum');
-- INSERT INTO d74gvg78td3vu5.dbcalc.elem (idelemidname, idtypeelem, idelemdata) VALUES (1, 1, 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.list_elements (idCalc, idElem) VALUES (1, 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.elem_data_input (text, value) VALUES ('q1', 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.elem_data_select (text, value, idListValue) VALUES ('q1', 1, 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.data_value (text, value) VALUES ('qq1', 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.data_value (text, value) VALUES ('qq2', 2);
-- INSERT INTO d74gvg78td3vu5.dbcalc.list_value (idlistvalue, iddatavalue) VALUES (1, 1);
-- INSERT INTO d74gvg78td3vu5.dbcalc.list_value (idlistvalue, iddatavalue) VALUES (1, 2);
