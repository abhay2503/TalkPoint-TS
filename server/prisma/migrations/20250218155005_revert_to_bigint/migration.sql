-- CreateTable
CREATE TABLE "FeedBack" (
    "id" BIGINT NOT NULL,
    "upvoteCount" INTEGER NOT NULL,
    "badgeLetter" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);
