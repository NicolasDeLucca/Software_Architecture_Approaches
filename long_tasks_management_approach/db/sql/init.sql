-- create mysql database
CREATE DATABASE IF NOT EXISTS scenery1;
USE scenery1;

DROP TABLE IF EXISTS tasks;
-- create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) DEFAULT 'New Task',
  status ENUM('waiting', 'active', 'completed') DEFAULT 'waiting'
);