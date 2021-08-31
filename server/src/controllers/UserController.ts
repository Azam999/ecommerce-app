import { Request, Response } from 'express';
import { User } from '../shared/models/User.model';

export const GET_ALL_USERS = (req: Request, res: Response) => {
  User.find().exec((err, users) => {
    if (!err) {
      res.status(200).send(users);
    } else {
      res.status(500).json({
        error: err,
        code: res.statusCode,
      });
    }
  });
};

export const GET_ONE_USER = (req: Request, res: Response) => {
  const { id } = req.body;
  User.findById(id).exec((err, user) => {
    if (!err) {
      res.status(200).send(user);
    } else {
      res.status(500).json({
        error: err,
        code: res.statusCode,
      });
    }
  });
};

export const DELETE_USER = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json({
        user: {
          _id: user!._id,
          name: user!.name,
          email: user!.email
        },
        message: 'User deleted successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'A user with that id does not exist',
        code: res.statusCode,
      });
    });
};

export const EDIT_USER = (req: Request, res: Response) => {
  res.status(200).send("Edit")
}