import { UsersService } from "./services/users.ts";
import { FavoriteService } from "./services/favoriteCryptos.ts";
import { DataGetter } from "./cryptoRestConnection/dataGetter.ts"
import { PrismaClient } from "@prisma/client";
import { StartController } from "./controllers/start.ts";
import { bot } from "./bot.ts";
import { HelpController } from "./controllers/help.ts";
import { AddToFavoriteController } from "./controllers/addFavorite.ts";
import { ListRecentController } from "./controllers/listRecent.ts";
import { CoinController } from "./controllers/coin.ts";
import { FavoriteListController } from "./controllers/favoriteList.ts";
import { deepStrictEqual } from "assert";
import { DeleteFavoriteController } from "./controllers/deleteFavorite.ts";
import { FavoriteRepository } from "./repositories/favoriteCryptos.ts";
import { UsersRepository } from "./repositories/users.ts";

const prism = new PrismaClient();
const dataGetter = new DataGetter("http://localhost:3000", {});

const usersRepository = new UsersRepository(prism);
const usersService = new UsersService(usersRepository);
const startController = new StartController(usersService);

const favoriteRepository = new FavoriteRepository(prism);
const favoriteCryptosService = new FavoriteService(favoriteRepository);

const helpController = new HelpController();
const addToFavoriteController = new AddToFavoriteController(usersService, favoriteCryptosService, dataGetter);
const listRecentController = new ListRecentController(dataGetter);
const coinController = new CoinController(usersService, favoriteCryptosService, dataGetter);
const favoriteListController = new FavoriteListController(usersService, favoriteCryptosService, dataGetter);
const deleteFavoriteController = new DeleteFavoriteController(usersService, favoriteCryptosService, dataGetter);

const flag = await bot.setMyCommands([{ command: "list_recent", description: "sends list of popular coins from several markets" },
{ command: "add_to_favorite", description: "adds selected coin to you favorite list " },
{ command: "lis_favorite", description: "sends list of your favorites" },
{ command: "delete_favorite", description: "deletes coin from your favorite" },
{ command: "help", description: "sends information about this bot, and list of commands"}
],);

bot.onText(startController.getCommand(), startController.onCommand);
bot.onText(helpController.getCommand(), helpController.onCommand);
bot.onText(addToFavoriteController.getCommand(), addToFavoriteController.onCommand);
bot.onText(listRecentController.getCommand(), listRecentController.onCommand);
bot.onText(coinController.getCommand(), coinController.onCommand);
bot.onText(favoriteListController.getCommand(), favoriteListController.onCommand);
bot.onText(deleteFavoriteController.getCommand(), deleteFavoriteController.onCommand);
bot.on("callback_query", coinController.onCallbackQuery);


