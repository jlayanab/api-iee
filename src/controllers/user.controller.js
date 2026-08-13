import User from "../models/User";
import Role from "../models/Roles";

export const createUser = async (req, res) => {
    try {
        const { username, email, password, identification, mobile, roles, active, fcmToken } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
            identification,
            mobile,
            active: active !== undefined ? active : true,
            fcmToken
        });

        if (roles && roles.length > 0) {
            const foundRoles = await Role.find({
                $or: [
                    { name: { $in: roles } },
                    { _id: { $in: roles.filter(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) } }
                ]
            });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            if (defaultRole) {
                newUser.roles = [defaultRole._id];
            }
        }

        const savedUser = await newUser.save();
        const populatedUser = await User.findById(savedUser._id).select('-password').populate("roles");

        res.status(201).json(populatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El usuario, email, identificación o número móvil ya se encuentra registrado." });
        }
        res.status(500).json({ message: error.message || "Error al crear el usuario", error });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate("roles");
        res.status(200).json({ status: "OK", data: users });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener los usuarios", error });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password').populate("roles");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener el usuario", error });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, identification, mobile, roles, active, fcmToken } = req.body;

        const updateData = {};
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        if (identification !== undefined) updateData.identification = identification;
        if (mobile !== undefined) updateData.mobile = mobile;
        if (active !== undefined) updateData.active = active;
        if (fcmToken !== undefined) updateData.fcmToken = fcmToken;

        if (roles) {
            const foundRoles = await Role.find({
                $or: [
                    { name: { $in: roles } },
                    { _id: { $in: roles.filter(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) } }
                ]
            });
            updateData.roles = foundRoles.map(role => role._id);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true })
            .select('-password')
            .populate("roles");

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de usuario, email, identificación o número móvil ya está en uso por otro registro." });
        }
        res.status(500).json({ message: error.message || "Error al actualizar la información del usuario", error });
    }
};

export const updateFcmToken = async (req, res) => {
    try {
        const userId = req.userId;
        const { fcmToken } = req.body;

        if (!fcmToken) {
            return res.status(400).json({ message: "El fcmToken es requerido." });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { fcmToken }, { new: true })
            .select('-password')
            .populate("roles");

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "FCM Token actualizado exitosamente",
            fcmToken: updatedUser.fcmToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al actualizar el FCM token", error });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { active } = req.body;

        if (active === undefined) {
            return res.status(400).json({ message: "El estado active (true/false) es requerido." });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { active }, { new: true })
            .select('-password')
            .populate("roles");

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: `Usuario ${active ? 'habilitado' : 'deshabilitado'} exitosamente.`,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al cambiar el estado del usuario", error });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "La contraseña es requerida." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.password = await User.encryptPassword(password);
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada exitosamente." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al actualizar la contraseña", error });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al eliminar el usuario", error });
    }
};