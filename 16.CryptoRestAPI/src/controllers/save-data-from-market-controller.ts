import { CoinService } from "../services/coin-service.ts";
import { MarketService } from "../services/markets-service.ts";
import { MarketPricesService } from "../services/market-prices-service.ts";
import { Market } from "../markets/market.ts";

export class SaveDataFromMarketController {
    private coinService: CoinService;
    private marketPricesService: MarketPricesService;
    private marketService: MarketService;
    constructor(coinService: CoinService, marketService: MarketService, marketPricesService: MarketPricesService) {
        this.coinService = coinService;
        this.marketService = marketService;
        this.marketPricesService = marketPricesService;
    }

    saveDataFromMarket = <T extends Market>(market: T, marketCode: string) => {
        market.getData().then((data) => {
            data.forEach(async (item) => {
                const coin = await this.coinService.selectCoinBySymbol(item.coinSymbol).catch((err) => {
                    throw new Error(err);
                });
                const market = await this.marketService.selectByName(marketCode).catch((err) => {
                    throw new Error(err);
                });
                if (market !== null) {
                    this.marketPricesService.insertInto({ price: item.price.toString(), fetchDate: new Date(), coinId: coin[0].id, marketId: market[0].id }).catch((err) => {
                        throw new Error(err);
                    });
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}