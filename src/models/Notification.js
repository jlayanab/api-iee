import  {Schema, model} from 'mongoose';
import employee from './Employee';

const notificationSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: employee,
        required: true
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
        enum: ['shift-reminder', 'attendance-update', 'general'],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false
});

export default model('Notification', notificationSchema);