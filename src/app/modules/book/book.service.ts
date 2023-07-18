import ApiError from '../../../errors/errors.apiError';
import httpStatus from 'http-status';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { booksSearchableFields } from './book.constants';
import { IBook, IReview, IbookSearchAndFiletrs } from './book.interface';
import { Book } from './book.model';

const createNewBookToDB = async (bookData: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(bookData);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to create book');
  }
  return createdBook;
};

const getAllBooksFromDB = async (
  searchAndFilters: IbookSearchAndFiletrs,
  paginationOptions: IPaginationOptions
): Promise<IPaginationResponse<IBook[]>> => {
  const { page, limit, skip, sort } = paginationOptions;
  const conditions = getSearchAndFiltersCondition(
    searchAndFilters as Record<string, string>,
    booksSearchableFields
  );
  const books = await Book.find(conditions).sort(sort).skip(skip).limit(limit);
  return {
    meta: {
      page,
      limit,
    },
    data: books,
  };
};
const getAllDistinctFromDB = async (query: string): Promise<string[]> => {
  const result = await Book.distinct(query);
  return result;
};

const getSingleBookFromDB = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const deleteBookFromDB = async (bookId: string, userId: string): Promise<IBook | null> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No Book found with id: ${bookId}`);
  } else if (book?.createdBy.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized user');
  }
  const result = await Book.findByIdAndRemove(bookId);
  return result;
};

const updateBookToDB = async (
  bookId: string,
  data: Partial<IBook>,
  userId: string
): Promise<IBook | null> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No Book found with id: ${bookId}`);
  } else if (book?.createdBy.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized user');
  }
  const result = await Book.findOneAndUpdate({ _id: bookId }, data, {
    new: true,
    runValidators: true,
  });
  return result;
};
const postReviewToDB = async (data: IReview, bookId: string): Promise<boolean> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  book.reviews.push(data);
  await book.save();
  return true;
};

export default {
  createNewBookToDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookToDB,
  getAllDistinctFromDB,
  postReviewToDB,
};
