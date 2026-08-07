import { Router } from "express";

const router = Router()

import * as boxesCtrl from '../controllers/box.controller'

/**
 * @swagger
 * tags:
 *   name: Boxes
 *   description: Boxes management
 */

/**
 * @swagger
 * /api/box:
 *   get:
 *     summary: Get all boxes
 *     tags: [Boxes]
 *     responses:
 *       200:
 *         description: A list of boxes
 */
router.get('/', boxesCtrl.getBoxes) // Obtener todas las facturas

/**
 * @swagger
 * /api/box:
 *   post:
 *     summary: Create a new box
 *     tags: [Boxes]
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
 *     responses:
 *       201:
 *         description: The box was successfully created
 */
router.post('/', boxesCtrl.createBox) // Crear factura sin productos

/**
 * @swagger
 * /api/box/{boxId}/add-item:
 *   put:
 *     summary: Add an item to a box
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The item was successfully added to the box
 *       404:
 *         description: The box was not found
 */
router.put("/:boxId/add-item", boxesCtrl.addItemToBox); // Agregar item a Registro existente

/**
 * @swagger
 * /api/box/{boxId}/edit-item/{itemId}:
 *   put:
 *     summary: Edit an item in a box
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
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
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The item was successfully updated in the box
 *       404:
 *         description: The box or item was not found
 */
router.put("/:boxId/edit-item/:itemId", boxesCtrl.editItemInBox); // Editar producto

/**
 * @swagger
 * /api/box/{boxId}/rem-item/{itemId}:
 *   delete:
 *     summary: Remove an item from a box
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       204:
 *         description: The item was successfully removed from the box
 *       404:
 *         description: The box or item was not found
 */
router.delete("/:boxId/rem-item/:itemId", boxesCtrl.removeItemFromBox); // Eliminar item

/**
 * @swagger
 * /api/box/{boxId}:
 *   get:
 *     summary: Get a box by ID
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
 *     responses:
 *       200:
 *         description: The box description by id
 *       404:
 *         description: The box was not found
 */
router.get('/:boxId',boxesCtrl.getBoxById) // Obtener todas las registros

/**
 * @swagger
 * /api/box/{boxId}:
 *   delete:
 *     summary: Delete a box by ID
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
 *     responses:
 *       204:
 *         description: The box was successfully deleted
 *       404:
 *         description: The box was not found
 */
router.delete('/:boxId', boxesCtrl.deleteBoxById) // Eliminar factura

/**
 * @swagger
 * /api/box/{boxId}/pdf:
 *   get:
 *     summary: Generate a PDF for a box
 *     tags: [Boxes]
 *     parameters:
 *       - in: path
 *         name: boxId
 *         schema:
 *           type: string
 *         required: true
 *         description: The box ID
 *     responses:
 *       200:
 *         description: The PDF was successfully generated
 *       404:
 *         description: The box was not found
 */
router.get("/:boxId/pdf", boxesCtrl.generateBoxPDF); // Generar PDF de factura

export default router;