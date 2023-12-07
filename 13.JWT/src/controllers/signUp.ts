import express, { Router, Request, Response, NextFunction } from "express";
import UsersService from "src/services/Users.ts";
const sighUpRouter = express.Router();

export class SighUpController {
        private router: Router;
        private usersService: UsersService;
        constructor(usersService: UsersService) {
                this.router = express.Router();
                this.usersService = usersService;
                this.router.post("/sign_up", this.onPost);
        }

        onPost = async (req: Request, res: Response, next: NextFunction) => {
                try {
                        const data = req.body;
                        if (!data.email || !data.password) {
                                res.status(400).json({ "message": "Request body should contain email ans password" });
                                return; 
                        }

                        const user = await this.usersService.selectByEmail(data.email);
                        if (user !== null) {
                                res.status(400).json({ "message": "User already exists" });
                                return; 
                        }
                        const insert = await this.usersService.insertOne(data.email, data.password);
                        if (insert.acknowledged === true) {
                                res.status(200).json({ "message": "User seccusfully registered" });
                        } else { 
                                res.status(500).json({ "message": "Something went wrong" });
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
