-- CreateTable
CREATE TABLE "institute"."batchMaster" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."batchStudent" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
    "fk_student_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchStudent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."batchMaster" ADD CONSTRAINT "batchMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudent" ADD CONSTRAINT "batchStudent_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudent" ADD CONSTRAINT "batchStudent_fk_student_id_fkey" FOREIGN KEY ("fk_student_id") REFERENCES "students"."studentMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
