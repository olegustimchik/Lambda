import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Market } from "./market.ts";
import { Rate } from "../types/rate.ts";
const url = "https://api.kucoin.com";

export class Kucoin extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("/api/v1/prices", { params: { currencies: coinCodes.join(","), base: "USD" } });
    }

    async getData(): Promise<Rate[] | undefined> {
        let coinsData: Rate[] = [];
        try {
            const { data } = await this.createRequests();
            for (const [key, value] of Object.entries(data.data)) {
                coinsData.push({ coinSymbol: key, price: Number(value), baseCurrency: "USD" });
            }
            return coinsData;
        } catch (err) {
            console.log(err);
        }
    }
}
