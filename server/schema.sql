CREATE DATABASE chat;

USE chat;

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL DEFAULT 'Hello!',
  `username` VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
  `roomname` VARCHAR(255) NOT NULL DEFAULT 'lobby',
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

