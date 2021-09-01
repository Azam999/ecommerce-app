import { Request, Response } from 'express';
import { Item, Review } from '../shared/models/Item.model';

export const GET_ITEMS = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    try {
      const items = await Item.find().populate('reviews');
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
  item
    .save()
    .then((item: any) => {
      res.status(200).json({
        item,
        message: 'Item created',
      });
    })
    .catch((err: any) => res.status(400).send(err));
};

export const SORT_ITEMS = async (req: Request, res: Response) => {
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
    interface ISearchQuery {
      name?: string;
      category?: string;
      price?: number;
    }

    let searchQuery: ISearchQuery = {};
    if (name) {
      searchQuery.name = name as string;
    }

    if (category) {
      if (categories.includes(category as string)) {
        searchQuery.category = category as string;
      } else {
        return res.status(400).json({
          message: "Category doesn't exist"
        })
      }
    }

    if (price) {
      searchQuery.price = +(price as string);
    }

    if (filterTypes.includes(filter as string)) {
      switch (filter) {
        case 'priceLowToHigh':
          Item.find(searchQuery)
            .sort({ price: 1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'priceHighToLow':
          Item.find(searchQuery)
            .sort({ price: -1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'newest':
          Item.find(searchQuery)
            .sort({ createdAt: -1 })
            .exec((err: any, items: any) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.status(200).send(items);
            });
          break;
        case 'alphabetical':
          Item.find(searchQuery)
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
          return res.status(400).json({
            error: "Filter doesn't exist",
            code: res.statusCode,
          });
      }
    } else {
      return res.status(400).json({
        message: "Filter doesn't exist",
        code: res.statusCode,
      });
    }
  }
};

export const DELETE_ITEM = (req: Request, res: Response) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then(async (item: any) => {
      const deletedReviews = await Review.deleteMany({
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
    .then((item: any) => {
      res.status(200).json({
        item,
        values: req.body,
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        error: err,
      });
    });
};

export const CREATE_REVIEW_FOR_ITEM = (req: Request, res: Response) => {
  const review = new Review(req.body);
  review.save();

  const { itemId } = req.params;
  Item.findOneAndUpdate({ _id: itemId }, { $push: { reviews: review } })
    .then((item: any) => {
      res.status(200).json({
        item,
        reviewAdded: review,
      });
    })
    .catch((err: any) => {
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
      const review = await Item.findById(itemId)
        .populate('reviews')
        .select({
          reviews: { $elemMatch: { _id: reviewId } },
        });
      res.status(200).send(review);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const allReviews = await Item.findById(itemId)
        .populate('reviews')
        .select('reviews');
      if (!allReviews) {
        throw {
          error: 'An item with that id does not exist',
          code: 404,
        };
      }
      res.status(200).send(allReviews);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export const DELETE_ITEM_REVIEW = (req: Request, res: Response) => {
  const { itemId, reviewId } = req.params;

  Item.findOneAndUpdate(
    { _id: itemId },
    { $pull: { reviews: { _id: reviewId } } }
  )
    .then(async (item: any) => {
      const deletedReview = await Review.deleteOne({ _id: reviewId });
      res.status(200).json({
        item,
        reviewIdDeleted: reviewId,
        deletedReview,
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        error: err,
      });
    });
};
