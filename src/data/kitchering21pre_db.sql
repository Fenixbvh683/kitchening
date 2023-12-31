-- MySQL Script generated by MySQL Workbench
-- Sat Sep 23 12:10:07 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kitchering21pre_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `kitchering21pre_db` ;

-- -----------------------------------------------------
-- Schema kitchering21pre_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kitchering21pre_db` DEFAULT CHARACTER SET utf8 ;
USE `kitchering21pre_db` ;

-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`sections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `discount` INT NULL DEFAULT 0,
  `description` TEXT NOT NULL,
  `productscol` VARCHAR(45) NULL,
  `createAt` TIMESTAMP NULL,
  `updateAt` TIMESTAMP NULL,
  `categoryId` INT NOT NULL,
  `sectionId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_categories_idx` (`categoryId` ASC),
  INDEX `fk_products_sections_idx` (`sectionId` ASC),
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`categoryId`)
    REFERENCES `kitchering21pre_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_sections`
    FOREIGN KEY (`sectionId`)
    REFERENCES `kitchering21pre_db`.`sections` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(255) NOT NULL,
  `main` TINYINT NULL,
  `productId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_images_products_idx` (`productId` ASC),
  CONSTRAINT `fk_images_products`
    FOREIGN KEY (`productId`)
    REFERENCES `kitchering21pre_db`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`rols` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rolId` INT NOT NULL,
  `createAt` TIMESTAMP NULL,
  `updateAt` TIMESTAMP NULL,
  `deleteAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_rols_idx` (`rolId` ASC),
  CONSTRAINT `fk_users_rols`
    FOREIGN KEY (`rolId`)
    REFERENCES `kitchering21pre_db`.`rols` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`addreses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`addreses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `province` VARCHAR(255) NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_addreses_users_idx` (`userId` ASC),
  CONSTRAINT `fk_addreses_users`
    FOREIGN KEY (`userId`)
    REFERENCES `kitchering21pre_db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`statuses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` INT NOT NULL,
  `createAt` TIMESTAMP NULL,
  `statusId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_statusses_idx` (`statusId` ASC),
  INDEX `fk_orders_users_idx` (`userId` ASC),
  CONSTRAINT `fk_orders_statusses`
    FOREIGN KEY (`statusId`)
    REFERENCES `kitchering21pre_db`.`statuses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`userId`)
    REFERENCES `kitchering21pre_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kitchering21pre_db`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kitchering21pre_db`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL DEFAULT 1,
  `productId` INT NULL,
  `orderId` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_products_idx` (`productId` ASC),
  INDEX `fk_items_orders_idx` (`orderId` ASC),
  CONSTRAINT `fk_items_products`
    FOREIGN KEY (`productId`)
    REFERENCES `kitchering21pre_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_orders`
    FOREIGN KEY (`orderId`)
    REFERENCES `kitchering21pre_db`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
