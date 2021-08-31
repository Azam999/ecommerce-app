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
exports.ReviewSchema = exports.Review = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ReviewSchema = new mongoose_1.Schema({
    userId: mongoose_1.default.Types.ObjectId,
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
        trim: true
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
exports.ReviewSchema = ReviewSchema;
const Review = mongoose_1.default.model('Review', ReviewSchema);
exports.Review = Review;
