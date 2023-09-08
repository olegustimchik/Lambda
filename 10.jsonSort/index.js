import axios from "axios";
import https from "https";
import fs from "fs";

const isObject = function (value) {
    return (typeof value === 'object' && value !== null && !Array.isArray(value));
}

const searchInObj = function (obj) {
    let isDone = JSON.stringify(obj).includes('"isDone":true');
    return isDone;
}

const doRequests = function (url, agent) {
    let flag = false;
    let isDone = new Object();
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < 4 && !flag; i++) {
            await axios.get(url, { httpsAgent: agent }).then((resp) => {
                isDone = { "endpoint": url, "isDone": searchInObj(resp.data) };
                flag = true;
            }).catch((err) => {
                isDone = { "endpoint": url, "error": err.response, "isDone": undefined };
            });
        }
        resolve(isDone);
    });
}


const checkPromises = function (promises) {
    let isDoneValues = [0, 0];
    Promise.all(promises).then((values) => {
        values.forEach((item) => {
            if (item.isDone === undefined) {
                console.log(`${item.endpoint} - request failed`);
            } else {
                if (item.isDone) {
                    ++isDoneValues[0];
                } else {
                    ++isDoneValues[1];
                }
                console.log(`${item.endpoint} - ${item.isDone}`);
            }
        })
        console.log(`true values - ${isDoneValues[0]}`);
        console.log(`false values -  ${isDoneValues[1]}`);
    });
}
async function readUrls() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    const requests = new Array();
    await fs.readFile("./urls.txt", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.toString().split("\r\n").forEach((item, index) => {
                requests.push(doRequests(item, agent));
            });
            checkPromises(requests);
        }
    });

}

readUrls();