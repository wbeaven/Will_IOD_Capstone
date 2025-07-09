import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { teamModel, ITeam } from "../models/teamModel";

export const getTeams = (req: Request, res: Response) => {
    teamModel
        .find({})
        .then((data: ITeam[]) => res.send({ result: 200, data: data }))
        .catch((err: any) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const createTeam = async (req: Request, res: Response) => {
    try {
        const data: ITeam = req.body;
        if (!data.teamName) {
            return res.status(400).send({ result: 400, error: "Team name is required" });
        }
        const newTeam = await new teamModel(data).save();
        res.send({ result: 200, data: newTeam });
    } catch (err: any) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};

export const updateTeam = (req: Request, res: Response) => {
    teamModel
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const deleteTeam = (req: Request, res: Response) => {
    teamModel
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
