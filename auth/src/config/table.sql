CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username BIGINT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    RefreshToken VARCHAR(255) Default NULL,
    PRIMARY KEY (id)    
);