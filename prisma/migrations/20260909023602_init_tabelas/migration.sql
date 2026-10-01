-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tipo` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `leitorId` VARCHAR(255) NULL,

    UNIQUE INDEX `sala_leitorId_key`(`leitorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patrimonio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `numeroPatrimonio` VARCHAR(255) NOT NULL,
    `rfid` VARCHAR(255) NULL,
    `status` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(500) NULL,
    `salaId` INTEGER NULL,

    UNIQUE INDEX `patrimonio_numeroPatrimonio_key`(`numeroPatrimonio`),
    UNIQUE INDEX `patrimonio_rfid_key`(`rfid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(50) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patrimonioId` INTEGER NOT NULL,
    `salaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patrimonio` ADD CONSTRAINT `patrimonio_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `sala`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_patrimonioId_fkey` FOREIGN KEY (`patrimonioId`) REFERENCES `patrimonio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
