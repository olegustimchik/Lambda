import axios, { AxiosResponse } from "axios";
import { coins } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
import headersConfig from "../configs/headers-config.ts";
const url = "https://openapiv1.coinstats.app/coins/";

export class CoinStats extends Market {
    constructor() {
        super(url, { 'X-API-KEY': headersConfig.coin_stats });
    }

    createRequests(): Promise<AxiosResponse<any, any>>[] {
        const coinsStatsRequests: Promise<AxiosResponse>[] = [];
        coins.forEach((coin) => {
            coinsStatsRequests.push(this.instance.get(coin));
        });
        return coinsStatsRequests;
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await Promise.all(this.createRequests()).then((result) => {
            result.forEach((rate) => {
                coinsData.push({ coinSymbol: rate.data.symbol, price: rate.data.price, baseCurrency: "USD" });
            });
        }).catch((err) => {
            throw Error(err.response.data);
        });
        return coinsData;
    }
}