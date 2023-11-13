import { Message } from "node-telegram-bot-api";
import { bot } from "../bot.ts";
import { Controller } from "./controller.ts";

export class HelpController extends Controller {
    constructor() {
        super(/\/help/);
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "list of commands:\n /addToFavorite COIN_NAME - Adds a coin to your selected \n /deleteFavorite COIN_NAME - Deletes a coin from your favorites\n /listFavorite - Prints all coins from your favorites\n /listRecent Prints all tracked coin by our api");
    }
} 
