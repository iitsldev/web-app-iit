-- CreateTable
CREATE TABLE "NewsAndEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateStr" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
