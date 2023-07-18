import { Document, Model, Schema } from 'mongoose';

export interface IReview {
  user: Schema.Types.ObjectId;
  name: string;
  review: string;
}


export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  image?: string;
  createdBy: Schema.Types.ObjectId;
  reviews:IReview[];
}

//Book Model Definition
export type BookModel = Model<IBook, Record<string, unknown>>;

export interface IbookSearchAndFiletrs {
  search?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: string;
}
