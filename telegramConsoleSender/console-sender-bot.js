const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config();

const getImageTitle = function (str) {
    return str.split("\\").pop().split("/").pop().split(".")[0];
}

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const message = "bot started";

function sendImage(imgLocation) {
    let fileName = getImageTitle(imgLocation) || "filename";
    let contentType = 'application/octet-stream';
    if (process.env.NTBA_FIX_350) {
        contentType = mime.lookup(fileName) || 'application/octet-stream';
    }
    bot.sendPhoto(process.env.CHAT_ID, imgLocation, {}, { filename: fileName, contentType: contentType }).catch((error) => {
        console.error("Some error occurred while sending photo: " + error.code);
    });
}

function sendMessage(message) {
    bot.sendMessage(process.env.CHAT_ID, message).catch((error) => {
        console.error("Some error occurred while sending message: " + error.code);
    });
    bot.stopPolling();
}

function writeEmptyString() {
    fs.writeFile("./user_input.json", "", (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}

const timerId = setInterval(() => {
    fs.readFile("./user_input.json", "utf8", (err, data) => {
        if (err) {
            console.log("some error occurred");
            console.log(err.message);
        }

        if (data !== "") {
            if (JSON.parse(data).message) {
                sendMessage(JSON.parse(data).message);
            } else {
                sendImage(JSON.parse(data).path);
            }
            writeEmptyString();
        }
    });
    console.log(process.memoryUsage().heapUsed / Math.pow(10, 6));
}, 500);

setTimeout(() => {
    clearInterval(timerId);
    console.log('stop');
    bot.stopPolling();
}, 100000);

