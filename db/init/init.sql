

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  f_name VARCHAR(100) NOT NULL,
  l_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_role VARCHAR(100) NOT NULL
);

INSERT INTO users (f_name,l_name,email,user_password,user_role) VALUES 
('talia','atia','taliaat@gmail.com','1234','admin'),
('yossi','cohen','yossi@gmail.com','1234','user');

CREATE TABLE IF NOT EXISTS vacations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  v_destinition VARCHAR(100) NOT NULL,
  v_description VARCHAR(100) NOT NULL,
  v_from_date DATETIME NOT NULL,
  v_to_date DATETIME NOT NULL,
  v_price INT NOT NULL,
  v_picture_url VARCHAR(100) NOT NULL
);

INSERT INTO vacations (v_destinition, v_description,v_from_date,v_to_date,v_price,v_picture_url) VALUES
('france','paris','2025-10-15 08:00:00','2025-10-22 12:00:00',5213,'some_url'),
('israel','tel-aviv','2025-11-15 08:00:00','2025-11-23 12:00:00',5213,'some_url'),
('UK','london','2025-10-18 08:00:00','2025-10-25 12:00:00',5213,'some_url'),
('spain','madrid','2025-12-15 08:00:00','2025-12-22 12:00:00',5213,'some_url'),
('italy','milano','2025-12-29 08:00:00','2026-01-05 12:00:00',5213,'some_url'),
('italy','rome','2026-01-15 08:00:00','2026-01-22 12:00:00',5213,'some_url'),
('france','paris','2026-02-01 08:00:00','2026-02-06 12:00:00',5213,'some_url'),
('israel','tel-aviv','2026-02-15 08:00:00','2026-02-20 12:00:00',5213,'some_url'),
('UK','manchester','2026-03-15 08:00:00','2026-03-22 12:00:00',5213,'some_url'),
('spain','barcelona','2026-03-20 08:00:00','2026-03-26 12:00:00',5213,'some_url');

CREATE TABLE IF NOT EXISTS followers (
  user_id INT NOT NULL,
  vacation_id INT NOT NULL,
  PRIMARY KEY (user_id, vacation_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (vacation_id) REFERENCES vacations(id)
);

INSERT INTO followers (user_id,vacation_id) VALUES (2,2),(2,3);
