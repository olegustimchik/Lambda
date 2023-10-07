import express from 'express';
import RouterModel from '../models/router-model.ts';
import { throws } from 'assert';
const userRouter = express.Router();
const routerModel = new RouterModel();

userRouter.post('/*\/', async function (req, res) {
    try {
        if (await routerModel.findOne(req.url, req.body) != null) {
            await routerModel.findOneAndUpdate(req.url, req.body);
        } else {
            await routerModel.save(req.url, req.body);
        }
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


userRouter.get('/*\/', async function (req, res) {
    try {
        const userRouter = await routerModel.findOne(req.url, req.body);
        if (userRouter != null) {
            res.send(userRouter.data);
        } else { 
            res.sendStatus(404); 
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default userRouter; 