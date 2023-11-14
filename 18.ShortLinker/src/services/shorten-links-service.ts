import { ShortenLinkRepository } from "../repositories/shorten-link-repo.ts";
import { ShortenLinksInsert } from "../types/types.ts";

function generateRandomString(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export class ShortenLinkService {
    private repo: ShortenLinkRepository;
    constructor(repo: ShortenLinkRepository) {
        this.repo = repo;
    }

    getAllShortenLinks = async () => {
        const startTimestamp = Date.now();
        const customers = this.repo.getAll();
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getAllQuery();
        query.params.forEach((param: any) => {
            query.sql = query.sql.replace("?", param);
        });
        query.sql = query.sql.replace("\\", " ");
        return {
            sql: query.sql,
            customers,
            time,
        };
    };

    getByShortenLink = async (shorten: string) => {
        const startTimestamp = Date.now();
        const shortenLinks = this.repo.getOneByShorten(shorten);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getOneByShortenQuery(shorten);
        query.params.forEach((param: any) => {
            query.sql = query.sql.replace("?", param);
        });
        query.sql = query.sql.replace("\\", " ");

        return { shortenLinks, time, sql: query.sql };
    };

    getByLink = async (link: string) => {
        const startTimestamp = Date.now();
        const shortenLinks = this.repo.getOneByLink(link);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getOneByLinkQuery(link);
        query.params.forEach((param: any) => {
            query.sql = query.sql.replace("?", param);
        });
        query.sql = query.sql.replace("\\", " ");

        return { shortenLinks, time, sql: query.sql };
    };

    insertOne = async (link: string) => {
        const shortenLink: ShortenLinksInsert = {
            shorten: generateRandomString(10),
            link: link,
            date: new Date(),
        };
        const startTimestamp = Date.now();
        const shortenLinks = this.repo.getInsertOne(shortenLink);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getInsertOneQuery(shortenLink);
        query.params.forEach((param: any) => {
            query.sql = query.sql.replace("?", param);
        });
        query.sql = query.sql.replace("\\", " ");

        return { shortenLinks, time, sql: query.sql };
    };
}
