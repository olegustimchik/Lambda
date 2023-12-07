import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from 'express';
import { SighUpController } from './src/controllers/signUp.ts';
import { LoginController } from './src/controllers/login.ts';
import { MeController } from "./src/controllers/me.ts";
import { RefreshController } from "./src/controllers/refresh.ts";
import { MongoClient } from "mongodb";
import UsersRepository from "./src/repositories/Users.ts";
import UsersService from "./src/services/Users.ts";

const client = new MongoClient(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/");
try {
    await client.connect();
}
catch (err) {
    console.log(err);
    process.exit();
}
const db = await client.db("jwt_users");

const usersRepository = new UsersRepository(db);
const usersService = new UsersService(usersRepository);

const loginController = new LoginController(usersService);
const sighUpController = new SighUpController(usersService);
const meController = new MeController(); 
const refreshController = new RefreshController(); 

const app: Express = express();
const port: string = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ "extended": false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(loginController.getRouter());
app.use(sighUpController.getRouter());
app.use(refreshController.getRouter());
app.use(meController.getRouter()); 

app.use(function (req, res, next) {
    var err: Error = new Error('Not Found', { 'cause': 404 });
    next(err);
});

const server = app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
}); 

function gracefulShutdownHandler(){ 
    client.close().then(()=> { 
        console.log("MongoDB client is closed")
    }).catch((reason)=> {
        console.log("error occurred while trying to close MongoDB"); 
        console.log(reason);
    });
    server.close();
}
process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);