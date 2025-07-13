// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// // import { userModel, IUser } from "../models/userModel";
// import { findUserByEmail } from "../services/userService";
// import { generateAccessToken, generateRefreshToken, TokenPayload } from "../common/token";
// import { Types } from "mongoose";
// require("dotenv").config();

// export const handleLogin = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//         return res.status(400).json({
//             message: "Email and password are required",
//         });
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(404);
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//         const userPayload: TokenPayload = {
//             userId: user._id as Types.ObjectId,
//             username: user.username,
//         };
//         const accessToken = generateAccessToken(userPayload);
//         const refreshToken = generateRefreshToken(userPayload);

//         const currentUser = { ...user, refreshToken };

//         res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.json({ accessToken });
//         return;
//     } else {
//         res.sendStatus(401);
//     }
// };
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        userId: user._id as Types.ObjectId,
        username: user.username,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
    return; // <-- THIS avoids implicit return of a Response object
};
