import { MarketRepository } from "../repositories/market-repository.ts";
import { MarketTypeInsert, MarketTypeSelect } from "../types/types.ts";

export class MarketService {
    private marketRepository: MarketRepository;
    constructor(marketRepository: MarketRepository) {
        this.marketRepository = marketRepository;
    }
    selectAll = async () => {
        const markets = await this.marketRepository.selectAll().catch((err) => {
            console.log(err);
            return null;
        });
        return markets;
    }

    selectByName = async (marketName: string) => {
        const markets = await this.marketRepository.selectByName(marketName).catch((err) => {
            return null;
        });
        return markets;
    }

    selectById = async (id: number) => {
        const markets = await this.marketRepository.selectById(id).catch((err) => {
            console.log(err);
            return [];
        });
        return markets;
    }

    insertInto = async (marketName: string) => {
        return this.marketRepository.insertInto({ marketName: marketName });
    }

}