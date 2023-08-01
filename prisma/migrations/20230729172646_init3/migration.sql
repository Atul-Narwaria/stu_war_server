/*
  Warnings:

  - Added the required column `fkCountryId` to the `city` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations"."city" ADD COLUMN     "fkCountryId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "locations"."city" ADD CONSTRAINT "city_fkCountryId_fkey" FOREIGN KEY ("fkCountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
