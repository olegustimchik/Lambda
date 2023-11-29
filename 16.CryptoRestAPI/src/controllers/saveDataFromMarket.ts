import { CoinService } from "../services/coin.ts";
import { MarketService } from "../services/markets.ts";
import { MarketPricesService } from "../services/marketPrices.ts";
import { Market } from "../markets/market.ts";
import { MarketPriceTypeInsert } from "../types/tables.ts";

export class SaveDataFromMarketController {
    private coinService: CoinService;
    private marketPricesService: MarketPricesService;
    private marketService: MarketService;
    constructor(coinService: CoinService, marketService: MarketService, marketPricesService: MarketPricesService) {
        this.coinService = coinService;
        this.marketService = marketService;
        this.marketPricesService = marketPricesService;
    }

    saveDataFromMarket = async <T extends Market>(market: T, marketCode: string) => {
        try {
            const prices = await market.getData();

            if (prices === undefined || prices.length < 1) {
                console.log(marketCode);
                throw new Error(`No data from ${marketCode}`);
            }
            const marketFromDb = await this.marketService.selectByName(marketCode);
            const toInsert = prices.map(async (item) => {
                const coin = await this.coinService.selectCoinBySymbol(item.coinSymbol);
                if (marketFromDb.length > 0 && coin.length > 0 && item.price !== null) {
                    return {
                        price: item.price.toString(),
                        fetchDate: new Date(),
                        coinId: coin[0].id,
                        marketId: marketFromDb[0].id,
                    };
                }
            });

            await this.marketPricesService.insertMany((await Promise.all(toInsert)) as MarketPriceTypeInsert[]);
        } catch (error) {
            console.log(error);
        }
    };
}
