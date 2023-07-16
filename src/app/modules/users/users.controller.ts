import { Request, Response } from 'express';
import catchAsync from '../../../shared/HOF/catchAsync';
import sendResponse from '../../../shared/utilities/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse, IUser } from '../users/users.interface';
import httpStatus from 'http-status';
import config from '../../../config';
import usersService from './users.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const result = await usersService.createUserToDB(user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Users created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await usersService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await usersService.refreshToken(refreshToken);
  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});



export default { createUser, loginUser, refreshToken };
