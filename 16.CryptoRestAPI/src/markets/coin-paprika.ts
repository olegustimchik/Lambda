import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
import { CoinPaprikaResponse } from "../types/marketsResponse/coinPaprike.ts";
const url = "https://api.coinpaprika.com/v1";

export class CoinPaprika extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("/ticker");
    }

    async getData(): Promise<Rate[] | undefined> {
        let coinsData: Rate[] = [];
        try {
            const { data } = await this.createRequests();
            data.forEach((rate: CoinPaprikaResponse) => {
                const alreadyInList = coinsData.find((curRate) => {
                    return curRate.coinSymbol === rate.symbol;
                });
                if (coinCodes.includes(rate.symbol) && !alreadyInList) {
                    coinsData.push({ coinSymbol: rate.symbol, price: Number(rate.price_usd), baseCurrency: "USD" });
                }
            });
            return coinsData;
        } catch (error) {
            console.log(error);
        }
    }
}
