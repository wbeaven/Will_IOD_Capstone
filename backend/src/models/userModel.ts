import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    description: String;
    // roles: [];
    // screenshots: [];
    // teams: [];
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
        // roles: [
        //     {
        //         type: String,
        //     },
        // ],
        // screenshots: [
        //     {
        //         img: {
        //             data: Buffer,
        //             contentType: String,
        //         },
        //     },
        // ],
        // teams: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "team",
        //     },
        // ],
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
