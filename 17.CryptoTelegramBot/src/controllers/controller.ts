import TelegramBot, { Message } from "node-telegram-bot-api";

export abstract class Controller {
    protected command: RegExp;
    constructor(command: RegExp) {
        this.command = command;
    }

    async onCommand(msg: Message, match: RegExpExecArray | null) {
    }

    getCommand(): RegExp {
        return this.command;
    }
}