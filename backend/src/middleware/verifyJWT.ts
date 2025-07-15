import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../common/token";

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
        if (err || !decoded || typeof decoded !== "object") {
            return res.sendStatus(403);
        }

        (req as AuthenticatedRequest).user = decoded as TokenPayload;
        next();
    });
};
