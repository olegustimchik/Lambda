import axios, { AxiosResponse } from "axios";
import { coins, coinCodes } from "./cryptocurrencies.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
const url = "https://api.kucoin.com";

export class Kucoin extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse<any, any>>[] {
        const kucoinRequests: Promise<AxiosResponse>[] = [this.instance.get("/api/v1/prices", { params: { "currencies": coinCodes.join(","), "base": "USD" } })];
        return kucoinRequests;
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await Promise.all(this.createRequests()).then((result) => {
            for (const [key, value] of Object.entries(result[0].data.data)) {
                coinsData.push({ coinSymbol: key, price: Number(value), baseCurrency: "USD" });
            }
        }).catch((err) => {
            throw Error(err.response.data);
        });
        return coinsData;
    }
}

