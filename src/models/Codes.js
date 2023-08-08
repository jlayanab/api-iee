import { Schema, model } from 'mongoose';

const codeSchema = new Schema({
    name: String,
    status: Boolean,
    locations: [{
        ref: "Location",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});

export default model ('Code', codeSchema);