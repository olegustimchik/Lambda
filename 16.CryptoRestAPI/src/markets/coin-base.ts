import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
const url = "https://api.coinbase.com";

export class CoinBase extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse> {
        return this.instance.get("v2/exchange-rates",);
    }

    async getData(): Promise<Rate[]> {
        let coinsDate: Rate[] = [];
        await this.createRequests().then((data) => {
            coinCodes.forEach((coin) => {
                if (data.data?.data.rates[coin]) {
                    coinsDate.push({ coinSymbol: coin, price: 1 / Number(data.data?.data.rates[coin]), baseCurrency: "USD" });
                }
            });
        }).catch((err) => { throw Error(err.response.data) });
        return coinsDate;
    }
}

