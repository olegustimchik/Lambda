-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteCryptos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER,
    "coinSymbol" TEXT NOT NULL,
    CONSTRAINT "FavoriteCryptos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_telegramId_key" ON "Users"("telegramId");
