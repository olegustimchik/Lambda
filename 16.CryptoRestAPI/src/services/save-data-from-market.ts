import { dbConnection } from "../connection/db.ts";
import { Market } from "../markets/market.ts";
import { CoinModel, MarketModel, MarketPricesModel } from "../models/models.ts";
const coinModel = new CoinModel(dbConnection);
const marketModel = new MarketModel(dbConnection);
const marketPricesModel = new MarketPricesModel(dbConnection);

export function saveDataFromMarket<T extends Market>(market: T, marketCode: string) {
    market.getData().then((data) => {
        data.forEach(async (item) => {
            const coin = await coinModel.selectByCoinSymbol(item.coinSymbol).catch((err) => {
                throw new Error(err);
            });
            const market = await marketModel.selectByName(marketCode).catch((err) => {
                throw new Error(err);
            });
            marketPricesModel.insert({ price: item.price.toString(), fetchDate: new Date(), coinId: coin[0].id, marketId: market[0].id }).catch((err) => {
                throw new Error(err);
            });
        });
    }).catch((err) => {
        console.log(err);
    });
}