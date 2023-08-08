import Code from '../models/Codes';
import Location from '../models/Locations';

export const createCode = async (req, res) => {
    const {name, status, location} = req.body

    const newCode = new Code({
        name, 
        status
    })

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
    res.json(codes)
 }
 
 export const getCodeById = async (req, res) => {
    const code = await Code.findById(req.params.codeId).populate("locations");
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