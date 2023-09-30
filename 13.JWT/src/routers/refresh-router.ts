import express from "express";
import jwt from "jsonwebtoken";
import UsersDBModel from "../DBModels/userModel.ts"
import randomNumber from "../static/randomNumber.ts";
const refreshRouter = express.Router();
const model = new UsersDBModel();


refreshRouter.post("/refresh", async (req, res) => {
    try {
        if (req.headers.authorization) {
            const rand = randomNumber(30, 60);
            const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
            res.send({ "token": jwt.sign({ "userEmail": user.userEmail }, process.env.SECRET, { expiresIn: Math.floor(rand) }), "TTL": Math.floor(rand) });
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(401);
    }
})

export default refreshRouter; 