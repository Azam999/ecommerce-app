import express, { Request, Response } from 'express';
const router = express.Router();
import * as ItemController from '../controllers/ItemController';

// Create new item
router.post('/', ItemController.CREATE_ITEM);

// Sort items
router.get('/sort', ItemController.SORT_ITEMS);

// Search items
router.get('/search', ItemController.SEARCH_ITEMS);

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
router.delete('/:itemId/reviews/:reviewId', ItemController.DELETE_ITEM_REVIEW);

// Upload
router.post('/image', ItemController.UPLOAD_ITEM_IMAGE)

export default router;
