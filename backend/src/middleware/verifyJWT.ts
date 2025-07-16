import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: {
        id?: string;
        username?: string;
    };
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET not set");
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err || !decoded || typeof decoded !== "object") {
            return res.sendStatus(403);
        }

        const { id, username } = decoded as any;

        if (!id) {
            return res.sendStatus(403);
        }

        (req as AuthenticatedRequest).user = { id, username };

        next();
    });
};
