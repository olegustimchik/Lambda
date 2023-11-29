import { MarketRepository } from "../repositories/market.ts";
import { MarketTypeInsert, MarketTypeSelect } from "../types/tables.ts";

export class MarketService {
    private marketRepository: MarketRepository;
    constructor(marketRepository: MarketRepository) {
        this.marketRepository = marketRepository;
    }

    selectAll = async () => {
        return await this.marketRepository.selectAll();
    };

    selectByName = async (marketName: string) => {
        return await this.marketRepository.selectByName(marketName);
    };

    selectById = async (id: number) => {
        return await this.marketRepository.selectById(id);
    };

    insertInto = async (marketName: string) => {
        return this.marketRepository.insertOne({ marketName: marketName });
    };
}
