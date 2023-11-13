import { UsersService } from "../services/users-service.ts";
import { FavoriteService } from "../services/favorite-cryptos-service.ts";
import { Controller } from "./controller.ts";
import { Message } from "node-telegram-bot-api";
import { DataGetter } from "../cryptoRestConnection/data-getter.ts";
import { bot } from "../bot.ts";

export class FavoriteListController extends Controller {
    private userService: UsersService;
    private favoriteService: FavoriteService;
    private dataGetter: DataGetter;
    constructor(userService: UsersService, favoriteService: FavoriteService, dataGetter: DataGetter) {
        super(/\/listFavorite/);
        this.userService = userService;
        this.favoriteService = favoriteService;
        this.dataGetter = dataGetter;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const chatId = msg.chat.id;
        const user = await this.userService.insertOne(chatId);
        const coins = await this.favoriteService.getFavoriteByUserId(user.id).then(async (list) => {
            if (list.length > 0) {
                const prices = await this.dataGetter.getCoinsPrice(list.map(coin => coin.coinSymbol), "15m");
                bot.sendMessage(chatId, prices.join("\n"));
            }
        }).catch((err) => {
            bot.sendMessage(chatId, "Can't review your favorite list. Or it is empty");
        });

    }
}
