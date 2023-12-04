import { Message } from "node-telegram-bot-api";
import { bot } from "../bot.ts";
import { UsersService } from "../services/users.ts";
import { Controller } from "./controller.ts";

export class StartController extends Controller {
    private userService: UsersService
    constructor(userService: UsersService) {
        super(/\/start/,)
        this.userService = userService;
    }
    
    onCommand = async (msg: Message, match: RegExpExecArray | null): Promise<void> => {
        const user = await this.userService.insertOne(msg.chat.id);
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "This Bot allow you managing and monitoring selected cryptocurrencies.To get started, explore commands list");
    }

} 