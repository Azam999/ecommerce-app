import { IUser } from '../models/User.model';
import mongoose from 'mongoose';

interface IReview {
  user: IUser,
  stars: number,
  title: string,
  body: string
  votes?: number
}

interface IReviews extends Array<IReview> { }

export interface IItem {
  _id?: mongoose.Types.ObjectId,
  name: string,
  price: number,
  quantity: number,
  seller: string,
  category: string,
  reviews?: IReviews
}

export interface IItems extends Array<IItem> {}