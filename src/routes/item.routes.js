import { Router } from "express";

const router = Router()

import * as itemsCtrl from '../controllers/item.controller'
/*import { authJwt } from '../middlewares';

router.post('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)*/

router.post('/', itemsCtrl.createItem)

router.get('/',itemsCtrl.getItems)

router.get('/:itemId',itemsCtrl.getItemById)

router.put('/:itemId', itemsCtrl.updateItemById)

router.delete('/:itemId', itemsCtrl.deleteItemById)

/*router.put('/:itemId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById)

router.delete('/:itemId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)*/

export default router;