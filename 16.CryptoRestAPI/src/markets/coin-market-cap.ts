import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { CoinMarketCapResponse } from "../types/marketsResponse/coin-market-cap-response.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
import headersConfig from "../configs/headers-config.ts";
const url = "https://pro-api.coinmarketcap.com/";
//https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
export class CoinMarketCap extends Market {
    constructor() {
        super(url, { 'X-CMC_PRO_API_KEY': headersConfig.coin_market_cap });
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("v2/cryptocurrency/quotes/latest", { params: { "symbol": coinCodes.join(","), "convert": "USD" } });
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await this.createRequests().then((result) => {
            Object.values<CoinMarketCapResponse[]>(result.data.data).forEach((item) => {
                if (item.length > 0) {
                    coinsData.push({ coinSymbol: item[0].symbol, price: item[0].quote.USD.price, baseCurrency: "USD" });
                }
            });
        }).catch((err) => {
            throw new Error(err);
        });
        return coinsData;
    }
}

