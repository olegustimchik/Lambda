const { program } = require('commander');
const fs = require('fs');

console.time("Time :");

program.command("message <msg>").alias("m").description("Send written message to the bot").action((msg) => {
    fs.writeFile("./user_input.json", JSON.stringify({ "message": msg }), (err) => {
        console.log(err);
    });
});

program.command("photo <path>").alias("p").description("Send a photo to the bot. Please write the valid path of your image. You can also drag and drop the image to the console").action((path) => {
    fs.writeFile("./user_input.json", JSON.stringify({ "path": path }), (err) => {
        console.log(err);
    });
});



// program.addCommand().description().action(); 


console.timeEnd("Time :");
program.parse(process.argv);
