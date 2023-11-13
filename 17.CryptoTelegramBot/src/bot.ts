import TelegramBot from "node-telegram-bot-api";
import { TelegramBotConfig } from "./configs/config.ts";
const bot = new TelegramBot(TelegramBotConfig.botToken, { polling: true });

export { bot };
