import { Request, Response } from 'express';
import Item from '../shared/models/Item.model';
import { Review } from '../shared/models/Review.model';
import { IItems, IItem } from '../shared/interfaces/Item';

export const GET_ITEMS = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    try {
      const items = await Item.find();
      res.status(200).send(items);
    } catch (error) {
      res.status(500).json({
        error,
        code: res.statusCode,
      });
    }
  } else {
    try {
      const item = await Item.findById(id);
      res.status(200).send(item);
    } catch (error) {
      res.status(500).json({
        error,
        code: res.statusCode,
      });
    }
  }
};

export const CREATE_ITEM = (req: Request, res: Response) => {
  const item = new Item(req.body);
  item.validate().catch((err: any) => {
    if (!err) {
      item.save();
      res.status(200).send('Item created');
    } else {
      res.status(400).send(err);
    }
  });
};

export const SORT_ITEMS = (req: Request, res: Response) => {
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

  // Get category if user wants to look at a specific category
  // filter includes filterTypes
  const { category, filter } = req.query;

  if (filter) {
    if (filterTypes.includes(filter as string)) {
      switch (filter) {
        case 'priceLowToHigh':
          Item.find()
            .sort({ price: 1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'priceHighToLow':
          Item.find()
            .sort({ price: -1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'newest':
          Item.find()
            .sort({ createdAt: -1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'alphabetical':
          Item.find()
            .collation({ locale: 'en' })
            .sort({ name: 1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        default:
          res.status(500).json({
            error: 'Error 500',
            code: res.statusCode,
          });
      }
    } else {
      res.status(400).json({
        message: "Filter doesn't exist",
        code: res.statusCode,
      });
    }
  }

  if (category) {
    const stringCategory = category as string;
    if (categories.includes(stringCategory)) {
      Item.find({ category }).exec((err, items) => {
        if (!err) {
          res.status(200).send(items);
        } else {
          res.status(500).json({
            error: 'Error 500',
            code: res.statusCode,
          });
        }
      });
    } else {
      res.status(400).json({
        message: "Category doesn't exist",
        code: res.statusCode,
      });
    }
  }
};

export const DELETE_ITEM = (req: Request, res: Response) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((item: any) => {
      res.status(200).json({
        item: {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          seller: item.seller,
          category: item.category,
        },
        message: 'Item deleted successfully',
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        message: 'An item with that id does not exist',
        code: res.statusCode,
      });
    });
};

export const EDIT_ITEM = (req: Request, res: Response) => {
  const { id } = req.params;
  Item.findOneAndUpdate({ _id: id }, req.body)
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

export const CREATE_REVIEW_FOR_ITEM = (req: Request, res: Response) => {
  const review = new Review(req.body);
  const { itemId } = req.params;
  Item.findOneAndUpdate({ _id: itemId }, { $push: { reviews: review } })
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

export const GET_REVIEWS_OR_REVIEW = async (req: Request, res: Response) => {
  const { reviewId } = req.query;
  const { itemId } = req.params;
  if (reviewId) {
    try {
      const review = await Item.findById(itemId).select({ reviews: { $elemMatch: { _id: reviewId } } })
      res.status(200).send(review);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const allReviews = await Item.findById(itemId).select('reviews');
      if (!allReviews) {
        throw {
          error: 'An item with that id does not exist',
          code: 404
        }
      }
      res.status(200).send(allReviews);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export const DELETE_REVIEW = (req: Request, res: Response) => {
  const { reviewId } = req.query;
  const { itemId } = req.params;
  Item.findOneAndUpdate(
    { _id: itemId },
    { $pull: { reviews: { _id: reviewId } } }
  )
    .then((item) => {
      res.status(200).json({
        item,
        reviewIdDeleted: reviewId,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
