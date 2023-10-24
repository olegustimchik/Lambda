import axios, { AxiosResponse } from "axios";
import { coins, coinCodes } from "./cryptocurrencies.ts";
import { CryptoData } from "./crypto-data-i.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
import headersConfig from "../configs/headers-config.ts";
const url = "https://pro-api.coinmarketcap.com/";
//https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
export class CoinMarketCap extends Market {
    constructor() {
        super(url, { 'X-CMC_PRO_API_KEY': headersConfig.coin_market_cap });
    }

    createRequests(): Promise<AxiosResponse<any, any>>[] {
        const coinMarketRequests: Promise<AxiosResponse>[] = [this.instance.get("v2/cryptocurrency/quotes/latest", { params: { "symbol": coinCodes.join(","), "convert": "USD" } })];
        return coinMarketRequests;
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await Promise.all(this.createRequests()).then((result) => {
            Object.values<CryptoData[]>(result[0].data.data).forEach((item) => {
                coinsData.push({ coinSymbol: item[0].symbol, price: item[0].quote.USD.price, baseCurrency: "USD" });
            });
        }).catch((err) => {
            throw new Error(err);
        });
        return coinsData;
    }
}

