-- CreateTable
CREATE TABLE "institute"."batchAssignments" (
    "id" UUID NOT NULL,
    "fk_teacher_id" UUID NOT NULL,
    "fk_batch_id" UUID NOT NULL,
    "contents" TEXT NOT NULL,
    "assignment_date" DATE NOT NULL,
    "submission_date" DATE NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchAssignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."batchStudentsAssignment" (
    "id" UUID NOT NULL,
    "fk_student_id" UUID NOT NULL,
    "fk_batch_id" UUID NOT NULL,
    "contents" TEXT NOT NULL,
    "submission_date" DATE NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instituteMasterId" UUID,

    CONSTRAINT "batchStudentsAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."batchAssignments" ADD CONSTRAINT "batchAssignments_fk_teacher_id_fkey" FOREIGN KEY ("fk_teacher_id") REFERENCES "teacher"."teacherMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchAssignments" ADD CONSTRAINT "batchAssignments_fk_batch_id_fkey" FOREIGN KEY ("fk_batch_id") REFERENCES "institute"."batchMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" ADD CONSTRAINT "batchStudentsAssignment_fk_student_id_fkey" FOREIGN KEY ("fk_student_id") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" ADD CONSTRAINT "batchStudentsAssignment_fk_batch_id_fkey" FOREIGN KEY ("fk_batch_id") REFERENCES "institute"."batchMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" ADD CONSTRAINT "batchStudentsAssignment_instituteMasterId_fkey" FOREIGN KEY ("instituteMasterId") REFERENCES "institute"."instituteMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
