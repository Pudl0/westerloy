-- CreateTable
CREATE TABLE `evententries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `timeOfEvent` DATETIME(0) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `pictureLink` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsentries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `shortDescription` VARCHAR(250) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `pictureLink` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
