import { PrismaClient } from "@prisma/client";

export class UsersRepository{
    private prisma;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    selectAll = async () => {
        return this.prisma.users.findMany();
    }

    getById = async (id: number) => {
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