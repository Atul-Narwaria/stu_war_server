-- CreateTable
CREATE TABLE "institute"."assignmentMaster" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignmentMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."assignmentWork" (
    "id" UUID NOT NULL,
    "fk_assignmentmaster_id" UUID NOT NULL,
    "fk_sub_course_id" UUID,
    "fk_stundet_id" UUID NOT NULL,
    "remarks" TEXT,
    "submissionDate" DATE NOT NULL,
    "work" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignmentWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assignmentMaster_name_key" ON "institute"."assignmentMaster"("name");

-- AddForeignKey
ALTER TABLE "institute"."assignmentWork" ADD CONSTRAINT "assignmentWork_fk_assignmentmaster_id_fkey" FOREIGN KEY ("fk_assignmentmaster_id") REFERENCES "institute"."assignmentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."assignmentWork" ADD CONSTRAINT "assignmentWork_fk_sub_course_id_fkey" FOREIGN KEY ("fk_sub_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."assignmentWork" ADD CONSTRAINT "assignmentWork_fk_stundet_id_fkey" FOREIGN KEY ("fk_stundet_id") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
