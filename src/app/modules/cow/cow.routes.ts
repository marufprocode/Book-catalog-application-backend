import express from 'express';
import cowController from './cow.controller';
import validateRequestZod from '../../middlewares/validateReqZodMiddleware';
import cowValidation from './cow.validation';
import checkAuth from '../../middlewares/checkAuth';
import { ENUM_USER_ROLE } from '../../../shared/enums/usersEnum';

const router = express.Router();

// Cow routes
router.post('/', checkAuth(ENUM_USER_ROLE.SELLER), validateRequestZod(cowValidation.createCowZodSchema), cowController.createCow);
router.get('/', checkAuth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), cowController.getAllCows);
router.get('/:id', checkAuth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), cowController.getSingleCow);
router.delete('/:id', checkAuth(ENUM_USER_ROLE.SELLER), cowController.deleteCow);
router.patch('/:id', checkAuth(ENUM_USER_ROLE.SELLER), validateRequestZod(cowValidation.updateCowZodSchema), cowController.updateCow);

export default router;
