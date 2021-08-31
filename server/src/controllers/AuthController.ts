import { Request, Response } from 'express';
import { User } from '../shared/models/User.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const REGISTER = async (req: Request, res: Response) => {
  // const user = new User(req.body);
  const { name, email, password } = req.body;
  
  const user = await User.findOne({ email })

  if (user) {
    return res.status(409).json({
      message: "An account with that email already exists"
    })
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hash
  });

  newUser
    .save()
    .then((userInfo) => {
      jwt.sign({
        _id: userInfo._id
      }, process.env.JWT_KEY as string, {
        expiresIn: "15m"
      }, (err, token) => {
        if (err) throw err;
        res.status(201).send({
          user: {
            _id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
          },
          token,
          message: "User Created",
          auth: true,
        })
      });
    })
}

export const LOGIN = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "An account with that email does not exist",
      code: res.statusCode
    })
  }

  const passwordVerified = await bcrypt.compare(password, user.password);

  const jwtPayload = {
    _id: user._id
  }

  if (passwordVerified) {
    jwt.sign(jwtPayload, process.env.JWT_KEY as string, {
      expiresIn: "15m"
    }, (err, token) => {
      if (err) throw err;
      res.status(201).send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        token,
        message: "Authenticated",
        auth: true
      })
    });
  } else {
    res.status(401).json({
      message: "Not Authenticated",
      auth: false,
    })
  }
}