import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "default_refresh_token_secret";

export type TokenPayload = {
    userId: Types.ObjectId;
    username: string;
    token?: string;
    iat?: number;
    exp?: number;
};

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
