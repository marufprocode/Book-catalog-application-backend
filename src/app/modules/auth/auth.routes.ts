import express from 'express';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';
import authValidation from './auth.validation';
import authController from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequestZod(authValidation.createCowZodSchema),
  authController.createUser
);

router.post(
  '/login',
  validateRequestZod(authValidation.loginZodSchema),
  authController.loginUser
);
router.post(
  '/refresh-token',
  validateRequestZod(authValidation.refreshTokenZodSchema),
  authController.refreshToken
);

export default router;
