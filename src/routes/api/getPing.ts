import { Request, Response } from "express";

function getPing(req: Request, res: Response) {
    res.type("txt").send("pong");
}

export default getPing;
