import type { Config } from "drizzle-kit";
import dataBaseConfig from "./src/configs/databaseConfigs.js"

export default {
    schema: "./src/schemas/schema.ts",
    out: "./drizzle",
    driver: "mysql2",
    dbCredentials: {
        user: dataBaseConfig.user,
        password: dataBaseConfig.password,
        host: dataBaseConfig.host,
        port: dataBaseConfig.port,
        database: dataBaseConfig.database
    }
} satisfies Config;