import { CronJob } from "cron";
import { MarketFactory } from "../markets/market-factory.ts";
import { CoinModel, MarketModel, MarketPricesModel } from "../models/models.ts"
import { CoinTypeSelect, CoinTypeInsert, MarketTypeSelect, MarketTypeInsert, MarketPriceTypeInsert, MarketPriceTypeSelect } from "../types/types.ts";
import { dbConnection } from "../connection/db.ts";
import { Market } from "../markets/market.ts";
import { saveDataFromMarket } from "../services/save-data-from-market.ts";
const marketFactory = new MarketFactory();

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
