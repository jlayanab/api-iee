import { Schema, model } from 'mongoose';
import Items from './Items';

const boxSchema = new Schema({
    ident: String,
    items: [Items.schema],
    total: { type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false
})

export default model('Box', boxSchema);