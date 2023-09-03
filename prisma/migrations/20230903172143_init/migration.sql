-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "blogs";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "institute";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "locations";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "students";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "teacher";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "website";

-- CreateTable
CREATE TABLE "public"."designation" (
    "id" UUID NOT NULL,
    "roles" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations"."country" (
    "id" UUID NOT NULL,
    "CounrtyName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations"."state" (
    "id" UUID NOT NULL,
    "stateName" TEXT NOT NULL,
    "fkCountryId" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations"."city" (
    "id" UUID NOT NULL,
    "cityName" TEXT NOT NULL,
    "fkCountryId" UUID NOT NULL,
    "fkstateId" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."admin" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students"."studentMaster" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "admissionId" TEXT NOT NULL,
    "profileImg" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "fk_institute_id" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students"."studentDocuments" (
    "id" UUID NOT NULL,
    "fkStudentId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "docUrl" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students"."studentAddress" (
    "id" UUID NOT NULL,
    "fkStudentId" UUID NOT NULL,
    "fkcountryId" UUID NOT NULL,
    "fkstateId" UUID NOT NULL,
    "fkcityId" UUID NOT NULL,
    "Address" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher"."teacherMaster" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "profileImg" TEXT NOT NULL,
    "joiningDate" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "onMaintaince" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacherMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher"."teacherExprience" (
    "id" UUID NOT NULL,
    "fkTeacherId" UUID NOT NULL,
    "skills" JSONB[],
    "experience" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacherExprience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher"."teacherDocuments" (
    "id" UUID NOT NULL,
    "fkTeacherId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "docUrl" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacherDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher"."teacherAddress" (
    "id" UUID NOT NULL,
    "fkTeacherId" UUID NOT NULL,
    "fkcountryId" UUID NOT NULL,
    "fkstateId" UUID NOT NULL,
    "fkcityId" UUID NOT NULL,
    "Address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacherAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."instituteMaster" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "profileImg" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "onMaintaince" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instituteMaster_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "institute"."instituteLogin" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "maintaince_password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instituteLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "designation_roles_key" ON "public"."designation"("roles");

-- CreateIndex
CREATE UNIQUE INDEX "country_CounrtyName_key" ON "locations"."country"("CounrtyName");

-- CreateIndex
CREATE UNIQUE INDEX "state_stateName_key" ON "locations"."state"("stateName");

-- CreateIndex
CREATE INDEX "state_fkCountryId_idx" ON "locations"."state"("fkCountryId");

-- CreateIndex
CREATE INDEX "city_fkstateId_idx" ON "locations"."city"("fkstateId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "users"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "users"."admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "studentMaster_email_key" ON "students"."studentMaster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "studentMaster_phone_key" ON "students"."studentMaster"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "studentMaster_admissionId_key" ON "students"."studentMaster"("admissionId");

-- CreateIndex
CREATE UNIQUE INDEX "teacherMaster_email_key" ON "teacher"."teacherMaster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teacherMaster_phone_key" ON "teacher"."teacherMaster"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "instituteMaster_code_key" ON "institute"."instituteMaster"("code");

-- CreateIndex
CREATE UNIQUE INDEX "instituteMaster_email_key" ON "institute"."instituteMaster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instituteMaster_phone_key" ON "institute"."instituteMaster"("phone");

-- AddForeignKey
ALTER TABLE "locations"."state" ADD CONSTRAINT "state_fkCountryId_fkey" FOREIGN KEY ("fkCountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations"."city" ADD CONSTRAINT "city_fkCountryId_fkey" FOREIGN KEY ("fkCountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations"."city" ADD CONSTRAINT "city_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentMaster" ADD CONSTRAINT "studentMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentDocuments" ADD CONSTRAINT "studentDocuments_fkStudentId_fkey" FOREIGN KEY ("fkStudentId") REFERENCES "students"."studentMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkStudentId_fkey" FOREIGN KEY ("fkStudentId") REFERENCES "students"."studentMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherExprience" ADD CONSTRAINT "teacherExprience_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherDocuments" ADD CONSTRAINT "teacherDocuments_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteLogin" ADD CONSTRAINT "instituteLogin_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
