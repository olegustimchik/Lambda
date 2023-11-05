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
    let marketPrices: MarketPriceTypeSelect[] = [];
    if (marketName === "all") {
        coins = await coinModel.selectByCoinSymbol(coinSymbol);
        markets = await marketModel.selectAll().catch((err) => {
            throw new Error(err);
        });
        const marketPricesInf = await marketPricesModel.averagePrice(coins[0].id, period).then((data): CurrencyInformation => {
            return { coin: coins.pop()?.coinSymbol, coinId: coins.pop()?.id, markets: markets, details: data.map<CurrencyDetail>((elem) => { return { price: elem.price, date: Date.parse(elem.fetch_date) } }) }
        }).catch((err) => {
            throw new Error(err);
        });
        return marketPricesInf;
    } else {
        coins = await coinModel.selectByCoinSymbol(coinSymbol);
        markets = await marketModel.selectByName(marketName);
        marketPrices = await marketPricesModel.selectBy(coins[0].id, markets[0].id, period);
        return { coin: coins.pop()?.coinSymbol, coinId: coins.pop()?.id, markets: markets, details: marketPrices.map<CurrencyDetail>((elem) => { return { price: elem.price, date: elem.fetchDate?.valueOf() || 0 } }) };
    }


}