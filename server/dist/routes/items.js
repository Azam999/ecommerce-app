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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ItemController = __importStar(require("../controllers/ItemController"));
// Create new item
router.post('/', ItemController.CREATE_ITEM);
// Sort items
router.get('/sort', ItemController.SORT_ITEMS);
// Get all items
router.get('/:id?', ItemController.GET_ITEMS);
// Delete item with specific id
router.delete('/:id', ItemController.DELETE_ITEM);
// Edit item
router.patch('/:id', ItemController.EDIT_ITEM);
// Reviews
// Create new review
router.patch('/:itemId/reviews', ItemController.CREATE_REVIEW_FOR_ITEM);
// if query provided, then get one review, otherwise get all reviews
router.get('/:itemId/reviews', ItemController.GET_REVIEWS_OR_REVIEW);
// Delete review
router.delete('/:itemId/reviews', ItemController.DELETE_REVIEW);
exports.default = router;
