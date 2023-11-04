import axios, { AxiosResponse } from "axios";
import { coinCodes } from "./cryptocurrencies.ts";
import { Rate } from "../types/rate.ts";
import { Market } from "./market.ts";
import { CoinPaprikaResponse } from "../types/marketsResponse/coin-paprike-response.ts";
const url = "https://api.coinpaprika.com/v1";

export class CoinPaprika extends Market {
    constructor() {
        super(url, {});
    }

    createRequests(): Promise<AxiosResponse<any, any>> {
        return this.instance.get("/ticker");
    }

    async getData(): Promise<Rate[]> {
        let coinsData: Rate[] = [];
        await this.createRequests().then((result) => {
            result.data.forEach((rate: CoinPaprikaResponse) => {
                const alreadyInList = coinsData.find(curRate => {
                    return curRate.coinSymbol === rate.symbol;
                });
                if (coinCodes.includes(rate.symbol) && !alreadyInList) {
                    coinsData.push({ coinSymbol: rate.symbol, price: Number(rate.price_usd), baseCurrency: "USD" });
                }
            });
        }).catch((err) => {
            throw Error(err.response?.data);
        });
        return coinsData;
    }
}


