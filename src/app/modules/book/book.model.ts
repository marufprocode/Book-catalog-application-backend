// import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
// import ApiError from '../../../errors/errors.apiError';
// import { User } from '../users/users.model';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    image: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// bookSchema.pre('save', async function (next) {
//   const isExist = await User.exists({
//     _id: this.seller,
//     role: 'seller',
//   });
//   if (!isExist) {
//     // Document with the same title and year already exists
//     return next(new ApiError(httpStatus.BAD_REQUEST, `Seller Id is not Valid`));
//   }
//   // Document does not exist, proceed with the save operation
//   next();
// });

export const Book = model<IBook, BookModel>('Book', bookSchema);
