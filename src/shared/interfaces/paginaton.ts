import { SortOrder } from 'mongoose';

export interface IPaginationOptions {
  page: number;
  limit: number;
  skip: number;
  sort: { [key: string]: SortOrder };
}

export interface IPaginationResponse<T> {
  meta: {
    limit: number;
    page: number;
  };
  data: T;
}
