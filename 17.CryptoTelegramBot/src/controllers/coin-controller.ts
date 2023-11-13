import { UsersService } from "../services/users-service.ts";
import { FavoriteService } from "../services/favorite-cryptos-service.ts";
import { Controller } from "./controller.ts";
import TelegramBot, { Message } from "node-telegram-bot-api";
import { DataGetter } from "../cryptoRestConnection/data-getter.ts";
import { bot } from "../bot.ts";
import { MeasureMemoryMode } from "vm";

export class CoinController extends Controller {
    private userService: UsersService;
    private favoriteService: FavoriteService;
    private dataGetter: DataGetter;
    constructor(userService: UsersService, favoriteService: FavoriteService, dataGetter: DataGetter) {
        super(/\/[A-Z]+$/);
        this.userService = userService;
        this.favoriteService = favoriteService;
        this.dataGetter = dataGetter;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null,): Promise<void> => {
        const periods = ["30m", "1h", "3h", "6h", "12h", "24h"];
        const coin = match?.input.split("/")[1];
        const chatId = msg.chat.id;
        console.log(coin);
        if (coin === undefined) {
            bot.sendMessage(chatId, "Invalid input");
        }
        const coins = await this.dataGetter.getCoinBySymbol(coin as string);
        if (coins.length < 1) {
            bot.sendMessage(chatId, "There is no information about this coin");
        } else {
            const prices: string[] = [];
            const promises: Promise<string[]>[] = [];
            periods.forEach((period) => {
                promises.push(this.dataGetter.getOnlyCoinPrice([coin as string], period));
            });
            await Promise.allSettled(promises).then((result) => {
                result.forEach((item) => {
                    if (item.status === "fulfilled") {
                        prices.push(item.value[0]);
                    }
                })
            })
            bot.sendMessage(chatId, prices.join("\n"), {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Add to Favorite", callback_data: `add_${coin}` }],
                        [{ text: "Remove from Favorite", callback_data: `remove_${coin}` }]]
                }
            });
        }
    }
    onCallbackQuery = async (msg: TelegramBot.CallbackQuery) => {
        const answer = msg.data;
        const action = answer?.split("_")[0];
        const coin = answer?.split("_")[1];

        if (action === "add" && (await this.dataGetter.getCoinBySymbol(coin as string)).length >= 1) {
            const user = await this.userService.insertOne(msg.from.id);
            await this.favoriteService.insertToFavorite(user.id, coin?.toUpperCase() as string).then((data) => {
                bot.sendMessage(msg.from.id, "coin added to favorite list.To view the list use /listFavorite command")
            }).catch((err) => {
                console.log(err);
                bot.sendMessage(msg.from.id, "Can't add this coin in your favorite list. To view the list use /listFavorite command");
            });
        } else if (action === "remove" && (await this.dataGetter.getCoinBySymbol(coin as string)).length >= 1) {
            const user = await this.userService.insertOne(msg.from.id);
            await this.favoriteService.deleteByUserIdAndCoinSymbol(user.id, coin?.toUpperCase() as string).then((data) => {
                bot.sendMessage(msg.from.id, "coin removed from favorite list.To view the list use /listFavorite command")
            }).catch((err) => {
                console.log(err);
                bot.sendMessage(msg.from.id, "Can't delete this coin in your favorite list. To view the list use /listFavorite command");
            });
        }

    }
}