import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dataBaseConfig from "../configs/databaseConfigs.ts";

const conn = await mysql.createConnection({
    host: dataBaseConfig.host,
    user: dataBaseConfig.user,
    password: dataBaseConfig.password,
    port: dataBaseConfig.port,
    database: dataBaseConfig.database
})

export const dbConnection = drizzle(conn); 