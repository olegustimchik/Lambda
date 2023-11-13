import { CoinModel, MarketModel, MarketPricesModel } from "../models/models.ts";
import { MarketPriceTypeInsert, MarketPriceTypeSelect, CoinTypeInsert, CoinTypeSelect, MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
import { CurrencyInformation, CurrencyDetail } from "../types/currency-response.ts";
import { dbConnection } from "../connection/db.ts";
const coinModel = new CoinModel(dbConnection);
const marketModel = new MarketModel(dbConnection);
const marketPricesModel = new MarketPricesModel(dbConnection);

export async function currencyInfo(coinSymbol: string, marketName: string, period: number): Promise<CurrencyInformation> {
    let coins: CoinTypeSelect[] = [];
    let markets: MarketTypeSelect[] = [];
    if (marketName === "all") {
        coins = await coinModel.selectByCoinSymbol(coinSymbol);
        markets = await marketModel.selectAll().catch((err) => {
            console.log(err);
            throw new Error(err);
        });
        const marketPricesInf = await marketPricesModel.averagePrice(coins[0].id, period).then((data): CurrencyInformation => {
     
            return { coin: coins[0].coinSymbol, coinId: coins[0].id, markets: markets, details: { price: data[0].price, date: Date.now() } }
        }).catch((err) => {
            console.log(err);
            throw new Error(err);
        });
        return marketPricesInf;
    } else {
        coins = await coinModel.selectByCoinSymbol(coinSymbol);
        markets = await marketModel.selectByName(marketName);
        const marketPrices = await marketPricesModel.selectAverageBy(coins[0].id, markets[0].id, period);
        return { coin: coins.pop()?.coinSymbol, coinId: coins.pop()?.id, markets: markets, details: { price: marketPrices[0].price, date: Date.now() } }
    };
}


