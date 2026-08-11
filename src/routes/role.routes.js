import { Router } from "express";
const router = Router();

import * as roleCtrl from '../controllers/role.controller';
import { authJwt } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles management
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all system roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of system roles
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', [authJwt.verifyToken], roleCtrl.getRoles);

/**
 * @swagger
 * /api/roles/{roleId}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role detail
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/:roleId', [authJwt.verifyToken], roleCtrl.getRoleById);

export default router;
