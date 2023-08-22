import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { createUserResponse } from "./user-resp.js"
import { WeatherForecast } from "./check-weather.js";
dotenv.config();

const weatherOBJ = new WeatherForecast(50.450001, 30.523333); // kyiv location 

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

function renderMainMenu(bot, msg) {
    bot.sendMessage(msg.chat.id, "Select option", {
        "reply_markup": {
            "keyboard": [["weather"]]
        }
    });
}

bot.onText(/\/start/, (msg) => {
    renderMainMenu(bot, msg);
});

bot.on("message", async (msg) => {
    if (msg.text === "weather") {
        bot.sendMessage(msg.chat.id, "Hi. Show the weather forecast with ", {
            "reply_markup": {
                "keyboard": [["3 hours step", "6 hours step"], ["previous menu"]]
            }
        })
    }

});

bot.on('message', (msg) => {
    if (msg.text === "previous menu") {
        renderMainMenu(bot, msg);
    }
});

bot.on("message", async (msg) => {
    if (msg.text.toString().toLowerCase() === "3 hours step") {
        const res = await weatherOBJ.getThreeHoursForecast();
        bot.sendMessage(msg.chat.id, createUserResponse(res));
    } else if (msg.text.toString().toLowerCase() === "6 hours step") {
        const res = await weatherOBJ.getSixHoursForecast();
        bot.sendMessage(msg.chat.id, createUserResponse(res));
    }
}); 
