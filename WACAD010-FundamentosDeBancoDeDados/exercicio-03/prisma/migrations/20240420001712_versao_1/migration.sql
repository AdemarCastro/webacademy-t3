-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(120) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `numeros_celular` VARCHAR(50) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `data_nascimento` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `clientes_cpf_key`(`cpf`),
    UNIQUE INDEX `clientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `ts_adiciona` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ts_exclui` DATETIME(3) NULL,
    `id_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(191) NOT NULL,
    `fabricante` VARCHAR(191) NOT NULL,
    `preco_base` DOUBLE NOT NULL,
    `estoque` VARCHAR(191) NOT NULL,
    `id_subcategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Numero_de_Serie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_serie` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `ts_adiciona` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ts_vende` DATETIME(3) NULL,
    `id_produto` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `desconto` VARCHAR(191) NOT NULL,
    `forma_pagamento` VARCHAR(191) NOT NULL,
    `total_compra` DOUBLE NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalhes_Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_compra` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `id_numero_de_serie` INTEGER NOT NULL,

    UNIQUE INDEX `Detalhes_Compra_id_numero_de_serie_key`(`id_numero_de_serie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategoria` ADD CONSTRAINT `Subcategoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_subcategoria_fkey` FOREIGN KEY (`id_subcategoria`) REFERENCES `Subcategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Numero_de_Serie` ADD CONSTRAINT `Numero_de_Serie_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalhes_Compra` ADD CONSTRAINT `Detalhes_Compra_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `Compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalhes_Compra` ADD CONSTRAINT `Detalhes_Compra_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalhes_Compra` ADD CONSTRAINT `Detalhes_Compra_id_numero_de_serie_fkey` FOREIGN KEY (`id_numero_de_serie`) REFERENCES `Numero_de_Serie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
