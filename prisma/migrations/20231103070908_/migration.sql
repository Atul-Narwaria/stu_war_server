/*
  Warnings:

  - A unique constraint covering the columns `[fk_institute_id,name]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_institute_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "fk_institute_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_fk_institute_id_name_key" ON "public"."events"("fk_institute_id", "name");

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
