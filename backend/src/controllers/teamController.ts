import { Request, Response } from "express";
import { teamModel, ITeam } from "../models/teamModel";
import { userModel } from "../models/userModel";
import { AuthenticatedRequest } from "../middleware/verifyJWT";
import { Types } from "mongoose";

interface ITeamCreateInput {
    teamName: string;
    jamName: string;
}

export const getTeams = (req: Request, res: Response) => {
    teamModel
        .find({})
        .then((data: ITeam[]) => res.send({ result: 200, data: data }))
        .catch((err: any) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const createTeam = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const data: ITeamCreateInput = req.body;
        if (!data.teamName || !data.jamName) {
            return res
                .status(400)
                .send({ result: 400, error: "Team name and jam name are required" });
        }
        const adminId = req.user?.id;
        if (!adminId) {
            return res.status(401).send({ result: 401, error: "Unauthorized" });
        }

        const newTeam = await new teamModel({
            teamName: data.teamName,
            jamName: data.jamName,
            admin: new Types.ObjectId(adminId),
            members: [new Types.ObjectId(adminId)],
        }).save();
        await userModel.findByIdAndUpdate(adminId, {
            $push: { teams: newTeam._id },
        });

        res.send({ result: 200, data: newTeam });
    } catch (err: any) {
        console.log(err);
        res.send({ result: 500, error: err.message });
    }
};

export const updateTeam = (req: Request, res: Response) => {
    const { teamName, jamName } = req.body;
    if (!teamName?.trim() || !jamName?.trim()) {
        res.status(400).send({ result: 400, error: "Team name and Jam name are required" });
        return;
    }
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

export const getOneTeam = async (req: Request, res: Response) => {
    try {
        const team = await teamModel.findById(req.params.id).populate("members", "username");
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.json({ result: 200, data: team });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserTeams = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ result: 401, error: "Unauthorized" });
            return;
        }

        const user = await userModel.findById(req.user.id).populate("teams");
        if (!user) {
            res.status(404).json({ result: 404, error: "User not found" });
            return;
        }

        res.status(200).json({ result: 200, data: user.teams });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message });
    }
};

export const updateTeamMembers = async (req: Request, res: Response): Promise<void> => {
    const teamId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ result: 400, error: "User ID is required" });
        return;
    }

    try {
        const updatedTeam = await teamModel.findByIdAndUpdate(
            teamId,
            { $addToSet: { members: userId } },
            { new: true }
        );

        if (!updatedTeam) {
            res.status(404).json({ result: 404, error: "Team not found" });
            return;
        }
        if (userId) {
            await userModel.findByIdAndUpdate(userId, {
                $addToSet: { teams: updatedTeam._id },
            });
        }

        res.json({ result: 200, data: updatedTeam });
    } catch (err) {
        console.error("Error updating team members:", err);
        res.status(500).json({ result: 500, error: "Internal server error" });
    }
};
