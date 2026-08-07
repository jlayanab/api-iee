// models/Invitation.js - Modelo para Invitaciones QR
import { Schema, model } from 'mongoose';

const invitationSchema = new Schema({
  host: { // Anfitrión que envía la invitación
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guestEmail: { // Email del invitado
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  status: { // Estado de la invitación: 'pending', 'accepted', 'used', 'expired'
    type: String,
    default: 'pending'
  }
}, {
  timestamps: true
});

export default model('Invitation', invitationSchema);