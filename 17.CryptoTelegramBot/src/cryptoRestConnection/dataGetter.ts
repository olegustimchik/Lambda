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
                    data.push(coin.coinSymbol);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
        return data;
    }

    getCoinBySymbol = async (symbol: string) => {
        const data: string[] = [];
        try {
            const response = await this.instance.get("/coin", { params: { "coin": symbol } });
            if (response.status === 200) {
                response.data?.forEach((coin: { id: number, coinSymbol: string }) => {
                    data.push(coin.coinSymbol);
                });
                return data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    getCoinsPrice = async (coins: string[], period: string) => {
        const data: string[] = [];
        try {
            const response = await this.instance.get("/cryptocurrency/info", { params: { "symbol": coins.join(","), "period": period } });
            if (response.status === 200) {
                response.data.forEach((coin: { "coin": string, "details": { "price": string } }) => {
                    data.push(`/${coin.coin} ${Number(coin.details.price)}`);
                });
                return data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    getOnlyCoinPrice = async (coins: string[], period: string) => {
        const prices: string[] = [];
        try {
            const response = await this.instance.get("/cryptocurrency/info", { params: { "symbol": coins.join(","), "period": period } });
            if (response.status === 200) {
                response.data?.forEach((coin: { "coin": string, "details": { "price": string } }) => {
                    prices.push(`${period}: ${Number(coin.details.price)}`);
                });
                return prices;
            }
        } catch (err) {
            console.log(err);
        }
    }
} 