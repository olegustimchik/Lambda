import { PrismaClient } from "@prisma/client";
import Service from "./index.ts";

export class FavoriteService extends Service {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    selectAll = () => {
        return this.prisma.favoriteCryptos.findMany();
    }

    getFavoriteByUserId = async (userId: number) => {
        return this.prisma.favoriteCryptos.findMany({ where: { userId: userId } });
    }

    getFavoriteByUserIdAndCoinSymbol = async (userId: number, coinSymbol: string) => {
        return this.prisma.favoriteCryptos.findMany({ where: { AND: [{ userId: userId }, { coinSymbol: coinSymbol }] } });
    }

    insertToFavorite = async (userId: number, coinSymbol: string) => {
        return this.prisma.favoriteCryptos.create({
            data: { userId: userId, coinSymbol: coinSymbol }
        });
    }

    deleteById = async (id: string) => {
        return this.prisma.favoriteCryptos.delete({ where: { id: id } });
    }

    deleteByUserIdAndCoinSymbol = async (userId: number, coinSymbol: string) => {
        return this.prisma.favoriteCryptos.deleteMany({ where: { AND: [{ userId: userId }, { coinSymbol: coinSymbol }] } })
    }
}