import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
import { CoinStatsResponse } from "../types/marketsResponse/coinStats.ts";
import headersConfig from "../configs/headers-config.ts";
const url = "https://openapiv1.coinstats.app/";

export class CoinStats extends Market {
    constructor() {
        super(url, { "X-API-KEY": headersConfig.coin_stats });
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("coins", { params: { limit: 300 } });
    }

    async getData(): Promise<Rate[] | undefined> {
        let coinsData: Rate[] = [];
        try {
            const { data } = await this.createRequests();
            data?.result.forEach((data: CoinStatsResponse) => {
                if (coinCodes.includes(data.symbol) && data.price) {
                    coinsData.push({ coinSymbol: data.symbol, price: data.price, baseCurrency: "USD" });
                }
            });
            return coinsData;
        } catch (error) {
            console.log(error);
        }
    }
}
