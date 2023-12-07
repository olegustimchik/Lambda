import express, { Router, Request, Response, NextFunction } from 'express';
import { UserRouterService } from '../services/userRouter.ts';

export class UserRouterController {
    private userRouterService: UserRouterService;
    private router: Router;
    constructor(userRouterService: UserRouterService) {
        this.router = express.Router();
        this.userRouterService = userRouterService;
        this.router.post('/*\/', this.onPost)
        this.router.get('/*\/', this.onGet)
    }

    onPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ "message": "Body is empty" });
            }
            const founded = await this.userRouterService.findOneAndUpdate(req.url, req.body);
            if (founded != null) {
                return res.send({ 'message': "Your data was updated" });
            }
            const saved = await this.userRouterService.save(req.url, req.body);
            return res.send({ 'message': "Your data saved successfully" });
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": "Something went wrong" });
        }
    }


    onGet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ "message": "Body is empty" });
            }
            const userRouter = await this.userRouterService.findOne(req.url);
            if (userRouter != null) {
                return res.send(userRouter.data);
            } else {
                return res.status(404).json({ "message": "there is no data recorded on this link" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ "message": "Something went wrong" });
        }
    }

    getRouter = () => {
        return this.router;
    }

}