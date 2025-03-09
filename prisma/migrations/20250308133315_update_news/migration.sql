/*
  Warnings:

  - You are about to drop the column `dateStr` on the `NewsAndEvent` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `NewsAndEvent` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsAndEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT
);
INSERT INTO "new_NewsAndEvent" ("date", "description", "id", "image", "title", "type") SELECT "date", "description", "id", "image", "title", "type" FROM "NewsAndEvent";
DROP TABLE "NewsAndEvent";
ALTER TABLE "new_NewsAndEvent" RENAME TO "NewsAndEvent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
