import express from "express";
const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    console.log(req.body); 
    res.sendStatus(200); 
})

export default mainRouter; 