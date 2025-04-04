// models/attendance.js - Modelo de Asistencia
import { Schema, model } from 'mongoose';
import Employee from './Employee';

const attendanceSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: Employee,
    required: true
  },
  checkInTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  totalHours: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['on-time', 'late', 'absent'],
    default: 'on-time'
  },
  note: String
}, {
  timestamps: true
});

export default model('Attendance', attendanceSchema);