-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "jobLocation" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "requirements" TEXT[],
    "preferredQualifications" TEXT[],
    "applicationInstructions" TEXT NOT NULL,
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addedBy" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobRole_fkey" FOREIGN KEY ("jobRole") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
