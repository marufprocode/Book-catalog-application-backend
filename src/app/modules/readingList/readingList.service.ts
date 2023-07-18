import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { IReadingList } from './readingList.interface';
import { ReadingList } from './readingList.model';

const addToReadingListToDB = async (data: IReadingList): Promise<IReadingList | null> => {
  const result = await ReadingList.findOneAndUpdate({ 'book.id': data.book.id }, data, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return result;
};

const getAllReadingListFromDB = async (user: string): Promise<IReadingList[] | null> => {
  const result = await ReadingList.find({ user }, {book:1}).populate("book");
  return result;
};

const removeFromReadingList = async (bookId: string, user: string): Promise<IReadingList | null> => {
  const readingListItem = await ReadingList.findOne({"book.id":bookId, user});
  if (!readingListItem) {
    throw new ApiError(httpStatus.NOT_FOUND, `No ReadingList found with id: ${bookId}`);
  } else if (readingListItem?.user.toString() !== user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized user');
  }
  const result = await ReadingList.findByIdAndRemove(readingListItem.id);
  return result;
};

export default { addToReadingListToDB, getAllReadingListFromDB, removeFromReadingList };
