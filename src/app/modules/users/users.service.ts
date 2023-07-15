import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IUser } from './users.interface';
import { User } from './users.model';

const getAllUsersFromDB = async (): Promise<IUser[] | null> => {
  const users = await User.find({});
  return users;
};
const getSingleUserFromDB = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};
const getMyProfileFromDB = async (
  user: Record<string, unknown>
): Promise<IUser | IAdmin | null> => {
  if (user.role === 'admin') {
    const result = await Admin.findOne({ _id: user.userId, role: user.role });
    return result;
  } else {
    const result = await User.findOne({ _id: user.userId, role: user.role });
    return result;
  }
};
const deleteUserFromDB = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndRemove(id);
  return user;
};
const updateUserToDB = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  return result;
};
const updateMyProfileToDB = async (user: Record<string, unknown>, data:Partial<IUser | IAdmin>): Promise<IUser | IAdmin | null> => {
  if (user.role === 'admin') {
    const result = await Admin.findByIdAndUpdate(user.userId, data, { new: true, runValidators: true }).lean();
    return result;
  } else {
    const result = await User.findByIdAndUpdate(user.userId, data, { new: true, runValidators: true }).lean();
    return result;
  }
};

export default {
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserToDB,
  getMyProfileFromDB,
  updateMyProfileToDB,
};
