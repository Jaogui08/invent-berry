/*
  Warnings:

  - You are about to drop the column `rfid` on the `patrimonio` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `patrimonio_rfid_key` ON `patrimonio`;

-- AlterTable
ALTER TABLE `patrimonio` DROP COLUMN `rfid`;
