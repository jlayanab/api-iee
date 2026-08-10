import Code from '../models/Codes';
import Location from '../models/Locations';
import User from '../models/User';

export const createCode = async (req, res) => {
    try {
        const { 
            code, 
            name, 
            status, 
            user, 
            recipientUser,
            location, 
            validFrom, 
            validUntil, 
            guestName, 
            guestIdentification, 
            guestMobile,
            guestEmail,
            vehiclePlate 
        } = req.body;

        if (!code) {
            return res.status(400).json({ message: "El código de acceso (code) es requerido." });
        }

        const newCode = new Code({
            code,
            name,
            status: status !== undefined ? status : true,
            validFrom,
            validUntil,
            guestName,
            guestIdentification,
            guestMobile,
            guestEmail,
            vehiclePlate
        });

        // Asignar emisor/anfitrión
        const hostList = user || (req.userId ? [req.userId] : null);
        if (hostList) {
            const userList = Array.isArray(hostList) ? hostList : [hostList];
            const foundUsers = await User.find({
                $or: [
                    { email: { $in: userList } },
                    { _id: { $in: userList.filter(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) } }
                ]
            });
            newCode.user = foundUsers.map(u => u._id);
        }

        // Asignar receptor (si viene el ID directo o buscando por teléfono / email del contacto)
        if (recipientUser) {
            newCode.recipientUser = recipientUser;
        } else if (guestMobile || guestEmail) {
            const recipientOr = [];
            if (guestMobile) recipientOr.push({ mobile: guestMobile });
            if (guestEmail) recipientOr.push({ email: guestEmail });
            const foundRecipient = await User.findOne({ $or: recipientOr });
            if (foundRecipient) {
                newCode.recipientUser = foundRecipient._id;
            }
        }

        if (location) {
            const locList = Array.isArray(location) ? location : [location];
            const foundLocations = await Location.find({
                $or: [
                    { name: { $in: locList } },
                    { _id: { $in: locList.filter(id => typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) } }
                ]
            });
            newCode.locations = foundLocations.map(l => l._id);
        } else {
            const defaultLoc = await Location.findOne({ name: "nothing" });
            if (defaultLoc) {
                newCode.locations = [defaultLoc._id];
            }
        }

        const codeSave = await newCode.save();
        res.status(201).json(codeSave);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El código de acceso ingresado ya existe." });
        }
        res.status(500).json({ message: error.message || 'Error al guardar el código de acceso', error });
    }
};

export const getCodes = async (req, res) => {
    try {
        const codes = await Code.find()
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile");
        res.status(200).json({ status: "OK", data: codes });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los códigos', error });
    }
};

export const getReceivedCodes = async (req, res) => {
    try {
        const userId = req.userId;
        const currentUser = await User.findById(userId);

        const queryOr = [{ recipientUser: userId }];
        if (currentUser && currentUser.mobile) queryOr.push({ guestMobile: currentUser.mobile });
        if (currentUser && currentUser.email) queryOr.push({ guestEmail: currentUser.email });

        const codes = await Code.find({ $or: queryOr })
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile")
            .sort({ createdAt: -1 });

        res.status(200).json({ status: "OK", data: codes });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los códigos recibidos', error });
    }
};

export const getSentCodes = async (req, res) => {
    try {
        const userId = req.userId;
        const codes = await Code.find({ user: userId })
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile")
            .sort({ createdAt: -1 });

        res.status(200).json({ status: "OK", data: codes });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los códigos enviados', error });
    }
};

export const getCodeById = async (req, res) => {
    try {
        const { codeId } = req.params;
        const code = await Code.findById(codeId)
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile");
        if (!code) {
            return res.status(404).json({ message: "Código no encontrado" });
        }
        res.status(200).json(code);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener el código', error });
    }
};

export const getCodesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const codes = await Code.find({ user: userId })
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile");
        res.status(200).json({ status: "OK", data: codes });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener los códigos del usuario', error });
    }
};

export const verifyAccess = async (req, res) => {
    try {
        const { code, locationId, locationName } = req.body;

        if (!code) {
            return res.status(400).json({ allowed: false, message: "El código es requerido." });
        }

        const foundCode = await Code.findOne({ code })
            .populate("locations")
            .populate("user", "username email identification mobile")
            .populate("recipientUser", "username email identification mobile");

        if (!foundCode) {
            return res.status(404).json({ allowed: false, message: "Código no registrado o no encontrado." });
        }

        if (!foundCode.status) {
            return res.status(403).json({ allowed: false, message: "Código inactivo o revocado." });
        }

        const now = new Date();
        if (foundCode.validFrom && now < new Date(foundCode.validFrom)) {
            return res.status(403).json({ allowed: false, message: "El código aún no se encuentra vigente." });
        }

        if (foundCode.validUntil && now > new Date(foundCode.validUntil)) {
            return res.status(403).json({ allowed: false, message: "El código ha expirado." });
        }

        if (locationId || locationName) {
            const isAuthorizedLoc = foundCode.locations.some(loc => {
                if (locationId && loc._id.toString() === locationId.toString()) return true;
                if (locationName && loc.name && loc.name.toLowerCase() === locationName.toLowerCase()) return true;
                return false;
            });

            if (!isAuthorizedLoc) {
                return res.status(403).json({ 
                    allowed: false, 
                    message: "El código no está autorizado para ingresar por esta ubicación/garita." 
                });
            }
        }

        res.status(200).json({
            allowed: true,
            message: "Acceso autorizado.",
            code: foundCode
        });
    } catch (error) {
        res.status(500).json({ allowed: false, message: error.message || 'Error al verificar el acceso', error });
    }
};

export const updateCodeById = async (req, res) => {
    try {
        const { codeId } = req.params;
        const updatedCode = await Code.findByIdAndUpdate(codeId, req.body, {
            new: true
        })
        .populate("locations")
        .populate("user", "username email identification mobile")
        .populate("recipientUser", "username email identification mobile");
        if (!updatedCode) {
            return res.status(404).json({ message: "Código no encontrado" });
        }
        res.status(200).json(updatedCode);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar el código', error });
    }
};

export const deleteCodeById = async (req, res) => {
    try {
        const { codeId } = req.params;
        const deletedCode = await Code.findByIdAndDelete(codeId);
        if (!deletedCode) {
            return res.status(404).json({ message: "Código no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al eliminar el código', error });
    }
};