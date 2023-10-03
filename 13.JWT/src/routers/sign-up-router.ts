import express from "express";
import UserDBModel from "../DBModels/userModel.ts";
const sighUpRouter = express.Router();

sighUpRouter.post("/sign_up", async (req, res) => {
        try {
                const userDBModel = new UserDBModel();
                const data = req.body;
                if (data.email && data.password && !(await userDBModel.checkUserInDB(data.email, data.password))) {
                        userDBModel.insertNewUserInDB(data.email, data.password);
                        res.sendStatus(200);
                } else {
                        res.sendStatus(400);
                }
        } catch (e) {
                res.sendStatus(500);
        }
});

export default sighUpRouter;  