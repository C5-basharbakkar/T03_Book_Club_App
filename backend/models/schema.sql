
 DROP DATABASE E_BookClub;
CREATE DATABASE E_BookClub;

USE E_BookClub;



CREATE TABLE roles(
id INT AUTO_INCREMENT NOT NULL,
    role  VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);


CREATE TABLE books(
    id INT AUTO_INCREMENT NOT NULL,
    bookName VARCHAR(255),
    createDate date,
    pagesNumber INT UNSIGNED,
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0,
    Author varchar(255),
    rate int UNSIGNED,
    description varchar(1000) ,
    category varchar(255),
    image BLOB,
    
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),
    country VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    role_id INT,
    avatar BLOB ,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE rooms(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    book_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0
);
CREATE TABLE readingList(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id),
is_deleted TINYINT DEFAULT 0

);


CREATE TABLE room_user(
    id INT AUTO_INCREMENT NOT NULL,
    book_id INT,
     room_id INT,
    user_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);


CREATE TABLE suggest(
    id INT AUTO_INCREMENT NOT NULL,
    suggest VARCHAR(1000),
    suggester INT,
    FOREIGN KEY(suggester) REFERENCES users(id),
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0
);
CREATE TABLE viewReading(
    id INT AUTO_INCREMENT NOT NULL,
    book_id INT,
    user_id INT,
    readingList_id INT,
    FOREIGN KEY (readingList_id) REFERENCES readingList(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id),
    is_deleted TINYINT DEFAULT 0
);
CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);
CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);
CREATE TABLE comment(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    commenter INT,
    room_id INT,
    FOREIGN KEY (commenter) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    PRIMARY KEY(id)
);
