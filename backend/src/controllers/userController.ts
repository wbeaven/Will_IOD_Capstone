import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userModel, IUser } from "../models/userModel";

interface IUserCreateInput {
    username: string;
    password: string;
    email?: string;
}

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
        const data: IUserCreateInput = req.body;
        if (!data.password) {
            return res.status(400).send({ result: 400, error: "Password is required" });
        }
        data.password = await bcrypt.hash(data.password, 10);
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

export const getOneUser = (req: Request, res: Response): void => {
    userModel
        .findById(req.params.id)
        .then((data: IUser | null) => {
            if (!data) {
                res.status(404).send({ result: 404, error: "User not found" });
                return;
            }
            res.send({ result: 200, data });
        })
        .catch((err: any) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};
