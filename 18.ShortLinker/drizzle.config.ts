import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./src/schemas/schema.ts",
    out: "./drizzle",
    driver: "mysql2",
    dbCredentials: {
        user: process.env["DATABASE_USERNAME"],
        password: process.env["DATABASE_PASSWORD"],
        host: process.env["DATABASE_HOST"] as string,
        port: Number(process.env["DATABASE_PORT"]),
        database: process.env["DATABASE_NAME"] as string,
    },
} satisfies Config;
