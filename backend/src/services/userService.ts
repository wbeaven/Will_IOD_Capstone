const userModel = require("../models/userModel");

export const getAllUsers = async (filter = {}) => {
    const users = await userModel.findAll({
        where: filter,
    });
    return users;
};

export const addUserToDB = async (data) => {
    const user = await new userModel(data).save();
    return user;
};
