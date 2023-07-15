import { Request, Response } from 'express';
import catchAsync from '../../../shared/HOF/catchAsync';
import ApiError from '../../../errors/errors.apiError';
import httpStatus from 'http-status';
import wishlistService from './wishlist.service';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IWishList } from './wishlist.interface';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(
      httpStatus.FORBIDDEN,
      'forbidden access, you are not authorized to add wishlist items'
    );
  }
  const { book } = req.body;
  const data = { book, user: req.user.userId } as IWishList;
  const result = await wishlistService.addWishListToDB(data);
  sendResponse<IWishList>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Added to wishlist successfully',
    data: result,
  });
});
const getAllWishList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, you are not authorized');
  }
  const result = await wishlistService.getAllWishListFromDB(req.user.userId);
  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrived successfully',
    data: result,
  });
});

const deleteFromWishList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const result = await wishlistService.deleteWishListFromDB(id, req.user.userId);
  sendResponse<IWishList | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result ? 'Book removed from wishlist successfully!' : `No Book found with id: ${id}`
    }`,
    data: result,
  });
});

export default {
  addToWishList,
  getAllWishList,
  deleteFromWishList,
};
