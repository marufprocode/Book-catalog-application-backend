import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { IWishList } from './wishlist.interface';
import { WishList } from './wishlist.model';

const addWishListToDB = async (data: IWishList): Promise<IWishList | null> => {
  const createdBook = await WishList.create(data);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to added into WishList');
  }
  return createdBook;
};
const getAllWishListFromDB = async (user: string): Promise<IWishList[] | null> => {
  const result = await WishList.find({user});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Items found in your WishList');
  }
  return result;
};

const deleteWishListFromDB = async (wishListId: string, userId: string): Promise<IWishList | null> => {
  const book = await WishList.findById(wishListId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, `No WishList found with id: ${wishListId}`);
  } else if (book?.user.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized user');
  }
  const result = await WishList.findByIdAndRemove(wishListId);
  return result;
};

export default { addWishListToDB, getAllWishListFromDB, deleteWishListFromDB };
