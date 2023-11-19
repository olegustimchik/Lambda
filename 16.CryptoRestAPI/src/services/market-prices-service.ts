import { MarketPricesRepository } from "../repositories/market-prices-repository.ts";
import { MarketPriceTypeInsert, MarketPriceTypeSelect, CoinTypeInsert, CoinTypeSelect, MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";
import { CurrencyInformation } from "../types/currency-response.ts";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

export class MarketPricesService {
    private marketPricesRepository: MarketPricesRepository;
    constructor(marketPricesRepository: MarketPricesRepository) {
        this.marketPricesRepository = marketPricesRepository;
    }

    insertInto = async (marketPrice: MarketPriceTypeInsert): Promise<void | MySqlRawQueryResult> => {
        return this.marketPricesRepository.insertInto(marketPrice);
    }

    selectAll = async (): Promise<MarketPriceTypeSelect[]> => {
        return this.marketPricesRepository.selectAll(); 
    }

    /**
     * 
     * @param coin CoinTypeSelect. Selected coin from the coins table
     * @param market MarketTypeSelect. If you want to select average price from all markets pass "all"    
     * @param period number of minutes
     * @returns average price during the period
     */
    currencyInfo = async (coin: CoinTypeSelect, market: MarketTypeSelect | "all", period: number): Promise<CurrencyInformation> => {
        if (market === "all") {
            const marketPricesInf = await this.marketPricesRepository.averagePrice(coin.id, period).then((data): CurrencyInformation => {
                return { coin: coin.coinSymbol, coinId: coin.id, details: { price: data[0].price, date: Date.now() } }
            }).catch((err) => {
                console.log(err);
                throw new Error(err);
            });
            return marketPricesInf;
        } else {
            const marketPrices = await this.marketPricesRepository.selectAverageBy(coin.id, market.id, period);
            return { coin: coin.coinSymbol, coinId: coin.id, details: { price: marketPrices[0].price, date: Date.now() } }
        };
    }
}



