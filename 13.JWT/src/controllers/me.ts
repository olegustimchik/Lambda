import express, { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class MeController {
    private router: Router;
    constructor() {
        this.router = express.Router();
        this.router.get(/\me[0-9]$/, this.onGet);
    }

    onGet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = req.url.match(/[0-9]/);
            if (!req.headers.authorization) {
                res.status(400).json({"message": "Authorization header not specified"});
                return ; 
            }
            const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
            console.log(user, process.env.SECRET);
            if (user) {
                res.send({ "request_num": Number(count[0]), data: { "login": user.email } });
            } else {
                res.status(400).json({ "message": "Unauthorized" });
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }

    getRouter = () => {
        return this.router;
    }
}
