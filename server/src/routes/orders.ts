import express from 'express';
const router = express.Router();
import * as OrderController from '../controllers/OrderController';


// Get specific order for user by using verifyToken middleware and then getting that data by using req.userData
router.get('/:id?', OrderController.GET_ORDERS);

router.post('/', OrderController.CREATE_ORDER);

router.patch('/:id', OrderController.CHANGE_ORDER_STATUS);

router.delete('/:id', OrderController.DELETE_ORDER)

export default router;
