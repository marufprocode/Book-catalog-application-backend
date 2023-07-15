import { Schema, model } from 'mongoose';
import { IReadingList, READING_STATUS, ReadingListModel } from './readingList.interface';

const readingListSchema = new Schema<IReadingList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(READING_STATUS),
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ReadingList = model<IReadingList, ReadingListModel>('Readinglist', readingListSchema);
