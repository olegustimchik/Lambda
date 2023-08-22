const { program } = require('commander');
const {ConsoleSenderBot} = require('./console-sender-bot.js');

const consoleSenderBot = new ConsoleSenderBot();

console.time("Time :");

program.command("message <msg>").alias("m").description("Send written message to the bot").action((msg) => {
    consoleSenderBot.sendMessage(msg);
});
program.command("photo <path>").alias("p").description("Send a photo to the bot. Please write the valid path of your image. You can also drag and drop the image to the console").action((path) => {
    consoleSenderBot.sendImage(path);
});



// program.addCommand().description().action(); 


console.timeEnd("Time :");
program.parse(process.argv);
