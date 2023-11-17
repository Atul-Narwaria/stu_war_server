/*
  Warnings:

  - You are about to drop the column `start_date` on the `assignmentMaster` table. All the data in the column will be lost.
  - Added the required column `fk_assignment_type` to the `assignmentMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."assignmentMaster" DROP COLUMN "start_date",
ADD COLUMN     "fk_assignment_type" UUID NOT NULL,
ADD COLUMN     "repeat" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "institute"."assignmentType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignmentType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."assignmentMaster" ADD CONSTRAINT "assignmentMaster_fk_assignment_type_fkey" FOREIGN KEY ("fk_assignment_type") REFERENCES "institute"."assignmentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
