import { Schema, model } from 'mongoose';
import { Breed, Category, CowModel, ICow, Label, Location } from './cow.interface';
import { User } from '../users/users.model';
import ApiError from '../../../errors/errors.apiError';
import httpStatus from 'http-status';

const cowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: Object.values(Location), required: true },
    breed: { type: String, enum: Object.values(Breed), required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: Object.values(Label), default: Label.ForSale },
    category: { type: String, enum: Object.values(Category), required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

cowSchema.pre('save', async function (next) {
  const isExist = await User.exists({
    _id: this.seller,
    role: 'seller',
  });
  if (!isExist) {
    // Document with the same title and year already exists
    return next(new ApiError(httpStatus.BAD_REQUEST, `Seller Id is not Valid`));
  }
  // Document does not exist, proceed with the save operation
  next();
});


export const Cow = model<ICow, CowModel>('Cow', cowSchema);