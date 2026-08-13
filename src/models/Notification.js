import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['code-received', 'access-verified', 'shift-reminder', 'attendance-update', 'general'],
        default: 'general'
    },
    data: {
        type: Schema.Types.Mixed
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Notification', notificationSchema);