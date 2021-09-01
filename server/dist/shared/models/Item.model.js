"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Item = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ItemSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
            required: true
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
const ReviewSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
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
const Review = mongoose_1.default.model('Review', ReviewSchema, 'reviews');
exports.Review = Review;
const Item = mongoose_1.default.model('Item', ItemSchema, 'items');
exports.Item = Item;
ItemSchema.pre('remove', function (next) {
});
