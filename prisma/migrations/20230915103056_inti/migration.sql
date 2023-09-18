/*
  Warnings:

  - Added the required column `fk_bacth_id` to the `batchLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."batchLink" ADD COLUMN     "fk_bacth_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "institute"."batchLink" ADD CONSTRAINT "batchLink_fk_bacth_id_fkey" FOREIGN KEY ("fk_bacth_id") REFERENCES "institute"."batchMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
