import mongoose, { Schema } from 'mongoose';

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
      lowercase: true,
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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ReviewSchema = new Schema(
  {
    // Add user ref
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      minLength: [1, 'Title is required'],
      maxLength: [150, 'Title can only be 150 characters'],
      trim: true,
    },
    body: {
      type: String,
      required: true,
      minLength: [10, 'Body must be at least 10 character'],
      maxLength: [5000, '5000 characters is the limit'],
    },
    votes: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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

const Review = mongoose.model('Review', ReviewSchema, 'reviews');
const Item = mongoose.model('Item', ItemSchema, 'items');

ItemSchema.pre('remove', function (next) {

})

export { Item, Review };
