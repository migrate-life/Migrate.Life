DROP TABLE IF EXISTS cities, indices;

CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  latitude NUMERIC(8,6),
  longitude NUMERIC(9,6),
  temp INTEGER
);

CREATE TABLE IF NOT EXISTS indices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  health VARCHAR(255),
  property VARCHAR(255),
  climate VARCHAR(255), 
  cities_id INTEGER NOT NULL,
  FOREIGN KEY (cities_id) REFERENCES cities (id)
);