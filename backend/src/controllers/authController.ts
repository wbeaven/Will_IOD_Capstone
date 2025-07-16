import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../services/userService";
import { generateAccessToken, generateRefreshToken, TokenPayload } from "../common/token";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.sendStatus(401);
        return;
    }

    const userPayload: TokenPayload = {
        id: user._id as string,
        username: user.username,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
    return;
};
