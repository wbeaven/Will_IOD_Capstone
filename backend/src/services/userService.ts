import { userModel } from "../models/userModel";

export const findUserByEmail = async (email: string) => {
    const user = await userModel.findOne({ email }).select("+password");

    return user;
};

export const findUserRefreshToken = async (refreshToken: string) => {
    const user = await userModel.findOne({ refreshToken });

    return user;
};
