-- SET UP SCHEMA HERE

CREATE DATABASE IF NOT EXISTS bad_movies;

USE bad_movies;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'favorites'
-- 
-- ---

DROP TABLE IF EXISTS `favorites`;
		
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` INTEGER NOT NULL auto_increment , 
  `title` VARCHAR(255) DEFAULT NULL, 
  `year` INTEGER DEFAULT 0, 
  `rating` DECIMAL DEFAULT 0, 
  `tmdb_id` INTEGER NOT NULL, 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL, 
  PRIMARY KEY (`id`));

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `favorites` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `favorites` (`id`,`title`,`year`,`rating`,`tmdb_id`) VALUES
-- ('','','','','');