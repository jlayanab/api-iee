import Code from '../models/Codes';
import Location from '../models/Locations';
import User from '../models/User';

export const createCode = async (req, res) => {
    const {name, status, user, location} = req.body

    const newCode = new Code({
        name, 
        status
    })
    
    if(user){
        const foundUsers = await User.find({email: {$in: user}})
        newCode.user = foundUsers.map(user => user._id)
    }

    if(location){
        const foundLocations = await Location.find({name: {$in: location}})
        newCode.locations = foundLocations.map(location => location._id)
    }else{
        const location = await Location.findOne({name: "nothing"})
        newCode.locations = [location._id]
    }

    const codeSave = await newCode.save()
    res.status(201).json(codeSave)
}

export const getCodes = async (req, res) => {
    const codes = await Code.find().populate("locations");
    res.status(200).json({status: "OK", data: codes})
 }
 
 export const getCodeById = async (req, res) => {
    const code = await Code.findById(req.params.userId).populate("locations");
    res.status(200).json(code)
 }
 
 export const updateCodeById = async (req, res) => {
     const updatedCode = 
     await Code.findByIdAndUpdate(req.params.codeIdId, req.body,{
         new: true
     })
     res.status(200).json(updatedCode) 
 }
 
 export const deleteCodeById = async (req, res) => {
     const { codeId } = req.params
     await Code.findByIdAndDelete(codeId)
     res.status(204).json()
 }