DROP DATABASE IF EXISTS sampoll;
CREATE DATABASE sampoll;
ALTER DATABASE sampoll CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE sampoll;

-- DROP TABLE IF EXISTS contacts;
-- DROP TABLE IF EXISTS meetings;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  username                VARCHAR(255) UNIQUE NOT NULL,
  `password`              VARCHAR(255) NOT NULL,
  creation_time           TIMESTAMP NOT NULL DEFAULT NOW(),
  email                   VARCHAR(255) UNIQUE NOT NULL,
  subscription            TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE meetings (
  id                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id                 INTEGER NOT NULL,
  start_time              DATETIME NOT NULL,
  end_time                DATETIME NOT NULL,
  detail                  TEXT,
  contacts                JSON,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE contacts (
  id                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id                 INTEGER NOT NULL,
  first_name              VARCHAR(255) NOT NULL,
  last_name               VARCHAR(255) NOT NULL,
  email                   VARCHAR(255) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, `password`, email)
VALUES 
("test1", "$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm", "test1@test.com"),
("test2", "$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm", "test2@test.com"),
("test3", "$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm", "test3@test.com"),
("test4", "$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm", "test4@test.com"),
("test5", "$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm", "test5@test.com");

INSERT INTO meetings (user_id, start_time, end_time, detail, `contacts`)
VALUES 
(1, NOW(), NOW(), "NOTHING TO NOTE", '{ "contact_ids": [1, 2] }'),
(1, NOW(), NOW(), "NOTHING TO NOTE", '{ "contact_ids": [] }'),
(3, NOW(), NOW(), "NOTHING TO NOTE", '{ "contact_ids": [3] }'),
(4, NOW(), NOW(), "NOTHING TO NOTE", '{ "contact_ids": [4] }'),
(5, NOW(), NOW(), "NOTHING TO NOTE", '{ "contact_ids": [5] }');

INSERT INTO contacts (user_id, first_name, last_name, email)
VALUES
(1, "Bob1", "Bobo", "bob1@bob.com"),
(1, "Bob2", "Bobo", "bob1@bob.com"),
(3, "Bob3", "Bobo", "bob1@bob.com"),
(4, "Bob4", "Bobo", "bob1@bob.com"),
(5, "Bob5", "Bobo", "bob1@bob.com");
