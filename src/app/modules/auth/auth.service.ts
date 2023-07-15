import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { IUser } from '../users/users.interface';
import { User } from '../users/users.model';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { jwtHelpers } from '../../../shared/helpers/jwtHelpers';
import config from '../../../config';
import { Admin } from '../admin/admin.model';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId, role } = verifiedToken;

  // checking deleted user's refresh token
  let isUserExist;
  if(role === 'admin'){
    isUserExist = await Admin.findById(userId, {id:1, role:1});
  } else{
    isUserExist = await User.findById(userId, {id:1, role:1});
  }
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
  };
};


export default { createUserToDB, loginUser, refreshToken };
