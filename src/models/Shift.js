import { Schema, model } from "mongoose";

const shiftSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        daysOfWeek: {
            type: [Number],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Shift', shiftSchema);