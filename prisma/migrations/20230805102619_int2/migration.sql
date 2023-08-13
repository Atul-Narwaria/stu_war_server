/*
  Warnings:

  - You are about to drop the `instituteAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "teacher"."instituteAddress" DROP CONSTRAINT "instituteAddress_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkcityId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkcountryId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkstateId_fkey";

-- DropTable
DROP TABLE "teacher"."instituteAddress";

-- CreateTable
CREATE TABLE "institute"."instituteAddress" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
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
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
