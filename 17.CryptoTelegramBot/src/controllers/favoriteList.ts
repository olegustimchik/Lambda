import { UsersService } from "../services/users.ts";
import { FavoriteService } from "../services/favoriteCryptos.ts";
import { Controller } from "./controller.ts";
import { Message } from "node-telegram-bot-api";
import { DataGetter } from "../cryptoRestConnection/dataGetter.ts";
import { bot } from "../bot.ts";

export class FavoriteListController extends Controller {
    private userService: UsersService;
    private favoriteService: FavoriteService;
    private dataGetter: DataGetter;
    constructor(userService: UsersService, favoriteService: FavoriteService, dataGetter: DataGetter) {
        super(/\/list_favorite/);
        this.userService = userService;
        this.favoriteService = favoriteService;
        this.dataGetter = dataGetter;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const chatId = msg.chat.id;
        try {
            const user = await this.userService.insertOne(chatId);
            const coins = await this.favoriteService.getFavoriteByUserId(user.id);
            const prices = await this.dataGetter.getCoinsPrice(coins.map(coin => coin.coinSymbol), "15m");
            if (coins.length > 0 && prices !== undefined) {
                bot.sendMessage(chatId, prices.join("\n"));
            } else {
                bot.sendMessage(chatId, "Can't review your favorite list. Or it is empty");
            }

        } catch (err) {
            bot.sendMessage(chatId, "Something went wrong, try again");
        }
    }
}
