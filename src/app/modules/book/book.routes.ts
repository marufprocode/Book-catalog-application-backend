import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import bookController from './book.controller';

const router = express.Router();

//Book Routes
router.post('/create', checkAuth(), bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getSingleBook);
router.delete('/:id', checkAuth(), bookController.deleteBook);
router.patch('/:id', checkAuth(), bookController.updateBook);

export default router;
