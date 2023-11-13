import { UsersService } from "./services/users-service.ts";
import { FavoriteService } from "./services/favorite-cryptos-service.ts";
import { DataGetter } from "./cryptoRestConnection/data-getter.ts"
import { PrismaClient } from "@prisma/client";
import { StartController } from "./controllers/start-controller.ts";
import { bot } from "./bot.ts";
import { HelpController } from "./controllers/help-conroller.ts";
import { AddToFavoriteController } from "./controllers/add-favorit-controller.ts";
import { ListRecentController } from "./controllers/list-recent-controller.ts";
import { CoinController } from "./controllers/coin-controller.ts";
import { FavoriteListController } from "./controllers/favorite-list-controller.ts";
import { deepStrictEqual } from "assert";
import { DeleteFavoriteController } from "./controllers/delete-favorite-controller.ts";
const prism = new PrismaClient();
const dataGetter = new DataGetter("http://localhost:3000", {});

const usersService = new UsersService(prism);
const startController = new StartController(usersService);

const favoriteCryptosService = new FavoriteService(prism);

const helpController = new HelpController();

const addToFavoriteController = new AddToFavoriteController(usersService, favoriteCryptosService, dataGetter);

const listRecentController = new ListRecentController(dataGetter);
const addFavoriteController = new AddToFavoriteController(usersService, favoriteCryptosService, dataGetter);

const coinController = new CoinController(usersService, favoriteCryptosService, dataGetter);

const favoriteListController = new FavoriteListController(usersService, favoriteCryptosService, dataGetter);

const deleteFavoriteController = new DeleteFavoriteController(usersService, favoriteCryptosService, dataGetter);

bot.onText(startController.getCommand(), startController.onCommand);
bot.onText(helpController.getCommand(), helpController.onCommand);
bot.onText(addToFavoriteController.getCommand(), addToFavoriteController.onCommand);
bot.onText(listRecentController.getCommand(), listRecentController.onCommand);
bot.onText(coinController.getCommand(), coinController.onCommand);
bot.onText(favoriteListController.getCommand(), favoriteListController.onCommand);
bot.onText(deleteFavoriteController.getCommand(), deleteFavoriteController.onCommand);
bot.on("callback_query", coinController.onCallbackQuery);

// bot.onText(/\/addToFavorite [a-zA-Z]+$/, async (msg, match) => {
//
// });

