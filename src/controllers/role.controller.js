import Role from '../models/Roles';

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ status: "OK", data: roles });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los roles', error });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener el rol', error });
    }
};
