-- CreateTable
CREATE TABLE "WebsiteStats" (
    "id" TEXT NOT NULL,
    "users" INTEGER NOT NULL DEFAULT 0,
    "orders" INTEGER NOT NULL DEFAULT 0,
    "websiteVisits" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteStats_pkey" PRIMARY KEY ("id")
);
