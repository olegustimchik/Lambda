import * as dotenv from "dotenv";
dotenv.config();

const dataBaseConfig = {
    host: process.env["DATABASE_HOST"] as string,
    user: process.env["DATABASE_USERNAME"] as string,
    password: process.env["DATABASE_PASSWORD"] as string,
    port: Number(process.env["DATABASE_PORT"]) as number,
    database: process.env["DATABASE_NAME"] as string
}

export default dataBaseConfig; 