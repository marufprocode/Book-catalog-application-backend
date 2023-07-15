import { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishlist.interface';

const wishlistSchema = new Schema<IWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const WishList = model<IWishList, WishListModel>('Wishlist', wishlistSchema);
