import { ShortenLinkRepository } from "../repositories/shortenLink.ts";
import { ShortenLinksInsert } from "../types/types.ts";

export class ShortenLinkService {
    private repo: ShortenLinkRepository;
    constructor(repo: ShortenLinkRepository) {
        this.repo = repo;
    }

    getAllShortenLinks = async () => {
        const startTimestamp = Date.now();
        const customers = await this.repo.getAll();
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getAllQuery();
        
        return {
            sql: query.sql,
            customers,
            time,
        };
    };

    getByShortenLink = async (shorten: string) => {
        const startTimestamp = Date.now();
        const shortenLinks = await this.repo.getOneByShorten(shorten);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getOneByShortenQuery(shorten);

        return { shortenLinks, time, sql: query.sql };
    };

    getByLink = async (link: string) => {
        const startTimestamp = Date.now();
        const shortenLinks = await this.repo.getOneByLink(link);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getOneByLinkQuery(link);

        return { shortenLinks, time, sql: query.sql };
    };

    insertOne = async (link: string, shorten: string) => {
        const shortenLink: ShortenLinksInsert = {
            shorten: shorten, //generateRandomString(10),
            link: link,
            date: new Date(),
        };
        const startTimestamp = Date.now();
        const shortenLinks = await this.repo.getInsertOne(shortenLink);
        const endTimestamp = Date.now();
        const time = endTimestamp - startTimestamp;

        const query = this.repo.getInsertOneQuery(shortenLink);
        return { shortenLinks, time, sql: query.sql };
    };
}
