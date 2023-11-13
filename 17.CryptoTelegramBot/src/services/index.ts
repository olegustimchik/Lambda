import { Prisma, PrismaClient } from "@prisma/client";

export default abstract class Service {
    protected prisma;
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
}