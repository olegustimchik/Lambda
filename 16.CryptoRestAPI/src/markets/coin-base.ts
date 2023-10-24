import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
const url = "https://api.coinbase.com";

export class CoinBase extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse>[] {
        const coinBaseRequests: Promise<AxiosResponse>[] = [];
        coinCodes.forEach((code) => { coinBaseRequests.push(this.instance.get("v2/exchange-rates", { params: { "currency": code } })); });
        return coinBaseRequests;
    }

    async getData(): Promise<Rate[]> {
        let coinsDate: Rate[] = [];
        await Promise.all(this.createRequests()).then((data) => {
            data.forEach((result) => {
                coinsDate.push({ coinSymbol: result.data.data.currency, price: Number(result.data.data.rates["USD"]), baseCurrency: "USD" });
            });
        }).catch((err) => { throw Error(err.response.data) });
        return coinsDate;
    }
}

