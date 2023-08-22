import TelegramBot from "node-telegram-bot-api";
import { WeatherForecast } from "../weatherBot/check-weather.js";
import { createUserResponse } from "../weatherBot/user-resp.js";
import { monoBankRate, privateBankRate } from "./currency-user-resp.js";
import { default as monoRate } from "./mono-bank-currency-rate.js";
import { default as privateRate } from "./private-bank-currency-rate.js";
import dotenv from "dotenv";
dotenv.config();

const weatherForecast = new WeatherForecast(50.450001, 30.523333);

// console.log(await weatherForecast.getThreeHoursForecast()); 

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const renderMainMenu = function (bot, msg) {
    bot.sendMessage(msg.chat.id, "Select the option that you need.", {
        "reply_markup": {
            "keyboard": [["weather"], ["currency"]]
        }
    });
}

bot.onText(/\/start/, (msg) => {
    renderMainMenu(bot);
});

bot.on("message", async (msg) => {
    if (msg.text === "weather") {
        bot.sendMessage(msg.chat.id, "Show weather forecast with selected step", {
            "reply_markup": {
                "keyboard": [["3 hours step", "6 hours step"],
                ["previous menu"]]
            }
        });
    } else if (msg.text === "currency") {
        bot.sendMessage(msg.chat.id, "Show currency rate ", {
            "reply_markup": {
                "keyboard": [["EUR", "USD"],
                ["previous menu"]]
            }
        });
    }
});

bot.on('message', (msg) => {
    if (msg.text === "previous menu") {
        renderMainMenu(bot, msg);
    }
});

bot.on('message', async (msg) => {
    let weather;
    if (msg.text.toLowerCase() === "3 hours step") {
        weather = await weatherForecast.getThreeHoursForecast();
        bot.sendMessage(msg.chat.id, createUserResponse(weather));
    } else if (msg.text.toLowerCase() === "6 hours step") {
        weather = await weatherForecast.getSixHoursForecast();
        bot.sendMessage(msg.chat.id, createUserResponse(weather));
    }
});

bot.on('message', async (msg) => {
    if (msg.text === "EUR") {
        monoRate().then((result) => {
            bot.sendMessage(msg.chat.id, monoBankRate(result, [1]));
        }).catch((err) => {
            bot.sendMessage(msg.chat.id, "OOPS SOMETHING WENT WRANG");
        });
        privateRate().then((result) => {
            bot.sendMessage(msg.chat.id, privateBankRate(result.data, [0]));
        }).catch((err) => {
            bot.sendMessage(msg.chat.id, "OOPS SOMETHING WENT WRANG");
        });
    } else if (msg.text === "USD") {
        monoRate().then((result) => {
            bot.sendMessage(msg.chat.id, monoBankRate(result, [0]));
        }).catch((err) => {
            bot.sendMessage(msg.chat.id, "OOPS SOMETHING WENT WRANG");
        });
        privateRate().then((result) => {
            bot.sendMessage(msg.chat.id, privateBankRate(result.data, [1]));
        }).catch((err) => {
            bot.sendMessage(msg.chat.id, "OOPS SOMETHING WENT WRANG");
        });
    }
}); 
