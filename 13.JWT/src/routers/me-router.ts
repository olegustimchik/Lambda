import express from "express";
import jwt from "jsonwebtoken";
import UsersDBModel from "../DBModels/userModel.ts";
const meRouter = express.Router();

meRouter.get(/\me[0-9]$/, async (req, res) => {
    try {
        const userModel = new UsersDBModel();
        const user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
        if (user.userEmail) {
            const count = await userModel.getUserRequests(user.userEmail);
            console.log(await userModel.updateUserRequests(user.userEmail, count + 1));
            res.send({ "count": count });
        } else  {
            res.send(401); 
        }
    } catch (error) {
        console.log(error); 
        return res.sendStatus(500);
    }
})
export default meRouter; 