const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs');
const mime = require('mime-types');

require('dotenv').config();
const getImageTitle = function (str) {
    return str.split("\\").pop().split("/").pop().split(".")[0];
}

class ConsoleSenderBot {
    constructor() {
        this.bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
    }

    sendMessage(message) {
        this.bot.sendMessage(process.env.CHAT_ID, message).catch((error) => {
            console.error("Some error occurred while sending message: " + error.code);
            console.error(error);
        });
        this.bot.stopPolling();
    }

    sendImage(imgLocation) {
        let fileName = getImageTitle(imgLocation) || "filename";
        let contentType = 'application/octet-stream';
        if (process.env.NTBA_FIX_350) {
            contentType = mime.lookup(fileName) || 'application/octet-stream';
        }
        this.bot.sendPhoto(process.env.CHAT_ID, imgLocation, {}, { filename: fileName, contentType: contentType }).catch((error) => {

            console.error("Some error occurred while sending photo: " + error.code);
        });
        this.bot.stopPolling();
    }
}


module.exports = { ConsoleSenderBot };


