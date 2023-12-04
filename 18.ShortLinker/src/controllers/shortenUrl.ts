import { HelperService } from "../services/helper.ts";
import { ShortenLinkService } from "../services/shortenLinks.ts";
import express, { Request, Router, Response } from "express";


export class ShortenLinkController {
    private router: Router;
    private shortenLinkService: ShortenLinkService;
    private helperService: HelperService;
    constructor(shortenLinkService: ShortenLinkService, helperService: HelperService) {
        this.shortenLinkService = shortenLinkService;
        this.helperService = helperService;
        this.router = Router();
        this.router.post("/short", this.onPost);
        this.router.get("/*", this.onLinks);
    }

    onPost = async (req: Request, res: Response) => {
        try {
            const link = req.body?.link as string;
            if (!link || !this.helperService.isValidUrl(link)) {
                res.status(400).json({ "message": "Invalid data" });
                return;
                // .then(async (data) => {
                //     const link = await data.shortenLinks;
                //     res.send({
                //         shortenLink: req.protocol + "://" + req.get("host") + "/" + link[0].shorten,
                //     });
                // })
                // .catch((err) => {
                //     res.sendStatus(500);
                // });
            }
            const inserted = await this.shortenLinkService.insertOne(link, this.helperService.generateRandomString(10));
            const shortenLink = await this.shortenLinkService.getByLink(link);
            if (shortenLink.shortenLinks.length > 0) {
                res.send({
                    shortenLink: this.helperService.getHostUrl(req) + shortenLink.shortenLinks[0].shorten,
                });
            } else {
                res.status(400).json({ message: "Can't generate shorten link" }); 
            }

        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    onLinks = async (req: Request, res: Response) => {
        const link = req.path.substring(1);
        try {
            const originalLinks = await this.shortenLinkService.getByShortenLink(link);
            const shortenLinkResult = await originalLinks.shortenLinks;
            if (shortenLinkResult.length > 0) {
                res.redirect(shortenLinkResult[0].link as string);
            } else {
                res.status(400).json({ error: "No such link" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    };

    getRouter = () => {
        return this.router;
    };
}
