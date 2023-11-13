import { PrismaClient } from "@prisma/client";
import Service from "./index.ts";

export class UsersService extends Service {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    selectAll = () => {
        return this.prisma.users.findMany();
    }

    getById = (id: number) => {
        return this.prisma.users.findUnique({ where: { id: id } });
    }

    getByTelegramId = async (telegramId: number) => {
        return this.prisma.users.findUnique({ where: { telegramId: telegramId } });
    }

    insertOne = async (telegramId: number) => {
        return this.prisma.users.upsert({
            where: { telegramId: telegramId },
            update: { telegramId: telegramId },
            create: { telegramId: telegramId }
        });
    }
}