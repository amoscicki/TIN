

INSERT INTO `Role` (`roleId`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2024-01-07 06:54:19.414', '2024-01-07 06:54:19.414'),
(2, 'user', '2024-01-07 06:54:19.457', '2024-01-07 06:54:19.457');



INSERT INTO `User` (`userId`, `email`, `passwordHash`, `userAuthToken`, `createdAt`, `updatedAt`, `roleId`, `avatar`, `avatarName`, `avatarType`, `name`) VALUES
('3e8f6309-389c-419c-b0a7-101651b79783', 'user@fq.user', '$2b$10$0ljA.J8KvvR5OInncSXGoOG.5wKBcX.CmcTxXc23N6I/i6u3lEPaC', '1533bfd7-9ebd-4256-a68b-ba0bb317828d', '2024-01-07 06:54:19.862', '2024-01-13 22:16:44.702', 2, NULL, NULL, NULL, NULL);
INSERT INTO `User` (`userId`, `email`, `passwordHash`, `userAuthToken`, `createdAt`, `updatedAt`, `roleId`, `avatar`, `avatarName`, `avatarType`, `name`) VALUES