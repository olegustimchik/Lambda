import type { MySql2Database, MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { ShortenLinksInsert, ShortenLinksSelect } from "../types/types.ts";
import { shortenLinks } from "../schemas/schema.ts";
import { eq } from "drizzle-orm";

export class ShortenLinkRepository {
    private dbConnection: MySql2Database;
    constructor(dbConnection: MySql2Database) {
        this.dbConnection = dbConnection;
    }

    getAll = async () => {
        return this.dbConnection.select().from(shortenLinks);
    };

    getAllQuery = () => {
        return this.dbConnection.select().from(shortenLinks).toSQL();
    };

    getOneByLink = async (link: string) => {
        return this.dbConnection.select().from(shortenLinks).where(eq(shortenLinks.link, link));
    };

    getOneByLinkQuery = (link: string) => {
        return this.dbConnection.select().from(shortenLinks).where(eq(shortenLinks.link, link)).toSQL();
    };

    getOneByShorten = async (shortenLink: string) => {
        return this.dbConnection.select().from(shortenLinks).where(eq(shortenLinks.shorten, shortenLink));
    };

    getOneByShortenQuery = (shortenLink: string) => {
        return this.dbConnection.select().from(shortenLinks).where(eq(shortenLinks.shorten, shortenLink)).toSQL();
    };

    getInsertOne = async (shortenLink: ShortenLinksInsert) => {
        const links = await this.getOneByLink(shortenLink.link as string);
        if (links.length > 0) {
            return links;
        } else {
            await this.dbConnection
                .insert(shortenLinks)
                .values(shortenLink)
                .onDuplicateKeyUpdate({
                    set: { shorten: shortenLink.shorten },
                });
            return this.getOneByLink(shortenLink.link as string);
        }
    };

    getInsertOneQuery = (shortenLink: ShortenLinksInsert) => {
        return this.dbConnection
            .insert(shortenLinks)
            .values(shortenLink)
            .onDuplicateKeyUpdate({ set: { link: shortenLink.link } })
            .toSQL();
    };
}
