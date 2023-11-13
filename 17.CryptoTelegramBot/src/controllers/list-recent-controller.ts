import { Message } from "node-telegram-bot-api";
import { bot } from "../bot.ts";
import { Controller } from "./controller.ts";
import { DataGetter } from "../cryptoRestConnection/data-getter.ts";

export class ListRecentController extends Controller {
    private cryptoRestAPI: DataGetter;
    constructor(cryptoRestAPI: DataGetter) {
        super(/\/listRecent/);
        this.cryptoRestAPI = cryptoRestAPI;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const coins = await this.cryptoRestAPI.getAllCoins();
        const prices = await this.cryptoRestAPI.getCoinsPrice(coins, "15m");
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, prices.join("\n"));
    }
} 