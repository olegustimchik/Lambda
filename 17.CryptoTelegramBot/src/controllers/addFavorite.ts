import { UsersService } from "../services/users.ts";
import { FavoriteService } from "../services/favoriteCryptos.ts";
import { Controller } from "./controller.ts";
import { Message } from "node-telegram-bot-api";
import { DataGetter } from "../cryptoRestConnection/dataGetter.ts";
import { bot } from "../bot.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";


export class AddToFavoriteController extends Controller {
    private userService: UsersService;
    private favoriteService: FavoriteService;
    private dataGetter: DataGetter;
    constructor(userService: UsersService, favoriteService: FavoriteService, dataGetter: DataGetter) {
        super(/\/add_to_favorite [a-zA-Z]+$/);
        this.userService = userService;
        this.favoriteService = favoriteService;
        this.dataGetter = dataGetter;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const coin = match?.input.split(" ")[1];
        const chatId = msg.chat.id;
        if (coin === undefined) {
            bot.sendMessage(chatId, "Invalid input");
        }
        try {
            const coins = await this.dataGetter.getCoinBySymbol(coin as string);
            if (coins === undefined || coins.length < 1) {
                bot.sendMessage(chatId, "Can't add this coin");
                return;
            }
            const user = await this.userService.insertOne(chatId);
            const fav = await this.favoriteService.insertToFavorite(user.id, coins[0]); 
            bot.sendMessage(chatId, `${coin?.toUpperCase()} successfully added to your favorite list. To view the list use /list_favorite command`);
        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                bot.sendMessage(chatId, "Coin already in your list. To view the list use /list_favorite command");
            } else {
                bot.sendMessage(chatId, "Can't add or this coin in your favorite list. To view the list use /list_favorite command");
            }
        }

    }
}