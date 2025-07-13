import { Document, Schema, model, Types } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    description: string;
    roles: string[];
    screenshots: any[]; // or a proper interface if you have one
    teams: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        description: {
            type: String,
        },
        roles: [
            {
                type: String,
            },
        ],
        screenshots: [
            {
                img: {
                    data: Buffer,
                    contentType: String,
                },
            },
        ],
        teams: [
            {
                type: Types.ObjectId,
                ref: "team",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);
export const userModel = model<IUser>("user", userSchema);
