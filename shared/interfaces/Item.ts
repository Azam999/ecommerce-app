import { IUser } from './User';

interface IReview {
  // user: IUser,
  _id?: string,
  stars: number,
  title: string,
  body: string
  votes?: number
}

export interface IItem {
  _id?: string,
  name: string,
  price: number,
  description: string,
  image: string,
  quantity: number,
  seller: string,
  category: string,
  reviews?: IReview[]
}