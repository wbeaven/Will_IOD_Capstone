import { Request, Response } from "express";
import { findUserRefreshToken } from "../services/userService";
import dotenv from "dotenv";
dotenv.config();

export const handleLogout = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }

    const refreshToken = cookies.jwt;

    const user = await findUserRefreshToken(refreshToken);
    if (!user) {
        res.clearCookie("jwt", { httpOnly: true });
        res.sendStatus(204);
        return;
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);
};
