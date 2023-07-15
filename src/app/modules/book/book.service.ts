import ApiError from '../../../errors/errors.apiError';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { booksSearchableFields } from './book.constants';
import { IBook, IbookSearchAndFiletrs } from './book.interface';
import { Book } from './book.model';

const createNewBookToDB = async (cowData: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(cowData);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to create cow data');
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

// const getSingleCowFromDB = async (id: string): Promise<ICow | null> => {
//   const result = await Cow.findById(id);
//   return result;
// };

// const deleteCowFromDB = async (id: string, sellerId: string): Promise<ICow | null> => {
//   const verifiedSeller = await Cow.exists({ _id: id, seller: sellerId });
//   if (!verifiedSeller) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized seller');
//   }
//   const result = await Cow.findByIdAndRemove(id);
//   return result;
// };

// const updateCowToDB = async (
//   id: string,
//   data: Partial<ICow>,
//   sellerId: string
// ): Promise<ICow | null> => {
//   const verifiedSeller = await Cow.exists({ _id: id, seller: sellerId });
//   if (!verifiedSeller) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized seller');
//   }
//   const result = await Cow.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
//   return result;
// };

export default {
  createNewBookToDB,
  getAllBooksFromDB,
};
