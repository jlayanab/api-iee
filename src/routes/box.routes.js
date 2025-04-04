import { Router } from "express";

const router = Router()

import * as boxesCtrl from '../controllers/box.controller'

router.get('/', boxesCtrl.getBoxes) // Obtener todas las facturas
router.post('/', boxesCtrl.createBox) // Crear factura sin productos
router.put("/:boxId/add-item", boxesCtrl.addItemToBox); // Agregar item a Registro existente
router.put("/:boxId/edit-item/:itemId", boxesCtrl.editItemInBox); // Editar producto
router.delete("/:boxId/rem-item/:itemId", boxesCtrl.removeItemFromBox); // Eliminar item
router.get('/:boxId',boxesCtrl.getBoxById) // Obtener todas las registros
router.delete('/:boxId', boxesCtrl.deleteBoxById) // Eliminar factura
router.get("/:boxId/pdf", boxesCtrl.generateBoxPDF); // Generar PDF de factura

export default router;