import { Request, Response } from 'express';
import Order from '../models/Order.model';

export const GET_ORDERS = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    try {
      const orders = await Order.find();
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const order = await Order.findById(id);
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export const CREATE_ORDER = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    order
      .save()
      .then((order: any) => {
        res.status(200).send(order);
      })
      .catch((err: any) => {
        res.status(200).send(err);
      });
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const CHANGE_ORDER_STATUS = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.query;

  Order.findByIdAndUpdate(id, { status })
    .then(order => {
      res.status(200).json({
        order,
        status
      })
    })
    .catch(err => {
      res.status(400).send(err);
    })
}

export const DELETE_ORDER = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (status == 'ordered') {
    const order = Order.findByIdAndDelete(id);
    res.status(200).send(order);
  } else {
    res.status(400).json({
      message: "Can not cancel an order that has already been shipped or has arrived"
    })
  }
}