import User from "../models/User"

export const createUser = (req, res) => {
    res.json('creating user')
}

export const getUsers = async (req, res) => {
    const user = await User.find().populate("roles");
    res.status(200).json({status: "OK", data: user})
}