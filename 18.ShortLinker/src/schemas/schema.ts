import { mysqlTable, uniqueIndex, varchar, text, datetime } from "drizzle-orm/mysql-core";

export const shortenLinks = mysqlTable(
    "shorten_links",
    {
        shorten: varchar("shorten", { length: 10 }).notNull(),
        link: text("link"),
        date: datetime("date"),
    },
    (table) => {
        return {
            uniqueShortenLink: uniqueIndex("unique_shorten_link").on(table.shorten),
        };
    }
);
