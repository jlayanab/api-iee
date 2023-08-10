import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';

export const signUp = async (req, res) => {
    const {username, email, password, identification, mobile, roles} = req.body;

    //User.find({email})
    const newUser = new User({
        username,
        email,
        identification,
        mobile,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser._id}, config.SECRET,{
        expiresIn: 86400 //24 Horas
    })
    console.log(newUser)
    res.status(200).json({token})
}
export const signIn = async (req, res) => {
    const { email, password} = req.body;
    const userFound = await User.findOne({email: email}).populate("roles");

    if (!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(password, userFound.password)
    if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400 //24 Horas
    })

    res.json({
        id: userFound.id,
        token: token, 
        "identification": userFound.identification 
    })
}