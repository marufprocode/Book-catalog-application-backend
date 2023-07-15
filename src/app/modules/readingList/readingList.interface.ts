/* eslint-disable no-unused-vars */
import { Document, Model, Schema } from 'mongoose';

// READING_STATUS enums
export enum READING_STATUS {
  READING = 'Currently Reading',
  READ_SOON= 'Read Soon',
  FINISHED = 'Reading Completed',
}

export interface IReadingList extends Document {
  user: Schema.Types.ObjectId,
  book: {
    id: Schema.Types.ObjectId,
    status: READING_STATUS
  },
}

export type ReadingListModel = Model<IReadingList>;
