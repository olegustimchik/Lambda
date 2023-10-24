import axios, { AxiosResponse } from "axios";
import { coins, coinCodes, coinListForPaprika } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
const url = "https://api.coinpaprika.com/v1";

export class CoinPaprika extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse<any, any>>[] {
        const coinPaprikaRequests: Promise<AxiosResponse>[] = [];
        coinListForPaprika.forEach((coin) => {
            coinPaprikaRequests.push(this.instance.get("/price-converter", { params: { "base_currency_id": coin, "quote_currency_id": "usdt-tether", "amount": 1 } }));
        })
        return coinPaprikaRequests;
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await Promise.all(this.createRequests()).then((result) => {
            result.forEach((rate) => {
                coinsData.push({ coinSymbol: rate.data.base_currency_id.substring(0, rate.data.base_currency_id.indexOf("-")).toUpperCase(), price: rate.data.price, baseCurrency: "USD" }); 
            });
        }).catch((err) => {
            throw Error(err.response.data);
        });
        return coinsData;
    }
}


