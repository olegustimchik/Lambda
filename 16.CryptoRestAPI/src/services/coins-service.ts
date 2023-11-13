import { CoinModel } from "../models/coinModel.ts";
import { dbConnection } from "../connection/db.ts";
const coinModel = new CoinModel(dbConnection);

export async function coinsList() {
    const coins = await coinModel.selectAll().catch((err) => {
        console.log(err);
        return null;
    });
    return coins === null ? [] : coins;
}

export async function coinBySymbol(coin: string) {
    const coins = await coinModel.selectByCoinSymbol(coin).catch((err) => {
        console.log(err);
        return null;
    });
    return coins === null ? [] : coins;
}



