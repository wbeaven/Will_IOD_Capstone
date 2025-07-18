import { Request, Response } from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import { userModel, IUser } from "../models/userModel";

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

export const updateUser = [
    upload.array("screenshots"),
    async (req: Request, res: Response) => {
        try {
            const user = await userModel.findById(req.params.id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            const updates: any = {
                username: req.body.username,
                description: req.body.description,
                roles: req.body.roles,
            };

            if (req.files && (req.files as Express.Multer.File[]).length > 0) {
                const newScreenshots = (req.files as Express.Multer.File[]).map((file) => ({
                    img: {
                        data: file.buffer,
                        contentType: file.mimetype,
                    },
                }));

                updates.screenshots = user.screenshots
                    ? user.screenshots.concat(newScreenshots)
                    : newScreenshots;
            }

            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, updates, {
                new: true,
            });

            res.json({ result: 200, data: updatedUser });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },
];

export const deleteUser = (req: Request, res: Response) => {
    userModel
        .findByIdAndDelete(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

export const getOneUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userModel
            .findById(req.params.id)
            .populate({ path: "teams", populate: { path: "members", model: "user" } });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const userObj: any = user.toObject();

        if (userObj?.screenshots) {
            userObj.screenshots = userObj.screenshots.map((screenshot: any) => ({
                img: {
                    contentType: screenshot.img.contentType,
                    data: screenshot.img.data.toString("base64"),
                },
            }));
        }

        res.json({ result: 200, data: userObj });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
