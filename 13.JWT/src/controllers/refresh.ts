import express, { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import randomNumber from "../static/randomNumber.ts";

export class RefreshController {
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.router.post("/refresh", this.onPost);
    }

    onPost = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.headers.authorization) {
                const rand = randomNumber(30, 60);
                const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
                console.log(user); 
                res.send({ "token": jwt.sign({ "email": user.email }, process.env.SECRET, { expiresIn: Math.floor(rand) }), "TTL": Math.floor(rand) });
            } else {
                res.status(400).json({"message": "Authorization header not specified"});
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(401);
        }
    }

    getRouter = () => {     
        return this.router; 
    }
}
