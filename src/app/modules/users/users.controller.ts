import { Request, Response } from 'express';
import usersService from './users.service';
import catchAsync from '../../../shared/HOF/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IUser } from './users.interface';
import ApiError from '../../../errors/errors.apiError';
import { IAdmin } from '../admin/admin.interface';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await usersService.getAllUsersFromDB();
  sendResponse<IUser[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data,
  });
});

const getSignleUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await usersService.getSingleUserFromDB(id);
  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${data ? 'User retrieved successfully' : `No user found with id: ${id}`}`,
    data,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access');
  }
  const data = await usersService.getMyProfileFromDB(req.user);
  sendResponse<IUser | IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await usersService.deleteUserFromDB(id);
  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${data ? 'User deleted successfully' : `No user found with id: ${id}`}`,
    data,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await usersService.updateUserToDB(id, req.body);
  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'User updated successfully' : `Something went wrong, Not updated!`}`,
    data:result,
  });
});
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access');
  }
  const result = await usersService.updateMyProfileToDB(req.user, req.body);
  sendResponse<IUser | IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? "User's information retrieved successfully":"No User's information found"}`,
    data:result,
  });
});

export default { getAllUsers, getSignleUsers, deleteUser, updateUser, getMyProfile, updateMyProfile };
