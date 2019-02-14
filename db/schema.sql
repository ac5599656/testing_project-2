DROP DATABASE IF EXISTS alcoholic_beverages_db;
CREATE DATABASE alcoholic_beverages_db;
USE alcoholic_beverages_db;


CREATE TABLE beers
(
	id INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
    category VARCHAR(50),
    abv DECIMAL(4,2) NOT NULL,
    volume_OZ DECIMAL(3,1) NOT NULL,
	consumed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE wines
(
	id INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
    category VARCHAR(50),
    abv DECIMAL(4,2) NOT NULL,
    volume_OZ DECIMAL(3,1) NOT NULL,
	consumed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE spirits
(
	id INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
    category VARCHAR(50),
    abv DECIMAL(4,2) NOT NULL,
    volume_OZ DECIMAL(3,1) NOT NULL,
	consumed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE people
(
	id INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	age TINYINT NOT NULL,
	gender VARCHAR(20) NOT NULL,
    height VARCHAR(50) NOT NULL,
    `weight` SMALLINT NOT NULL,
	PRIMARY KEY (id)
);