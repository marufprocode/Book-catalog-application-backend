import express from 'express';
import bookController from './book.controller';
import checkAuth from '../../middlewares/checkAuth';
// import checkAuth from '../../middlewares/checkAuth';
// import cowController from './book.controller';
// import { ENUM_USER_ROLE } from '../../../shared/enums/usersEnum';

const router = express.Router();

// Cow routes
// router.post('/', checkAuth(ENUM_USER_ROLE.SELLER), cowController.createCow);
// router.get('/:id', checkAuth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), cowController.getSingleCow);
// router.delete('/:id', checkAuth(ENUM_USER_ROLE.SELLER), cowController.deleteCow);
// router.patch('/:id', checkAuth(ENUM_USER_ROLE.SELLER), cowController.updateCow);

//Book Routes
router.post('/create', checkAuth(), bookController.createBook)
router.get('/', bookController.getAllBooks);

export default router;
