import httpStatus from 'http-status';
import ApiError from '../../../errors/errors.apiError';
import { getSearchAndFiltersCondition } from '../../../shared/helpers/getSearchAndFiltersCondition';
import { IPaginationOptions, IPaginationResponse } from '../../../shared/interfaces/paginaton';
import { cowsSearchableFields } from './cow.constants';
import { ICow, IcowSearchAndFiletrs } from './cow.interface';
import { Cow } from './cow.model';

const createNewCowToDB = async (cowData: ICow): Promise<ICow | null> => {
  const createdCow = await Cow.create(cowData);
  if (!createdCow) {
    throw new ApiError(400, 'Failed to create cow data');
  }
  return createdCow;
};

const getAllCowsFromDB = async (
  searchAndFilters: IcowSearchAndFiletrs,
  paginationOptions: IPaginationOptions
): Promise<IPaginationResponse<ICow[]>> => {
  const { page, limit, skip, sort } = paginationOptions;
  const conditions = getSearchAndFiltersCondition(
    searchAndFilters as Record<string, string>,
    cowsSearchableFields
  );

  const cows = await Cow.find(conditions).sort(sort).skip(skip).limit(limit);
  return {
    meta: {
      page,
      limit,
    },
    data: cows,
  };
};

const getSingleCowFromDB = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};

const deleteCowFromDB = async (id: string, sellerId:string): Promise<ICow | null> => {
  const verifiedSeller = await Cow.exists({_id: id, seller:sellerId})
  if (!verifiedSeller) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized seller')
  }
  const result = await Cow.findByIdAndRemove(id);
  return result;
};

const updateCowToDB = async (id: string, data: Partial<ICow>, sellerId:string): Promise<ICow | null> => {
  const verifiedSeller = await Cow.exists({_id: id, seller:sellerId})
  if (!verifiedSeller) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized seller')
  }
  const result = await Cow.findOneAndUpdate({_id: id}, data, { new: true, runValidators:true });
  return result;
};

export default {
  createNewCowToDB,
  getAllCowsFromDB,
  getSingleCowFromDB,
  deleteCowFromDB,
  updateCowToDB,
};
