/*
  Warnings:

  - You are about to drop the column `dob` on the `instituteMaster` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `instituteMaster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "institute"."instituteMaster" DROP COLUMN "dob",
DROP COLUMN "gender";

-- CreateTable
CREATE TABLE "teacher"."instituteAddress" (
    "id" UUID NOT NULL,
    "fkcountryId" UUID NOT NULL,
    "fkstateId" UUID NOT NULL,
    "fkcityId" UUID NOT NULL,
    "Address" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instituteAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teacher"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
