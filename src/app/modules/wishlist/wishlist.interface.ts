import { Document, Model, Schema } from 'mongoose';

export interface IWishList extends Document {
  user: Schema.Types.ObjectId,
  book: Schema.Types.ObjectId,
}

export type WishListModel = Model<IWishList>;
