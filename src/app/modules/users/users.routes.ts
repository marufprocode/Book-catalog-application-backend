import express from 'express';
import usersController from './users.controller';
import checkAuth from '../../middlewares/checkAuth';
import { ENUM_USER_ROLE } from '../../../shared/enums/usersEnum';

const router = express.Router();

router.get('/', checkAuth(ENUM_USER_ROLE.ADMIN), usersController.getAllUsers);
router.get('/my-profile', checkAuth(), usersController.getMyProfile);
router.patch('/my-profile', checkAuth(), usersController.updateMyProfile);
router.get('/:id', checkAuth(ENUM_USER_ROLE.ADMIN), usersController.getSignleUsers);
router.patch('/:id', checkAuth(ENUM_USER_ROLE.ADMIN), usersController.updateUser);
router.delete('/:id', checkAuth(ENUM_USER_ROLE.ADMIN), usersController.deleteUser);

export default router;
