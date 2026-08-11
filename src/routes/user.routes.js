import { Router } from 'express';

const router = Router();
import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySignup } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and administration
 */

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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (requires Admin role)
 *       500:
 *         description: Internal server error
 */
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user detail by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User detail
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', [authJwt.verifyToken], userCtrl.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               identification:
 *                 type: string
 *               mobile:
 *                 type: string
 *               active:
 *                 type: boolean
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["user", "moderator"]
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: Bad request (duplicate fields or missing data)
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userCtrl.createUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
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
 *               identification:
 *                 type: string
 *               mobile:
 *                 type: string
 *               active:
 *                 type: boolean
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.updateUserById);

/**
 * @swagger
 * /api/users/{userId}/status:
 *   patch:
 *     summary: Enable or disable a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - active
 *             properties:
 *               active:
 *                 type: boolean
 *                 description: Set true to enable, false to disable
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Missing active status
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:userId/status', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.toggleUserStatus);

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
 *         description: User ID
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
 *       500:
 *         description: Internal server error
 */
router.put('/:userId/password', [authJwt.verifyToken], userCtrl.updatePassword);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.deleteUserById);

export default router;