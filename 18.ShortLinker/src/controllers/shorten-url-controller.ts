import { ShortenLinkService } from "../services/shorten-links-service.ts";
import express, { Request, Router, Response } from "express";

function isValidUrl(url: string) {
    try {
        const newUrl = new URL(url);
        return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
        return false;
    }
}

export class ShortenLinkController {
    private router: Router;
    private shortenLinkService: ShortenLinkService;
    constructor(shortenLinkService: ShortenLinkService) {
        this.shortenLinkService = shortenLinkService;
        this.router = Router();
        this.router.post("/short", this.onPost);
        this.router.get("/*", this.onLinks);
    }

    onPost = async (req: Request, res: Response) => {
        try {
            const link = req.body?.link as string;
            if (link && isValidUrl(link)) {
                this.shortenLinkService
                    .insertOne(link)
                    .then(async (data) => {
                        const link = await data.shortenLinks;
                        res.send({
                            shortenLink: req.baseUrl + link[0].shorten,
                        });
                    })
                    .catch((err) => {
                        res.sendStatus(500);
                    });
            } else {
                res.sendStatus(400);
            }
        } catch (e) {
            console.log(e);
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
                res.sendStatus(400).json({ error: "No such link" });
                
            }
        } catch (err) {
           // res.sendStatus(500);
        }
    };
    getRouter = () => {
        return this.router;
    };
}
