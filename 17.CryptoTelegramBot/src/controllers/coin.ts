import { UsersService } from "../services/users.ts";
import { FavoriteService } from "../services/favoriteCryptos.ts";
import { Controller } from "./controller.ts";
import TelegramBot, { Message } from "node-telegram-bot-api";
import { DataGetter } from "../cryptoRestConnection/dataGetter.ts";
import { bot } from "../bot.ts";
import { MeasureMemoryMode } from "vm";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

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
        try {
            if (coin === undefined) {
                bot.sendMessage(chatId, "Invalid input");
            }
            const coins = await this.dataGetter.getCoinBySymbol(coin as string);
            if (coins === undefined || coins.length < 1) {
                bot.sendMessage(chatId, "There is no information about this coin");
                return;
            } else {
                const prices: string[] = [];
                const promises: Promise<string[] | undefined>[] = [];
                periods.forEach((period) => {
                    promises.push(this.dataGetter.getCoinsPrice([coin as string], period));
                });
                const result = await Promise.allSettled(promises);
                result.forEach((item) => {
                    if (item.status === "fulfilled" && item.value !== undefined) {
                        prices.push(item.value[0]);
                    }
                });
                bot.sendMessage(chatId, prices.join("\n"), {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Add to Favorite", callback_data: `add_${coin}` }],
                            [{ text: "Remove from Favorite", callback_data: `remove_${coin}` }]]
                    }
                });
            }
        } catch (err) {
            bot.sendMessage(chatId, "Something went wrong, try again");
        }
    }

    onCallbackQuery = async (msg: TelegramBot.CallbackQuery) => {
        const answer = msg.data;
        const action = answer?.split("_")[0];
        const coin = answer?.split("_")[1];
        try {
            const coinFromAPI = await this.dataGetter.getCoinBySymbol(coin as string)
            if (action === "add" && coinFromAPI !== undefined && coinFromAPI.length >= 1) {
                const user = await this.userService.insertOne(msg.from.id);
                const res = await this.favoriteService.insertToFavorite(user.id, coin?.toUpperCase() as string);
                bot.sendMessage(msg.from.id, `${coin} added to your favorite list.To view the list use /list_favorite command`)
                console.log(res); 
            } else if (action === "remove" && coinFromAPI !== undefined && coinFromAPI.length >= 1) {
                const user = await this.userService.insertOne(msg.from.id);
                const res = await this.favoriteService.deleteByUserIdAndCoinSymbol(user.id, coin?.toUpperCase() as string);
                bot.sendMessage(msg.from.id, "coin removed from favorite list.To view the list use /list_favorite command")
                console.log(res);
            }
        } catch (err) {
            console.log(err);
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
                bot.sendMessage(msg.from.id, "Can't add this coin already in your favorite list. To view the list use /list_favorite command");
            }
        }

    }
}