import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/HOF/catchAsync';
import sendResponse from '../../../shared/utilities/sendResponse';
import { IBook } from './book.interface';
import pickKeys from '../../../shared/utilities/pickKeys';
import { paginationFields } from '../../../shared/constants/pagination.constants';
import bookService from './book.service';
import { calculatePagination } from '../../../shared/helpers/paginationHelper';
import { booksSearchAndFiltersFields } from './book.constants';
import ApiError from '../../../errors/errors.apiError';

const createBook = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, you are not authorized to create a book');
  }
  const bookData = {...req.body, createdBy: req.user.userId};
  const result = await bookService.createNewBookToDB(bookData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const formattedPaginationOptions = calculatePagination(paginationOptions);
  const searchAndFilters = pickKeys(req.query, booksSearchAndFiltersFields);
  const { meta, data } = await bookService.getAllBooksFromDB(
    searchAndFilters,
    formattedPaginationOptions
  );
  sendResponse<IBook[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta,
    data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bookService.getSingleBookFromDB(id);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Book retrieved successfully !' : `No Book found with id: ${id}`}`,
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const result = await bookService.deleteBookFromDB(id, req.user.userId);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Book deleted successfully!' : `No Book found with id: ${id}`}`,
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.user) {
    return new ApiError(httpStatus.FORBIDDEN, 'forbidden access, user is not authorized');
  }
  const result = await bookService.updateBookToDB(id, req.body, req.user.userId);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result ? 'Book updated successfully !' : `No Book found with id: ${id}`}`,
    data: result,
  });
});

export default { createBook, getAllBooks, getSingleBook, deleteBook, updateBook };
