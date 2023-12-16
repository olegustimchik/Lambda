import express, { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import randomNumber from "../static/randomNumber.ts";
import UsersService from "src/services/Users.ts";

export class LoginController {
    private router: Router;
    private usersService: UsersService;
    constructor(usersService: UsersService) {
        this.router = express.Router();
        this.usersService = usersService;
        this.router.post("/login", this.onPost);
    }

    onPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.query.email as string;
            const password = req.query.password as string;
            if (!email || !password) {
                return res.status(400).json({ "message": "Invalid data" });
            }
            const rand = randomNumber(30, 60);
            const user = await this.usersService.selectByEmailAndPassword(email, password);
            if (user !== null) {
                return res.send({ "token": jwt.sign({ "email": user.userEmail }, process.env.SECRET, { expiresIn: Math.floor(rand) }), "TTL": Math.floor(rand) });
            } else {
                return res.status(400).json({ "message": "Not registered" });
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }

    getRouter = () => {
        return this.router;
    }

}
