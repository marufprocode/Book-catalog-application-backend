import mongoose from 'mongoose';
import { IGenericErrorMessage, IGenericErrorResponse } from './errors.interfaces';
import httpStatus from 'http-status';

const handleValidationError = (error: mongoose.Error.ValidationError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
