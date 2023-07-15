/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

interface UserName {
  firstName: string;
  lastName: string;
}

export interface IUser extends Document{
  phoneNumber: string;
  role: 'buyer' | 'seller';
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
  passwords: string;
}

export interface UserStaticModel extends Model<IUser> {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
  isUserExist(id: string): Promise<Pick<IUser, 'id' | 'password' | 'role'>>;
}


export type UserModel = UserStaticModel;
