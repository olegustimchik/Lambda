import express from "express";
import jwt from "jsonwebtoken";
import UsersDBModel from "../DBModels/userModel.ts"
import randomNumber from "../static/randomNumber.ts";
const loginRouter = express.Router();
const model = new UsersDBModel();


type RequestParams = {
    userEmail: string,
    password: string
};

loginRouter.post("/login", async (req, res) => {
    try {
        const reqQuery: RequestParams = { "userEmail": String(req.query.userEmail), "password": String(req.query.password) };
        const rand = randomNumber(30, 60);
        if (await model.checkUserInDB(reqQuery.userEmail, reqQuery.password)) {
            delete reqQuery.password;
            res.send({ "token": jwt.sign(reqQuery, process.env.SECRET, { expiresIn: Math.floor(rand) }), "TTL": Math.floor(rand) });
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(401);
    }
})

export default loginRouter; 