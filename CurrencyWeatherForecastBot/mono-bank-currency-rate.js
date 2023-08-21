import axios from "axios";
import fs from "fs";

export function updateDateCheck() {
    return new Promise((resolve, reject) => {
        fs.readFile("./currency-inf.json", "utf8", function (err, data) {
            if (Date.now() - JSON.parse(data).fetch_date <= 60000) {
                resolve(JSON.parse(data).data);
            } else {
                reject(false);
            }
            reject(false);
        })
    });
}

export function refreshData(path, data) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export default function currencyRate() {
    let updatePromise = updateDateCheck();
    return new Promise((resolve, reject) => {
        updatePromise.then((msg) => {
            resolve(msg);
        }).catch(async (err) => {
            await axios.get("https://api.monobank.ua/bank/currency").then(async (response) => {
                let currencyRateObj = {
                    "fetch_date": Date.now(),
                    "data": [response.data[0], response.data[1]]
                };
                refreshData("./currency-inf.json", currencyRateObj);
                resolve(currencyRateObj.data);
            }).catch((err) => {
                reject(false);
            });
        })
    });
}

