import axios, { AxiosInstance } from "axios";

export class DataGetter {
    private instance: AxiosInstance;
    constructor(baseUrl: string, headers: Object) {
        this.instance = axios.create({ baseURL: baseUrl, headers });
    }

    getAllCoins = async () => {
        const data: string[] = [];
        await this.instance.get("/coins").then((resp) => {
            resp.data?.forEach((coin: { id: number, coinSymbol: string }) => {
                if (resp.status == 200) {
                    data.push(coin.coinSymbol);/*  */
                }
            });
        }).catch((err) => {
            console.log(err);
        });
        return data;
    }

    getCoinBySymbol = async (symbol: string) => {
        const data: string[] = [];
        await this.instance.get("/coins", { params: { "coin": symbol } }).then((resp) => {
            resp.data?.forEach((coin: { id: number, coinSymbol: string }) => {
                if (resp.status == 200) {
                    data.push(coin.coinSymbol);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
        return data;
    }

    getCoinsPrice = async (coins: string[], period: string) => {
        const data: string[] = [];
        await this.instance.get("/cryptocurrency/info", { params: { "symbol": coins.join(","), "period": period } }).then((resp) => {
            resp.data?.forEach((coin: {
                "coin": string, "details": {
                    "price": string
                }
            }) => {
                if (resp.status == 200) {
                    data.push(`/${coin.coin} ${Number(coin.details.price)}`);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
        return data;
    }

    getOnlyCoinPrice = async (coins: string[], period: string) => {
        const prices: string[] = [];
        await this.instance.get("/cryptocurrency/info", { params: { "symbol": coins.join(","), "period": period } }).then((resp) => {
            resp.data?.forEach((coin: {
                "coin": string, "details": {
                    "price": string
                }
            }) => {
                if (resp.status == 200) {
                    prices.push(`${period}: ${Number(coin.details.price)}`);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
        return prices;
    }
} 