// controllers/attendanceController.js - Controlador de asistencia
const Attendance = require('../models/Attendance'); // Modelo de Asistencia
const Employee = require('../models/Employee');
const EmployeeShift = require('../models/EmployeeShift');
const Shift = require('../models/Shift');

// Registrar entrada
exports.checkIn = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    
    // Verificar si ya hay un registro de entrada sin salida
    const existingAttendance = await Attendance.findOne({
      employeeId,
      checkOutTime: null
    });
    
    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        msg: 'Ya tienes un registro de entrada sin registrar salida'
      });
    }
    
    // Determinar si es tarde basado en el turno asignado
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    const dayOfWeek = now.getDay();
    
    // Buscar turno asignado para hoy
    const employeeShift = await EmployeeShift.findOne({
      employeeId,
      startDate: { $lte: now },
      $or: [
        { endDate: { $gte: now } },
        { endDate: null }
      ]
    });
    
    let status = 'on-time';
    
    if (employeeShift) {
      const shift = await Shift.findById(employeeShift.shiftId);
      
      if (shift && shift.daysOfWeek.includes(dayOfWeek)) {
        // Convertir a minutos para comparar
        const [shiftHours, shiftMinutes] = shift.startTime.split(':').map(Number);
        const shiftStartMinutes = shiftHours * 60 + shiftMinutes;
        
        const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
        const currentTotalMinutes = currentHours * 60 + currentMinutes;
        
        // Si llegó más de 10 minutos tarde
        if (currentTotalMinutes > shiftStartMinutes + 10) {
          status = 'late';
        }
      }
    }
    
    // Crear nuevo registro de asistencia
    const attendance = new Attendance({
      employeeId,
      checkInTime: now,
      status
    });
    
    await attendance.save();
    
    res.status(201).json({
      success: true,
      data: attendance
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Error en el servidor'
    });
  }
};

// Registrar salida
exports.checkOut = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    
    // Buscar registro de entrada sin salida
    const attendance = await Attendance.findOne({
      employeeId,
      checkOutTime: null
    });
    
    if (!attendance) {
      return res.status(400).json({
        success: false,
        msg: 'No tienes un registro de entrada para registrar salida'
      });
    }
    
    // Registrar hora de salida
    const now = new Date();
    attendance.checkOutTime = now;
    
    // Calcular horas trabajadas
    const checkInTime = new Date(attendance.checkInTime);
    const diffMs = now - checkInTime;
    const diffHrs = diffMs / (1000 * 60 * 60);
    attendance.totalHours = parseFloat(diffHrs.toFixed(2));
    
    await attendance.save();
    
    res.status(200).json({
      success: true,
      data: attendance
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Error en el servidor'
    });
  }
};

// Obtener registros de asistencia del empleado actual
exports.getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    
    // Parámetros de consulta para filtrar
    const { startDate, endDate } = req.query;
    
    let query = { employeeId };
    
    if (startDate && endDate) {
      query.checkInTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const attendance = await Attendance.find(query).sort({ checkInTime: -1 });
    
    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Error en el servidor'
    });
  }
};