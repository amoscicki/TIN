SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `FQ` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `FQ`;

INSERT INTO `User` (`userId`, `email`, `passwordHash`, `userAuthToken`, `createdAt`, `updatedAt`, `roleId`, `avatar`, `avatarName`, `avatarType`, `name`) VALUES
('3e8f6309-389c-419c-b0a7-101651b79783', 'user@fq.user', '$2b$10$0ljA.J8KvvR5OInncSXGoOG.5wKBcX.CmcTxXc23N6I/i6u3lEPaC', '1533bfd7-9ebd-4256-a68b-ba0bb317828d', '2024-01-07 06:54:19.862', '2024-01-13 22:16:44.702', 2, NULL, NULL, NULL, NULL);
INSERT INTO `User` (`userId`, `email`, `passwordHash`, `userAuthToken`, `createdAt`, `updatedAt`, `roleId`, `avatar`, `avatarName`, `avatarType`, `name`) VALUES
