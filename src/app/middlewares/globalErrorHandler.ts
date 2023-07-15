/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../errors/errors.interfaces';
import { ZodError } from 'zod';
import { Error } from 'mongoose';
import ApiError from '../../errors/errors.apiError';
import handleValidationError from '../../errors/errors.handleValidationError';
import handleZodError from '../../errors/errors.handleZodError';
import handleCastError from '../../errors/errors.handleCastError';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // check if the error happened before in the console or logs the error
  config.env === 'development'
    ? console.error(`⛔ globalErrorHandler ~~`, error)
    : console.error(`⛔ globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Internal Server Error!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    const value = Object.values(error.keyValue)[0];
    const errors: IGenericErrorMessage[] = [
      {
        path: field,
        message: `Duplicate key error. The value '${field}: ${value}' already exists.`,
      },
    ];
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Duplicate key error.';
    errorMessages = errors;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  });

  next();
};

export default globalErrorHandler;
