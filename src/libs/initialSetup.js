import Role from '../models/Roles';
import Location from '../models/Locations';
import User from '../models/User';
import Invitation from '../models/Invitation';

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
};

export const createLocations = async () => {
    try {
        const count = await Location.estimatedDocumentCount()
        if (count > 0) return;

        const values = await Promise.all([
            new Location({ name: 'nothing' }).save(),
            new Location({ name: 'UEES' }).save(),
            new Location({ name: 'Ecotec' }).save(),
            new Location({ name: 'Ecomundo' }).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
};

export const createSampleData = async () => {
    try {
        const userCount = await User.estimatedDocumentCount();
        if (userCount > 0) return;

        const host = new User({
            username: 'jlayanab',
            email: 'jlayanab@icloud.com',
            password: await User.encryptPassword('jebl2920'),
            identification: '0920795317',
            mobile: '0969436980'
        });
        const savedHost = await host.save();

        const guest = new User({
            username: 'guestuser',
            email: 'guest@example.com',
            password: await User.encryptPassword('password'),
            identification: '0987654321',
            mobile: '1234567890'
        });
        await guest.save();

        const invitations = [];
        for (let i = 1; i <= 5; i++) {
            invitations.push({
                host: savedHost._id,
                guestEmail: 'guest@example.com',
                eventName: `Test Event ${i}`,
                eventDate: new Date()
            });
        }

        await Invitation.insertMany(invitations);
        console.log('Sample data created!');

    } catch (error) {
        console.error(error);
    }
};