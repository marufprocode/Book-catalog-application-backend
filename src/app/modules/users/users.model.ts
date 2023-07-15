import { Schema, model } from 'mongoose';
import { IUser, UserModel, UserStaticModel } from './users.interface';
import { userRoleEnum } from './user.constants';
import ApiError from '../../../errors/errors.apiError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, unknown>, UserStaticModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: userRoleEnum, required: true },
    password: { type: String, required: true, select: 0 },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'id' | 'password' | 'role'> | null> {
  return await User.findOne({ phoneNumber }, { id: 1, password: 1, role: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bycrypt_salt_rounds));
  if (this.role === 'buyer' && !(this.budget > 0)) {
    return next(
      new ApiError(httpStatus.BAD_REQUEST, `you must have a budget to create user as ${this.role}`)
    );
  }
  // Document does not exist, proceed with the save operation
  next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() as Partial<IUser>
  if(update.password){
    update.password = await bcrypt.hash(update.password, Number(config.bycrypt_salt_rounds));
  }
  next();
});



export const User = model<IUser, UserModel>('User', userSchema);
