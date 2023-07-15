import { RequestHandler } from 'express';
import httpStatus from 'http-status';

const handleNotFoundRoutes: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
};

export default handleNotFoundRoutes;
