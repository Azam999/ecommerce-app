import express, { Request, Response, Application } from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const router = express.Router();

// Initial setup
dotenv.config();
const app: Application = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Connect to MongoDB via Mongoose
mongoose.connect(process.env.MONGO_URI as string)


// Routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import itemsRouter from './routes/items';
import ordersRouter from './routes/orders';

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/items', itemsRouter);
router.use('/orders', ordersRouter)

app.use('/api', router)
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: "404 Not Found",
    code: res.statusCode
  })
})

module.exports = app;
