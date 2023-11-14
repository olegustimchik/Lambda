import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();
const conn = await mysql.createConnection({
    user: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    host: process.env["DATABASE_HOST"] as string,
    port: Number(process.env["DATABASE_PORT"]),
    database: process.env["DATABASE_NAME"] as string,
});

export const dbConnection = drizzle(conn);
