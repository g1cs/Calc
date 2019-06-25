CREATE SCHEMA dbcalc;
CREATE TABLE dbcalc.users
(
  idUser serial PRIMARY KEY NOT NULL,
  login varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  role int NOT NULL
);
