import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { CoinRepository } from "../repositories/coin.ts";
import { CoinTypeInsert } from "../types/tables.ts";

export class CoinService {
    private coinRepository: CoinRepository;
    constructor(coinRepository: CoinRepository) {
        this.coinRepository = coinRepository;
    }

    selectAll = async () => {
        const coins = await this.coinRepository.selectAll();
        return coins;
    };

    selectCoinBySymbol = async (coin: string) => {
        const coins = await this.coinRepository.selectByCoinSymbol(coin);
        return coins;
    };

    saveManyCoins = async (coins: string[]) => {
        const coinsToInsert: CoinTypeInsert[] = coins.map((elem) => {
            return { coinSymbol: elem };
        });
        return await this.coinRepository.insertMany(coinsToInsert);
    };

    saveCoin = async (coin: string) => {
        return this.coinRepository.insertOne({ coinSymbol: coin });
    };
}
