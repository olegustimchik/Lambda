import { CoinModel } from "../models/coinModel.ts";
import { dbConnection } from "../connection/db.ts";
const coinModel = new CoinModel(dbConnection);

export async function saveCoinsService(coins: string[]) {
    coins.forEach((code) => {
        coinModel.insertInto({ coinSymbol: code }).catch((err) => {
            console.log(err);
        });
    })
}