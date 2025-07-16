import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserRefreshToken } from "../services/userService";
import { generateAccessToken, TokenPayload } from "../common/token";
import dotenv from "dotenv";
dotenv.config();

export const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(401);
        return;
    }

    const refreshToken = cookies.jwt;

    const user = await findUserRefreshToken(refreshToken);
    if (!user) {
        res.sendStatus(403);
        return;
    }

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined.");
    }

    jwt.verify(
        refreshToken,
        refreshTokenSecret,
        function (err: jwt.VerifyErrors | null, decoded: unknown) {
            if (err || !decoded || typeof decoded !== "object") {
                res.sendStatus(403);
                return;
            }

            const { id, username } = decoded as TokenPayload;
            const accessToken = generateAccessToken({ id, username });

            res.json({ accessToken });
        }
    );
};
