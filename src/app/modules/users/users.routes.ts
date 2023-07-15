import express from 'express';
import usersController from './users.controller';

const router = express.Router();

router.post('/signup', usersController.createUser);
router.post('/login', usersController.loginUser);
router.post('/refresh-token', usersController.refreshToken);

export default router;
