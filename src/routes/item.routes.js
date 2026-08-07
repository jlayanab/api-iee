import { Router } from "express";

const router = Router()

import * as itemsCtrl from '../controllers/item.controller'
/*import { authJwt } from '../middlewares';

router.post('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)*/

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Items management
 */

/**
 * @swagger
 * /api/item:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: The item was successfully created
 */
router.post('/', itemsCtrl.createItem)

/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items
 */
router.get('/',itemsCtrl.getItems)

/**
 * @swagger
 * /api/item/{itemId}:
 *   get:
 *     summary: Get a item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item description by id
 *       404:
 *         description: The item was not found
 */
router.get('/:itemId',itemsCtrl.getItemById)

/**
 * @swagger
 * /api/item/{itemId}:
 *   put:
 *     summary: Update a item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: The item was successfully updated
 *       404:
 *         description: The item was not found
 */
router.put('/:itemId', itemsCtrl.updateItemById)

/**
 * @swagger
 * /api/item/{itemId}:
 *   delete:
 *     summary: Delete a item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       204:
 *         description: The item was successfully deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/:itemId', itemsCtrl.deleteItemById)

/*router.put('/:itemId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById)

router.delete('/:itemId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)*/

export default router;