import fs from 'fs';
import events from 'events';
import * as readline from 'readline';

export default class txtDb {
    constructor(path) {
        this.path = path;
    }


    insertInto(allContent) {
        try {
            fs.appendFileSync(this.path, allContent + "\n", 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    selectFrom() {
        try {
            let allContent = fs.readFileSync(this.path, 'utf8');
            allContent = allContent.trimEnd();
            return allContent.split(/\n/);
        } catch (error) {
            console.log(error);
        }

    }

    async selectWhere(str) {
        let userObj;
        try {
            const rl = readline.createInterface({
                input: fs.createReadStream(this.path), 
                crlfDelay: Infinity
            });
            rl.on("line", (line) => {
                userObj = JSON.parse(line);
                if (userObj.userName.includes(str)) {
                    console.log(line);  
                } 
            })
            await events.once(rl, 'close');
        } catch (error) {
            console.log(error);
        }

    }
}


//module.exports = { txtDb };