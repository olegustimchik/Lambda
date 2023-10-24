import { CronJob } from "cron";
import { MarketFactory } from "../markets/market-factory.ts";
import { CoinModel, MarketModel, MarketPricesModel } from "../models/models.ts"
import { CoinTypeSelect, CoinTypeInsert, MarketTypeSelect, MarketTypeInsert, MarketPriceTypeInsert, MarketPriceTypeSelect } from "../types/types.ts";
import { dbConnection } from "../connection/db.ts";
import { Market } from "../markets/market.ts";
const marketFactory = new MarketFactory();
const coinModel = new CoinModel(dbConnection);
const marketModel = new MarketModel(dbConnection);
const marketPricesModel = new MarketPricesModel(dbConnection);

function saveDataFromMarket<T extends Market>(market: T, marketCode: string) {
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
        throw new Error(err);
    });
}
export const cronJob = new CronJob('0 */05 * * * *', function () {
    try {
        saveDataFromMarket(marketFactory.getCoinBase(), "CoinBase");
        saveDataFromMarket(marketFactory.getCoinPaprika(), "CoinPaprika");
        saveDataFromMarket(marketFactory.getCoinStats(), "CoinStats");
        saveDataFromMarket(marketFactory.getKucoin(), "Kucoin");
        saveDataFromMarket(marketFactory.getCoinMarketCap(), "CoinMarketCap");
    } catch (err) {
        console.log(err);
    }
    const d = new Date();
    console.log('Every 5 Minute:', d);
}); 
