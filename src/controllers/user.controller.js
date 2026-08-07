import User from "../models/User"

export const createUser = (req, res) => {
    res.json('creating user')
}

export const getUsers = async (req, res) => {
    const user = await User.find().populate("roles");
    res.status(200).json({status: "OK", data: user})
}

export const updatePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = await User.encryptPassword(password);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}