import mongoose from 'mongoose';
import { IGenericErrorMessage } from './errors.interfaces';
import httpStatus from 'http-status';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
