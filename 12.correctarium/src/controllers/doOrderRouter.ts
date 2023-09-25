import { Router } from "express";
import PriceAndDeadline from "../priceDeadlineCalc/price-deadline-calculation.ts";

function validation(body) {
    if (!Object.hasOwn(body, "language") || !Object.hasOwn(body, "mimetype") || !Object.hasOwn(body, "count")) {
        return false;
    }
    if ((typeof body.mimetype !== "string") || (typeof body.count !== "number") || (typeof body.language !== "string") || ((body.language !== "en") && (body.language !== "ua/ru"))) {
        return false;
    }
    return true;
}
const doOrderRouter = Router();
const priceDeadlineCalc = new PriceAndDeadline();

doOrderRouter.get("/do/order", (req, res) => {
    try {
        if (!validation(req.body)) {
            throw new Error('Bad request. Your request body must have properties language("en" or "ua/ru"), count - type number, mimetype - type string(none - by default)');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(priceDeadlineCalc.createUserResponse(req.body.mimetype, req.body.count, req.body.language, new Date()));
    } catch (e) {
        res.status(500).json({ "message": e.message });
    }
});

export default doOrderRouter;