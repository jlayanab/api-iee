import { Schema, model } from 'mongoose';

const codeSchema = new Schema({
    name: String,
    status: Boolean,
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId,
        require: true
    }],  
    locations: [{
        ref: "Location",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});

export default model ('Code', codeSchema);