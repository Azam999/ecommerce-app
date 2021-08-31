import express from 'express';
const router = express.Router();
import * as IndexController from '../controllers/IndexController';

/* GET home page. */
router.get('/', IndexController.CONNECT);

export default router;
