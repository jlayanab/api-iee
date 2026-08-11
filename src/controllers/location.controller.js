import Location from '../models/Locations';

export const createLocation = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "El nombre de la ubicación es requerido." });
        }
        const newLocation = new Location({ name });
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al crear la ubicación', error });
    }
};

export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json({ status: "OK", data: locations });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener las ubicaciones', error });
    }
};

export const getLocationById = async (req, res) => {
    try {
        const { locationId } = req.params;
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener la ubicación', error });
    }
};

export const updateLocationById = async (req, res) => {
    try {
        const { locationId } = req.params;
        const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar la ubicación', error });
    }
};

export const deleteLocationById = async (req, res) => {
    try {
        const { locationId } = req.params;
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Ubicación no encontrada" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al eliminar la ubicación', error });
    }
};
