import {Router} from 'express';

const router = Router()
import * as userCtrl from '../controllers/user.controller';
import {authJwt} from '../middleware';

router.post('/',[
    authJwt.verifyToken,
    authJwt.isAdmin
], userCtrl.createUser)

export default router;