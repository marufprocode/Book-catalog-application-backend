import { Request, Response } from 'express';
import ApiError from '../../../errors/errors.apiError';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';
import readingListService from './readingList.service';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IReadingList } from './readingList.interface';

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const data = { book: req.body, user: req.user.userId } as IReadingList;
  const result = await readingListService.addToReadingListToDB(data);
  sendResponse<IReadingList | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'ReadingList updated successfully !' : `No Book found with id: ${id}`}`,
    data: result,
  });
});

const getAllReadingList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const data = await readingListService.getAllReadingListFromDB(req.user.userId);
  sendResponse<IReadingList[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ReadingList retrieved successfully',
    data,
  });
});
const deleteFromReadingList = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const id = req.params.id;
  const data = await readingListService.removeFromReadingList(id, req.user.userId);
  sendResponse<IReadingList | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted from ReadingList successfully',
    data,
  });
});

export default {
  addToReadingList,
  getAllReadingList,
  deleteFromReadingList,
};
