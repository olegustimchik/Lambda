import { MarketPricesRepository } from "../repositories/marketPrices.ts";
import {
    MarketPriceTypeInsert,
    MarketPriceTypeSelect,
    CoinTypeInsert,
    CoinTypeSelect,
    MarketTypeInsert,
    MarketTypeSelect,
} from "../types/tables.ts";
import { CurrencyInformation } from "../types/currencyResponse.ts";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export class MarketPricesService {
    private marketPricesRepository: MarketPricesRepository;
    constructor(marketPricesRepository: MarketPricesRepository) {
        this.marketPricesRepository = marketPricesRepository;
    }

    insertOne = async (marketPrice: MarketPriceTypeInsert): Promise<void | MySqlRawQueryResult> => {
        return this.marketPricesRepository.insertOne(marketPrice);
    };

    insertMany = async (marketPrices: MarketPriceTypeInsert[]): Promise<void | MySqlRawQueryResult> => {
        return this.marketPricesRepository.insertMany(marketPrices);
    };
    selectAll = async (): Promise<MarketPriceTypeSelect[]> => {
        return this.marketPricesRepository.selectAll();
    };

    /**
     *
     * @param coin CoinTypeSelect. Selected coin from the coins table
     * @param market MarketTypeSelect. If you want to select average price from all markets pass "all"
     * @param period number of minutes
     * @returns average price during the period
     */
    selectAverage = async (
        coin: CoinTypeSelect,
        market: MarketTypeSelect | "all",
        period: number
    ): Promise<CurrencyInformation> => {
        if (market === "all") {
            const marketPricesInf = await this.marketPricesRepository.averagePrice(coin.id, period);
            return {
                coin: coin.coinSymbol,
                coinId: coin.id,
                details: { price: marketPricesInf[0].price, date: Date.now() },
            };
        } else {
            const marketPrices = await this.marketPricesRepository.selectAverageBy(coin.id, market.id, period);
            return {
                coin: coin.coinSymbol,
                coinId: coin.id,
                details: { price: marketPrices[0].price, date: Date.now() },
            };
        }
    };
}
