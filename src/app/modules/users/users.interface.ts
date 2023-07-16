/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export interface IUser extends Document{
  id: string;
  name: string;
  password: string;
  email: string;
}

export interface UserStaticModel extends Model<IUser> {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password' | 'id'>>;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
}

export interface ILoginUser {
  email: string;
  password: string;
};

export interface IRefreshTokenResponse {
  accessToken: string;
};


export type UserModel = UserStaticModel;
