import express from 'express';
const router = express.Router();
import * as AuthController from '../controllers/AuthController';

router.post('/register', AuthController.REGISTER);

router.post('/login', AuthController.LOGIN);

router.post('/generateToken', AuthController.GENERATE_TOKEN)

export default router;
