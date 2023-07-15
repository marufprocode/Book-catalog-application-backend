import { Request, Response } from 'express';
import catchAsync from '../../../shared/HOF/catchAsync';
import cowService from './cow.service';
import sendResponse from '../../../shared/utilities/sendResponse';
import { ICow } from './cow.interface';
import httpStatus from 'http-status';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';
import { cowsSearchAndFiltersFields } from './cow.constants';
import ApiError from '../../../errors/errors.apiError';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body;
  const result = await cowService.createNewCowToDB(cowData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const formattedPaginationOptions = calculatePagination(paginationOptions);
  const searchAndFilters = pickKeys(req.query, cowsSearchAndFiltersFields);
  const { meta, data } = await cowService.getAllCowsFromDB(
    searchAndFilters,
    formattedPaginationOptions
  );
  sendResponse<ICow[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    meta,
    data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await cowService.getSingleCowFromDB(id);
  sendResponse<ICow | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Cow retrieved successfully !' : `No Cow found with id: ${id}`}`,
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, seller is not authorized');
  }

  const result = await cowService.deleteCowFromDB(id, req.user.userId);

  sendResponse<ICow | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Cow deleted successfully!' : `No Cow found with id: ${id}`}`,
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, seller is not authorized');
  }
  const result = await cowService.updateCowToDB(id, req.body, req.user.userId);
  sendResponse<ICow | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Cow updated successfully !' : `No Cow found with id: ${id}`}`,
    data: result,
  });
});

export default { createCow, getAllCows, getSingleCow, deleteCow, updateCow };
