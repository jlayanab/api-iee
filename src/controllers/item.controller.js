import Item from '../models/Items';
/*import Location from '../models/Locations';
import User from '../models/User';*/

export const createItem = async (req, res) => {
    const { description, price, project, client, name, invoice, imgURL } = req.body

    const newItem = new Item({
        description,
        price,
        project,
        name,
        client,
        invoice,
        imgURL
    })

    /*if(user){
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
    */
    const itemSave = await newItem.save()
    res.status(201).json(itemSave)
}

export const getItems = async (req, res) => {
    const items = await Item.find();
    res.status(200).json({ status: "OK", data: items })
}

export const getItemById = async (req, res) => {
    const item = await Item.findById(req.params.itemId);
    res.status(200).json({ status: "OK", data: item })
}

export const updateItemById = async (req, res) => {
    const updatedItems =
        await Item.findByIdAndUpdate(req.params.itemId, req.body, {
            new: true
        })
    res.status(200).json({ status: "OK", data: updatedItems })
}

export const deleteItemById = async (req, res) => {
    const { itemId } = req.params
    await Item.findByIdAndDelete(itemId)
    res.status(204).json()
}