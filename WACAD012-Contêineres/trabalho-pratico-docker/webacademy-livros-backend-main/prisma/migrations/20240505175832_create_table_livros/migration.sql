-- CreateTable
CREATE TABLE `livros` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `sinopse` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `autores` JSON NOT NULL,
    `url_imagem` VARCHAR(191) NULL,

    UNIQUE INDEX `livros_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
