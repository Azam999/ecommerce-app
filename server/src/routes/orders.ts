import express, { Request, Response } from 'express';
const router = express.Router();
import Order from '../shared/models/Order.model';

router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
  res.status(200).send(orders)
  } catch (error) {
    res.status(500).send(error);
  }
})

export default router;