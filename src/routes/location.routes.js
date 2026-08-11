import { Router } from "express";
const router = Router();

import * as locationCtrl from '../controllers/location.controller';
import { authJwt } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Locations management
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations (requires authentication)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of locations
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no token provided)
 *       500:
 *         description: Internal server error
 */
router.get('/', [authJwt.verifyToken], locationCtrl.getLocations);

/**
 * @swagger
 * /api/locations/{locationId}:
 *   get:
 *     summary: Get a location by ID (requires authentication)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location detail
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.get('/:locationId', [authJwt.verifyToken], locationCtrl.getLocationById);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location (requires admin role)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Garita Principal"
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (requires admin role)
 *       500:
 *         description: Internal server error
 */
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], locationCtrl.createLocation);

/**
 * @swagger
 * /api/locations/{locationId}:
 *   put:
 *     summary: Update a location by ID (requires admin role)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Location updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.put('/:locationId', [authJwt.verifyToken, authJwt.isAdmin], locationCtrl.updateLocationById);

/**
 * @swagger
 * /api/locations/{locationId}:
 *   delete:
 *     summary: Delete a location by ID (requires admin role)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       204:
 *         description: Location deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:locationId', [authJwt.verifyToken, authJwt.isAdmin], locationCtrl.deleteLocationById);

export default router;
