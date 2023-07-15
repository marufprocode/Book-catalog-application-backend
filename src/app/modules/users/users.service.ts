import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { User } from '../users/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from '../users/users.interface';
import { jwtHelpers } from '../../../shared/helpers/jwtHelpers';
import config from '../../../config';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  const result = User.findById(createdUser.id);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    { userId: isUserExist.id, email: isUserExist.email },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: isUserExist.id, email: isUserExist.email },
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
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token
  const isUserExist = await User.findById(userId, { id: 1, email: 1 });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    { userId: isUserExist.id, email: isUserExist.email },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
  };
};

export default { createUserToDB, loginUser, refreshToken };
