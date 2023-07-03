import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const getRandomImage = async function (chatId) {
    axios.get("https://picsum.photos/200/300", { responseType: 'arraybuffer' }).then((response) => {
        bot.sendPhoto(chatId, Buffer.from(response.data, 'binary')).catch((error) => {
            console.error("Some error occurred while sending message: " + error.code);
        });
    }).catch((err) => {
        console.error(err);
    });
}

console.log("_____ Telegram bot started ____"); 

bot.on('message', (msg) => {
    if (msg.text.toString() === "photo") {
        console.log(`User ${msg.chat.username} requested an image`);
        getRandomImage(msg.chat.id);
    } else {
        console.log(`User ${msg.chat.username} wrote: ${msg.text.toString()}`);
        bot.sendMessage(msg.chat.id, `you wrote: ${msg.text.toString()}`); 
    }
}); 
