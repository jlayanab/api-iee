import {Router} from 'express';

const router = Router()
import * as userCtrl from '../controllers/user.controller';
import {authJwt, verifySignup} from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       403:
 *         description: Forbidden
 */
router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userCtrl.createUser)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Forbidden
 */
router.get('/',[authJwt.verifyToken],userCtrl.getUsers)

/**
 * @swagger
 * /api/users/{userId}/password:
 *   put:
 *     summary: Modify user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Password is required
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:userId/password', [authJwt.verifyToken], userCtrl.updatePassword)

export default router;