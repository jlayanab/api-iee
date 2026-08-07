import { Router } from "express";

const router = Router()

import * as codesCtrl from '../controllers/code.controller'
import { authJwt } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Codes
 *   description: Codes management
 */

/**
 * @swagger
 * /api/codes:
 *   post:
 *     summary: Create a new code
 *     tags: [Codes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               imgURL:
 *                 type: string
 *     responses:
 *       201:
 *         description: The code was successfully created
 *       403:
 *         description: Forbidden
 */
router.post('/',[authJwt.verifyToken, authJwt.isModerator], codesCtrl.createCode)
//router.post('/', codesCtrl.createCode)

/**
 * @swagger
 * /api/codes:
 *   get:
 *     summary: Get all codes
 *     tags: [Codes]
 *     responses:
 *       200:
 *         description: A list of codes
 */
router.get('/',codesCtrl.getCodes)

/**
 * @swagger
 * /api/codes/{userId}:
 *   get:
 *     summary: Get a code by user ID
 *     tags: [Codes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The code description by user id
 *       404:
 *         description: The code was not found
 */
router.get('/:userId',codesCtrl.getCodeById)

/**
 * @swagger
 * /api/codes/{codeId}:
 *   put:
 *     summary: Update a code by ID
 *     tags: [Codes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The code ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               imgURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: The code was successfully updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The code was not found
 */
router.put('/:codeId', [authJwt.verifyToken, authJwt.isAdmin], codesCtrl.updateCodeById)

/**
 * @swagger
 * /api/codes/{codeId}:
 *   delete:
 *     summary: Delete a code by ID
 *     tags: [Codes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The code ID
 *     responses:
 *       204:
 *         description: The code was successfully deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The code was not found
 */
router.delete('/:codeId',[authJwt.verifyToken, authJwt.isAdmin], codesCtrl.deleteCodeById)

export default router;