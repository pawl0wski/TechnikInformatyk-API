import { Request, Response } from "express";

function getPing(req: Request, res: Response) {
    res.send("pong");
}

export default getPing;
