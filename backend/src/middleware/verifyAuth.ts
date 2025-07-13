import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: String;
}

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
            res.sendStatus(403);
            return;
        }
        const user = decoded as JwtPayload & IUser;
        req.user = user.username;
        next();
    });
};
