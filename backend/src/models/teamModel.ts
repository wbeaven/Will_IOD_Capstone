import { Document, Schema, model, Types } from "mongoose";

export interface ITeam extends Document {
    teamName: String;
    jamName: String;
    description: String;
    members: [];
    filledRoles: [];
    availableRoles: [];
    admin: Schema.Types.ObjectId;
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
                userId: {
                    type: Types.ObjectId,
                    ref: "user",
                },
            },
        ],
        filledRoles: [
            {
                role: {
                    type: String,
                },
            },
        ],
        availableRoles: [
            {
                role: {
                    type: String,
                },
            },
        ],
        admin: {
            type: Types.ObjectId,
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
