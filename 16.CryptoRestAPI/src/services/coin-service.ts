import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { CoinRepository } from "../repositories/coin-repository.ts";
import { CoinTypeInsert } from "../types/types.ts";

export class CoinService {
    private coinRepository: CoinRepository;
    constructor(coinRepository: CoinRepository) {
        this.coinRepository = coinRepository;
    }

    selectAll = async () => {
        const coins = await this.coinRepository.selectAll().catch((err) => {
            console.log(err);
            return [];
        });
        return coins;
    }

    selectCoinBySymbol = async (coin: string) => {
        const coins = await this.coinRepository.selectByCoinSymbol(coin).catch((err) => {
            console.log(err);
            return [];
        });
        return coins;
    }

    saveManyCoins = async (coins: string[]) => {
        const coinsToInsert: CoinTypeInsert[] = coins.map(elem => { return { coinSymbol: elem }; });
        return await this.coinRepository.insertManyInto(coinsToInsert);
    }

    saveCoin = async (coin: string) => {
        return this.coinRepository.insertInto({ coinSymbol: coin });
    }

}
