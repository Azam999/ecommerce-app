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
const mongoose_1 = __importStar(require("mongoose"));
const Review_model_1 = require("./Review.model");
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
        type: [Review_model_1.ReviewSchema],
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model('Item', ItemSchema);
