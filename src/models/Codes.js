import { Schema, model } from 'mongoose';

const codeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    }],  
    recipientUser: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    locations: [{
        ref: "Location",
        type: Schema.Types.ObjectId
    }],
    validFrom: {
        type: Date
    },
    validUntil: {
        type: Date
    },
    guestName: {
        type: String
    },
    guestIdentification: {
        type: String
    },
    guestMobile: {
        type: String
    },
    guestEmail: {
        type: String
    },
    vehiclePlate: {
        type: String
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Code', codeSchema);