import * as dotenv from "dotenv";
dotenv.config();

export const TelegramBotConfig = {
    botToken: process.env.BOT_TOKEN as string
}