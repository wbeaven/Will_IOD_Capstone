import { Document, Schema, model, Types } from "mongoose";

export interface ITeam extends Document {
    teamName: string;
    jamName: string;
    description: string;
    members: Types.ObjectId[];
    filledRoles: string[];
    availableRoles: string[];
    admin: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
    {
        teamName: {
            type: String,
            required: true,
            unique: true,
        },
        jamName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        filledRoles: [
            {
                type: String,
            },
        ],
        availableRoles: [
            {
                type: String,
            },
        ],
        admin: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
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
export const teamModel = model<ITeam>("team", teamSchema);
