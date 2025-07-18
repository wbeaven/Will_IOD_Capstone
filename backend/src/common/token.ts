import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "default_refresh_token_secret";

export type TokenPayload = {
    id: string;
    username: string;
    token?: string;
    iat?: number;
    exp?: number;
};

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(
        {
            id: payload.id.toString(),
            username: payload.username,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
