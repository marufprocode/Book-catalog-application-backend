// import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../interfaces/paginaton';

interface IPaginationHelperOptions {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const calculatePagination = (options: IPaginationHelperOptions): IPaginationOptions => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const sort = {
    [sortBy]: sortOrder,
  };

  return {
    page,
    limit,
    skip,
    sort,
  };
};
