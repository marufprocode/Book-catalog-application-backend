import { Schema, model } from 'mongoose';
import { IUser, UserModel, UserStaticModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, unknown>, UserStaticModel>(
  {
    password: { type: String, required: true, select: 0 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    readingList: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    finishedReading: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password' | 'id'> | null> {
  const result = await User.findOne({ email }, { id: 1, password: 1, email: 1 })
  return result;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bycrypt_salt_rounds));
  next();
});


export const User = model<IUser, UserModel>('User', userSchema);
