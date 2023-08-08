import { Router } from "express";

const router = Router()

import * as codesCtrl from '../controllers/code.controller'
import { authJwt } from '../middleware';

router.post('/',[authJwt.verifyToken, authJwt.isModerator], codesCtrl.createCode)
//router.post('/', codesCtrl.createCode)

router.get('/',codesCtrl.getCodes)

router.get('/:codeId',codesCtrl.getCodeById)

router.put('/:codeId', [authJwt.verifyToken, authJwt.isAdmin], codesCtrl.updateCodeById)

router.delete('/:codeId',[authJwt.verifyToken, authJwt.isAdmin], codesCtrl.deleteCodeById)

export default router;