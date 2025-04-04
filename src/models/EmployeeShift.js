import { Schema, model } from 'mongoose';
import Employee from './Employee';
import Shift from './Shift';

const employeeShiftSchema = new Schema({
    employeeId: [{
        ref: Employee,
        type: Schema.Types.ObjectId,
        required: true
    }],
    shiftId: [{
        ref: Shift,
        type: Schema.Types.ObjectId
    }],
    startDate: Date,
    endDate: Date,
},{
        timestamps: true,
        versionKey: false
});

export default model('EmployeeShift', employeeShiftSchema);