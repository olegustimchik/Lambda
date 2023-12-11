import express, { Express, Request, Response} from 'express';
import mainRouter from './controllers/mainPageRouter.ts';
import doOrderRouter from './controllers/doOrderRouter.ts';
const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({"extended": false})); 
app.use((req, res, next) => {
    console.log(`time ${new Date()}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
  }); 
  
app.use("/", mainRouter);
app.use(doOrderRouter); 
app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
}); 