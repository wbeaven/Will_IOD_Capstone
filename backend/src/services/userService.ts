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
    // return a promise that resolves to IUser or null

    // Find the user by username and include the password field
    const user = await userModel.findOne({ email }).select("+password");

    // Return the user object
    return user;
};
