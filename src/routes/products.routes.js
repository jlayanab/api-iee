import { Router } from "express";

const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import { authJwt } from '../middlewares';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               imgURL:
 *                 type: string
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       403:
 *         description: Forbidden
 */
router.post('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/',productsCtrl.getProducts)

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by id
 *       404:
 *         description: The product was not found
 */
router.get('/:productId',productsCtrl.getProductById)

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               imgURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The product was not found
 */
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById)

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: The product was successfully deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The product was not found
 */
router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)

export default router;