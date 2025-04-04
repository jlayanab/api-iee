// services/notificationService.js - Servicio de notificaciones
const Notification = require('../models/notification');
const EmployeeShift = require('../models/EmployeShift');
const Shift = require('../models/shift');
const Employee = require('../models/Employee');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Enviar recordatorio de turno
exports.sendShiftReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayOfWeek = tomorrow.getDay();
    
    // Encontrar todos los turnos para mañana
    const shifts = await Shift.find({ daysOfWeek: dayOfWeek });
    
    for (const shift of shifts) {
      // Encontrar empleados asignados a este turno
      const employeeShifts = await EmployeeShift.find({
        shiftId: shift._id,
        startDate: { $lte: tomorrow },
        $or: [
          { endDate: { $gte: tomorrow } },
          { endDate: null }
        ]
      });
      
      for (const empShift of employeeShifts) {
        const employee = await Employee.findById(empShift.employeeId);
        
        if (employee && employee.isActive) {
          // Crear notificación
          const notification = new Notification({
            employeeId: employee._id,
            title: 'Recordatorio de Turno',
            message: `Tu turno de mañana comienza a las ${shift.startTime} y termina a las ${shift.endTime}`,
            type: 'shift-reminder',
            isRead: false
          });
          
          await notification.save();
          
          // Enviar email si hay correo configurado
          if (employee.email && process.env.EMAIL_USER) {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: employee.email,
              subject: 'Recordatorio de Turno - Sistema de Asistencia',
              text: `Hola ${employee.firstName},\n\nEste es un recordatorio de que tu turno de mañana comienza a las ${shift.startTime} y termina a las ${shift.endTime}.\n\nSaludos,\nSistema de Asistencia`
            };
            
            transporter.sendMail(mailOptions);
          }
        }
      }
    }
    
    console.log('Recordatorios de turno enviados correctamente');
  } catch (error) {
    console.error('Error al enviar recordatorios de turno:', error);
  }
};