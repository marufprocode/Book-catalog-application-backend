import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/errors.apiError';
import { jwtHelpers } from '../../shared/helpers/jwtHelpers';
import config from '../../config';

const checkAuth = () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
      }
      const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" scheme
      // verify token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret);
      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };

export default checkAuth;