import express from 'express';
const router = express.Router();
import * as AuthController from '../controllers/AuthController';

router.post('/register', AuthController.REGISTER);

router.post('/login', AuthController.LOGIN);

export default router;