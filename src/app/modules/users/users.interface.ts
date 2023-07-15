/* eslint-disable no-unused-vars */
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document{
  name: string;
  password: string;
  email: string;
  wishlist?: Schema.Types.ObjectId[] | null;
  readingList?: Schema.Types.ObjectId[] | null;
  finishedReading?: Schema.Types.ObjectId[] | null
}

export interface UserStaticModel extends Model<IUser> {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password' | 'id'>>;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
};

export interface IRefreshTokenResponse {
  accessToken: string;
};


export type UserModel = UserStaticModel;
