import { Message } from "node-telegram-bot-api";
import { bot } from "../bot.ts";
import { Controller } from "./controller.ts";

export class HelpController extends Controller {
    constructor() {
        super(/\/help/);
    }

    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "list of commands:\n /add_to_favorite COIN_NAME - Adds a coin to your selected \n /delete_favorite COIN_NAME - Deletes a coin from your favorites\n /list_favorite - Prints all coins from your favorites\n /list_recent Prints all tracked coin by our api");
    }
} 
