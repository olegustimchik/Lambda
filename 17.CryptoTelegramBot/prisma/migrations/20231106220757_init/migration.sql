/*
  Warnings:

  - A unique constraint covering the columns `[userId,coinSymbol]` on the table `FavoriteCryptos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCryptos_userId_coinSymbol_key" ON "FavoriteCryptos"("userId", "coinSymbol");
