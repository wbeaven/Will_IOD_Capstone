import { TokenPayload } from "../common/token";
import { IUser } from "../models/userModel";

import { userModel } from "../models/userModel";

// export const getAllUsers = async (filter = {}) => {
//     const users = await userModel.findAll({
//         where: filter,
//     });
//     return users;
// };

// export const addUserToDB = async (data) => {
//     const user = await new userModel(data).save();
//     return user;
// };

export const findUserByEmail = async (email: string) => {
    const user = await userModel.findOne({ email }).select("+password");

    return user;
};

export const findUserRefreshToken = async (refreshToken: string) => {
    const user = await userModel.findOne({ refreshToken });

    return user;
};
