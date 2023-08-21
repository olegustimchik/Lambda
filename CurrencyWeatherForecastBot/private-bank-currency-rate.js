import axios from "axios";
import fs from "fs";

export default function currencyRate() {
    return new Promise((resolve, reject) => {
        axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5").then((result) => {
            resolve({ "data": result.data });
        }).catch((err) => {
            reject(false);
        });
    });
}
