import mongoose, { Schema } from 'mongoose';
import { UserSchema, IUser } from './User.model';
import { ReviewSchema } from './Review.model';

// interface IReview {
//   _id?: mongoose.Types.ObjectId,
//   user: IUser,
//   stars: number,
//   title: string,
//   body: string
//   votes?: number
// }

// interface IReviews extends Array<IReview> { }

// interface IItem {
//   _id?: mongoose.Types.ObjectId,
//   name: string,
//   price: number,
//   quantity: number,
//   seller: string,
//   category: string,
//   reviews?: IReviews
// }

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, 'Minimum price is 0.01'],
      max: [99999, 'Maximum price is 99999'],
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} must be an integer',
      },
    },
    seller: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    category: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
      enum: [
        'appliances',
        'sports',
        'clothes',
        'games',
        'homeAndKitchen',
        'electronics',
        'food',
        'computers',
        'art',
        'office',
        'exercise',
      ],
    },
    reviews: {
      type: [ReviewSchema],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Item', ItemSchema);