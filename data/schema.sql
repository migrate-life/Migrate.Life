DROP TABLE IF EXISTS myCities, temps;

CREATE TABLE IF NOT EXISTS temps (
  id SERIAL PRIMARY KEY,
  tempRange VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS myCities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  latitude NUMERIC(8,6),
  longitude NUMERIC(9,6),
  temp INTEGER, 
  health VARCHAR(255),
  property VARCHAR(255),
  climate VARCHAR(255),
  milk VARCHAR(255),
  beer VARCHAR(255),
  gas VARCHAR(255),
  internet VARCHAR(255),
  temps_id INTEGER NOT NULL,
  FOREIGN KEY (temps_id) REFERENCES temps (id)
);

INSERT INTO temps (tempRange) VALUES ('hot');
INSERT INTO temps (tempRange) VALUES ('warm');
INSERT INTO temps (tempRange) VALUES ('cool');
INSERT INTO temps (tempRange) VALUES ('cold');