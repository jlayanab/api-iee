// routes/invitation.routes.js
import { Router } from 'express';
const router = Router();

import * as invitationCtrl from '../controllers/invitation.controller';
import { authJwt } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Invitations management
 */

/**
 * @swagger
 * /api/invitations:
 *   post:
 *     summary: Create a new invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestEmail:
 *                 type: string
 *               eventDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: The invitation was successfully created
 *       400:
 *         description: Bad request
 */
// Crear una nueva invitación
// POST /api/invitations
router.post('/', [authJwt.verifyToken], invitationCtrl.createInvitation);

/**
 * @swagger
 * /api/invitations/sent:
 *   get:
 *     summary: Get sent invitations
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sent invitations
 *       403:
 *         description: Forbidden
 */
// Obtener invitaciones enviadas por mí
// GET /api/invitations/sent
router.get('/sent', [authJwt.verifyToken], invitationCtrl.getSentInvitations);

/**
 * @swagger
 * /api/invitations/received:
 *   get:
 *     summary: Get received invitations
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of received invitations
 *       403:
 *         description: Forbidden
 */
// Obtener invitaciones recibidas
// GET /api/invitations/received
router.get('/received', [authJwt.verifyToken], invitationCtrl.getReceivedInvitations);

/**
 * @swagger
 * /api/invitations/validate/{invitationId}:
 *   get:
 *     summary: Validate an invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invitationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The invitation ID
 *     responses:
 *       200:
 *         description: The invitation is valid
 *       400:
 *         description: The invitation is not valid
 *       403:
 *         description: Forbidden
 */
// Validar una invitación (simula el escaneo del QR)
// GET /api/invitations/validate/:invitationId
router.get('/validate/:invitationId', [authJwt.verifyToken], invitationCtrl.validateInvitation);

export default router;