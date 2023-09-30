import * as dotenv from "dotenv"; 
dotenv.config(); 
import express, { Express, Request, Response } from 'express';
import sighUpRouter from './routers/sign-up-router.ts';
import loginRouter from './routers/login-router.ts';
import meRouter from "./routers/me-router.ts";
import refreshRouter from "./routers/refresh-router.ts";
const app: Express = express();
const port: string = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ "extended": false }));
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use(meRouter);
app.use(loginRouter);
app.use(sighUpRouter); 
app.use(refreshRouter);
app.use(function (req, res, next) {
    var err: Error = new Error('Not Found',{'cause': 404});
    next(err);
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
}); 