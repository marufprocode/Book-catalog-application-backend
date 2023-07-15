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
  const result = await ReadingList.find({ user });
  return result;
};

const removeFromReadingList = async (readingListId: string, user: string): Promise<IReadingList | null> => {
  const readingListItem = await ReadingList.findById(readingListId);
  if (!readingListItem) {
    throw new ApiError(httpStatus.NOT_FOUND, `No ReadingList found with id: ${readingListId}`);
  } else if (readingListItem?.user.toString() !== user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized user');
  }
  const result = await ReadingList.findByIdAndRemove(readingListId);
  return result;
};

export default { addToReadingListToDB, getAllReadingListFromDB, removeFromReadingList };
