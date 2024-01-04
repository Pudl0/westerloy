/*
  Warnings:

  - You are about to drop the `evententries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `newsentries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `evententries`;

-- DropTable
DROP TABLE `newsentries`;

-- CreateTable
CREATE TABLE `EventEntries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `timeOfEvent` DATETIME(0) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `pictureLink` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsEntries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `shortDescription` VARCHAR(250) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `pictureLink` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecapEntries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `shortDescription` VARCHAR(250) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `folderLink` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
