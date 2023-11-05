import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
import { CoinStatsResponse } from "../types/marketsResponse/coin-stats-response.ts";
import headersConfig from "../configs/headers-config.ts";
const url = "https://openapiv1.coinstats.app/";

export class CoinStats extends Market {
    constructor() {
        super(url, { 'X-API-KEY': headersConfig.coin_stats });
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("coins", { params: { "limit": 300 } });
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await this.createRequests().then((result) => {
            result.data?.result.forEach((data: CoinStatsResponse) => {
                if (coinCodes.includes(data.symbol)) {
                    coinsData.push({ coinSymbol: data.symbol, price: data.price, baseCurrency: "USD" });
                }
            });
        }).catch((err) => {
            throw Error(err.response.data);
        });
        return coinsData;
    }
}