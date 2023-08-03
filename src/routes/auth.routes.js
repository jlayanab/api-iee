import { Router } from "express";

const router = Router()

import * as authCtrl from '../controllers/Auth.controller';

router.post('/signin', authCtrl.signIn)
router.post('/signup', authCtrl.signUp)

export default router;