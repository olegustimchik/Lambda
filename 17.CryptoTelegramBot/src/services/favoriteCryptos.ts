import { PrismaClient } from "@prisma/client";
import { FavoriteRepository } from "../repositories/favoriteCryptos.ts";

export class FavoriteService{
    private favoriteRepository: FavoriteRepository; 
    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    selectAll = async () => {
        return this.favoriteRepository.selectAll(); 
    }

    getFavoriteByUserId = async (userId: number) => {
        return this.favoriteRepository.getFavoriteByUserId(userId); 
    }

    getFavoriteByUserIdAndCoinSymbol = async (userId: number, coinSymbol: string) => {
        return this.favoriteRepository.getFavoriteByUserIdAndCoinSymbol(userId, coinSymbol); 
    }

    insertToFavorite = async (userId: number, coinSymbol: string) => {
        return this.favoriteRepository.insertToFavorite(userId, coinSymbol); 
    }

    deleteById = async (id: string) => {
        return this.favoriteRepository.deleteById(id);
    }

    deleteByUserIdAndCoinSymbol = async (userId: number, coinSymbol: string) => {
        return this.favoriteRepository.deleteByUserIdAndCoinSymbol(userId, coinSymbol);
    }
}