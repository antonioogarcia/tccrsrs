DROP DATABASE IF EXISTS meu_banco;
CREATE DATABASE meu_banco;
USE meu_banco;

CREATE TABLE login (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(senha) > 4 AND senha REGEXP '[^a-zA-Z0-9]')
);

INSERT INTO login (email, senha) VALUES ('usuario1@example.com', 'senha@123') 
    ON DUPLICATE KEY UPDATE email = email;

INSERT INTO login (email, senha) VALUES ('usuario2@example.com', 'pass#456') 
    ON DUPLICATE KEY UPDATE email = email;

INSERT INTO login (email, senha) VALUES ('usuario3@example.com', 'myp@ssword') 
    ON DUPLICATE KEY UPDATE email = email;

INSERT INTO login (email, senha) VALUES ('usuario4@example.com', 'secure#123') 
    ON DUPLICATE KEY UPDATE email = email;

INSERT INTO login (email, senha) VALUES ('usuario5@example.com', 'ex@mple!1') 
    ON DUPLICATE KEY UPDATE email = email;
