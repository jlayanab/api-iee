// routes/attendance.js - Rutas de asistencia
import { Router } from 'express'
const router = Router();

import * as attendanceCtrl from '../controllers/attendance.controller';
const auth = require('../middlewares/authJwt');

// POST /api/attendance/checkin
router.post('/checkin', [auth.verifyToken], attendanceCtrl.checkIn);

// PUT /api/attendance/checkout
router.put('/checkout', attendanceCtrl.checkOut);

// GET /api/attendance/me
router.get('/me', attendanceCtrl.getMyAttendance);

// Solo administradores pueden ver toda la asistencia
router.get('/', (req, res, next) => {
  if (req.employee.role !== 'admin' && req.employee.role !== 'supervisor') {
    return res.status(403).json({ msg: 'Acceso denegado' });
  }
  next();
}, attendanceCtrl.getMyAttendance);

export default router;