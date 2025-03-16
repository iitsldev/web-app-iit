-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "titleColor" TEXT NOT NULL,
    "arrowColor" TEXT NOT NULL
);
