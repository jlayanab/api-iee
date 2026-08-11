import { Router } from "express";

const router = Router()

import * as authCtrl from '../controllers/auth.controller';
import {verifySignup} from '../middlewares';


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user has been successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 token:
 *                   type: string
 *                 identification:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       400:
 *         description: Invalid credentials
 */
router.post('/signin', authCtrl.signIn)

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
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
 *       200:
 *         description: The user has been successfully signed up
 *       400:
 *         description: Bad request
 */
router.post('/signup', [
    verifySignup.checkDuplicateUsernameOrEmail,
    verifySignup.checkRolesExisted],
    authCtrl.signUp
);

export default router;