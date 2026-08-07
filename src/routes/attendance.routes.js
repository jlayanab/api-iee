// routes/attendance.js - Rutas de asistencia
import { Router } from 'express'
const router = Router();

import * as attendanceCtrl from '../controllers/attendance.controller';
const auth = require('../middlewares/authJwt');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management
 */

/**
 * @swagger
 * /api/attendance/checkin:
 *   post:
 *     summary: Check in an employee
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The employee has been successfully checked in
 *       400:
 *         description: Bad request
 */
// POST /api/attendance/checkin
router.post('/checkin', [auth.verifyToken], attendanceCtrl.checkIn);

/**
 * @swagger
 * /api/attendance/checkout:
 *   put:
 *     summary: Check out an employee
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: The employee has been successfully checked out
 *       400:
 *         description: Bad request
 */
// PUT /api/attendance/checkout
router.put('/checkout', attendanceCtrl.checkOut);

/**
 * @swagger
 * /api/attendance/me:
 *   get:
 *     summary: Get my attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of my attendance records
 *       403:
 *         description: Forbidden
 */
// GET /api/attendance/me
router.get('/me', attendanceCtrl.getMyAttendance);

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all attendance records
 *       403:
 *         description: Forbidden
 */
// Solo administradores pueden ver toda la asistencia
router.get('/', (req, res, next) => {
  if (req.employee.role !== 'admin' && req.employee.role !== 'supervisor') {
    return res.status(403).json({ msg: 'Acceso denegado' });
  }
  next();
}, attendanceCtrl.getMyAttendance);

export default router;