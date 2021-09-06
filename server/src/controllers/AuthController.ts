import { Request, Response } from 'express';
import { User } from '../models/User.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

function createTokens(jwtPayload: object, both: boolean) {
  const accessToken = jwt.sign(jwtPayload, process.env.JWT_KEY as string, {
    expiresIn: '15m',
  });

  if (both) {  
    const refreshToken = jwt.sign(
      jwtPayload,
      process.env.JWT_REFRESH_KEY as string,
      {
        expiresIn: '30d',
      }
    );
  
    return { accessToken, refreshToken };
  } else {
    return accessToken as any;
  }
}

export const REGISTER = async (req: Request, res: Response) => {
  // const user = new User(req.body);
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      message: 'An account with that email already exists',
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hash,
  });

  newUser.save().then((userInfo) => {
    const jwtPayload = {
      _id: userInfo._id,
    };

    const { accessToken, refreshToken } = createTokens(jwtPayload, true);

    res.status(201).send({
      user: {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
      },
      accessToken,
      refreshToken,
      message: 'User Created',
      auth: true,
    });
  });
};

export const LOGIN = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    if (!email) {
      return res.status(401).json({
        message: 'Please enter an email',
        code: res.statusCode,
      });
    } else if (!password) {
      return res.status(401).json({
        message: 'Please enter a password',
        code: res.statusCode,
      });
    } else {
      return res.status(401).json({
        message: 'Please enter both the email and password',
        code: res.statusCode,
      });
    }
  }

  if (password.length < 8) {
    return res.status(401).json({
      message: 'Password must be at least 8 characters long',
      code: res.statusCode,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'An account with that email does not exist',
      code: res.statusCode,
    });
  }

  const passwordVerified = await bcrypt.compare(password, user.password);

  const jwtPayload = {
    _id: user._id,
  };

  if (passwordVerified) {
    const { accessToken, refreshToken } = createTokens(jwtPayload, true);
    console.log(accessToken);

    res.status(201).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
      message: 'Authenticated',
      auth: true,
    });
  } else {
    res.status(401).json({
      message: 'Not Authenticated',
      auth: false,
    });
  }
};

export const GENERATE_TOKEN = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).send({
      error: 'No token supplied',
      code: res.statusCode,
    });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string, (err: any, user: any) => {
    const accessToken = createTokens({ _id: user._id }, false);

    res.json({
      accessToken
    })
  });
};
