import { Message } from "node-telegram-bot-api";
import { bot } from "../bot.ts";
import { Controller } from "./controller.ts";
import { DataGetter } from "../cryptoRestConnection/dataGetter.ts";

export class ListRecentController extends Controller {
    private cryptoRestAPI: DataGetter;
    constructor(cryptoRestAPI: DataGetter) {
        super(/\/list_recent/);
        this.cryptoRestAPI = cryptoRestAPI;
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const chatId = msg.chat.id;
        try {
            const coins = await this.cryptoRestAPI.getAllCoins();
            const prices = await this.cryptoRestAPI.getCoinsPrice(coins, "15m");
            if (prices !== undefined) {
                bot.sendMessage(chatId, prices.join("\n"));
            } else { 
                bot.sendMessage(chatId, "Unable to get prices");
            }
        } catch (err) {
            console.log(err);
            bot.sendMessage(chatId, "Something went wrong, try again");
        }
    }
} 