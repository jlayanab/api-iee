import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    responsible: String,
    name: String,
    description: String,
    date: Date,
    price: Number,
    project: String,
    client: String,
    quotation: String,
    invoice: String,
    retencion: Boolean,
    paid: Boolean,
    datepaid: Date,
    imgURL: String
    },
    {
        timestamps: true,
        versionKey: false
    })

export default model('Item', itemSchema);