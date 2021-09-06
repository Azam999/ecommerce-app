import { Request, Response } from 'express';
import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';

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
          email: user!.email,
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

export const EDIT_USER = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, name } = req.body;
  const { change } = req.query;

  switch (change) {
    case 'password':
      try {
        let hash = await bcrypt.hash(password, 10);

        if (password.length < 8)
          throw {
            error: 'Password must be at least 8 characters long',
          };

        User.findOneAndUpdate({ _id: id }, { ...req.body, password: hash })
          .then((user) => {
            res.status(200).json({
              user,
              values: {
                ...req.body,
                password: hash,
              },
            });
          })
          .catch((err) => {
            res.status(400).json({
              error: err,
            });
          });
      } catch (error) {
        res.send(error);
      }
      break;
    case 'name':
      User.findOneAndUpdate({ _id: id }, { ...req.body, name })
        .then((user) => {
          res.status(200).json({
            user,
            values: { ...req.body, name },
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: err,
          });
        });
      break;
    default:
      res.status(400).json({
        message: 'You can only change the name or password',
      });
  }
};
