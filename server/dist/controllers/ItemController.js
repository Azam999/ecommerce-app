"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_ITEM_REVIEW = exports.GET_REVIEWS_OR_REVIEW = exports.CREATE_REVIEW_FOR_ITEM = exports.EDIT_ITEM = exports.DELETE_ITEM = exports.SORT_ITEMS = exports.CREATE_ITEM = exports.GET_ITEMS = void 0;
const Item_model_1 = require("../shared/models/Item.model");
const GET_ITEMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        try {
            const items = yield Item_model_1.Item.find().populate('reviews');
            res.status(200).send(items);
        }
        catch (error) {
            res.status(500).json({
                error,
                code: res.statusCode,
            });
        }
    }
    else {
        try {
            const item = yield Item_model_1.Item.findById(id);
            res.status(200).send(item);
        }
        catch (error) {
            res.status(500).json({
                error,
                code: res.statusCode,
            });
        }
    }
});
exports.GET_ITEMS = GET_ITEMS;
const CREATE_ITEM = (req, res) => {
    const item = new Item_model_1.Item(req.body);
    item
        .save()
        .then((item) => {
        res.status(200).json({
            item,
            message: 'Item created',
        });
    })
        .catch((err) => res.status(400).send(err));
};
exports.CREATE_ITEM = CREATE_ITEM;
const SORT_ITEMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, filter } = req.query;
    // Available categories
    const categories = [
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
    ];
    // Available filter types
    const filterTypes = [
        'priceLowToHigh',
        'priceHighToLow',
        'newest',
        'alphabetical',
    ];
    if (filter || name || category || price) {
        let searchQuery = {};
        if (name) {
            searchQuery.name = name;
        }
        if (category) {
            if (categories.includes(category)) {
                searchQuery.category = category;
            }
            else {
                return res.status(400).json({
                    message: "Category doesn't exist"
                });
            }
        }
        if (price) {
            searchQuery.price = +price;
        }
        if (filterTypes.includes(filter)) {
            switch (filter) {
                case 'priceLowToHigh':
                    Item_model_1.Item.find(searchQuery)
                        .sort({ price: 1 })
                        .exec((err, items) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).send(items);
                    });
                    break;
                case 'priceHighToLow':
                    Item_model_1.Item.find(searchQuery)
                        .sort({ price: -1 })
                        .exec((err, items) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).send(items);
                    });
                    break;
                case 'newest':
                    Item_model_1.Item.find(searchQuery)
                        .sort({ createdAt: -1 })
                        .exec((err, items) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).send(items);
                    });
                    break;
                case 'alphabetical':
                    Item_model_1.Item.find(searchQuery)
                        .collation({ locale: 'en' })
                        .sort({ name: 1 })
                        .exec((err, items) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.status(200).send(items);
                    });
                    break;
                default:
                    return res.status(400).json({
                        error: "Filter doesn't exist",
                        code: res.statusCode,
                    });
            }
        }
        else {
            return res.status(400).json({
                message: "Filter doesn't exist",
                code: res.statusCode,
            });
        }
    }
});
exports.SORT_ITEMS = SORT_ITEMS;
const DELETE_ITEM = (req, res) => {
    const { id } = req.params;
    Item_model_1.Item.findByIdAndDelete(id)
        .then((item) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedReviews = yield Item_model_1.Review.deleteMany({
            _id: { $in: item.reviews },
        });
        res.status(200).json({
            item: {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                seller: item.seller,
                category: item.category,
            },
            message: 'Item deleted successfully',
            deletedReviews,
        });
    }))
        .catch((err) => {
        res.status(400).json({
            message: 'An item with that id does not exist',
            code: res.statusCode,
        });
    });
};
exports.DELETE_ITEM = DELETE_ITEM;
const EDIT_ITEM = (req, res) => {
    const { id } = req.params;
    Item_model_1.Item.findOneAndUpdate({ _id: id }, req.body)
        .then((item) => {
        res.status(200).json({
            item,
            values: req.body,
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: err,
        });
    });
};
exports.EDIT_ITEM = EDIT_ITEM;
const CREATE_REVIEW_FOR_ITEM = (req, res) => {
    const review = new Item_model_1.Review(req.body);
    review.save();
    const { itemId } = req.params;
    Item_model_1.Item.findOneAndUpdate({ _id: itemId }, { $push: { reviews: review } })
        .then((item) => {
        res.status(200).json({
            item,
            reviewAdded: review,
        });
    })
        .catch((err) => {
        res.status(400).json({
            error: err,
        });
    });
};
exports.CREATE_REVIEW_FOR_ITEM = CREATE_REVIEW_FOR_ITEM;
const GET_REVIEWS_OR_REVIEW = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.query;
    const { itemId } = req.params;
    if (reviewId) {
        try {
            const review = yield Item_model_1.Item.findById(itemId)
                .populate('reviews')
                .select({
                reviews: { $elemMatch: { _id: reviewId } },
            });
            res.status(200).send(review);
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
    else {
        try {
            const allReviews = yield Item_model_1.Item.findById(itemId)
                .populate('reviews')
                .select('reviews');
            if (!allReviews) {
                throw {
                    error: 'An item with that id does not exist',
                    code: 404,
                };
            }
            res.status(200).send(allReviews);
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
});
exports.GET_REVIEWS_OR_REVIEW = GET_REVIEWS_OR_REVIEW;
const DELETE_ITEM_REVIEW = (req, res) => {
    const { itemId, reviewId } = req.params;
    Item_model_1.Item.findOneAndUpdate({ _id: itemId }, { $pull: { reviews: { _id: reviewId } } })
        .then((item) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedReview = yield Item_model_1.Review.deleteOne({ _id: reviewId });
        res.status(200).json({
            item,
            reviewIdDeleted: reviewId,
            deletedReview,
        });
    }))
        .catch((err) => {
        res.status(400).json({
            error: err,
        });
    });
};
exports.DELETE_ITEM_REVIEW = DELETE_ITEM_REVIEW;
