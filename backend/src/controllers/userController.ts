import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userModel, IUser } from "../models/userModel";

export const getUsers = (req: Request, res: Response) => {
    userModel
        .find({})
        .then((data: IUser[]) => res.send({ result: 200, data: data }))
        .catch((err: any) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const data: IUser = req.body;
        if (!data.password) {
            return res.status(400).send({ result: 400, error: "Password is required" });
        }
        const newUser = await new userModel(data).save();
        res.send({ result: 200, data: newUser });
    } catch (err: any) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};

export const updateUser = (req: Request, res: Response) => {
    userModel
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const deleteUser = (req: Request, res: Response) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

// export const getMe = (req: AuthenticatedRequest, res: Response): void => {
//     if (!req.user) {
//         res.status(401).json({ message: "Not authenticated" });
//         return;
//     }
//     const userObj = typeof req.user.toObject === "function" ? req.user.toObject() : req.user;
//     if (userObj.password) delete userObj.password;
//     res.json(userObj);
// };
