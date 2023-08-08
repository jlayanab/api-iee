import Role from '../models/Roles';
import Location from '../models/Locations';
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if(count >0) return;

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
};

export const createLocations = async () => {
    try {
        const count = await Location.estimatedDocumentCount()
        if(count >0) return;

        const values = await Promise.all([
            new Location({name: 'nothing'}).save(),
            new Location({name: 'UEES'}).save(),
            new Location({name: 'Ecotec'}).save(),
            new Location({name: 'Ecomundo'}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}