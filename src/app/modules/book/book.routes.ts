import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import bookController from './book.controller';

const router = express.Router();

//Book Routes
router.post('/create', checkAuth(), bookController.createBook);
router.post('/review/:id', checkAuth(), bookController.postReview);
router.get('/distinct/:id', bookController.getAllDistinct);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getSingleBook);
router.delete('/:id', checkAuth(), bookController.deleteBook);
router.patch('/:id', checkAuth(), bookController.updateBook);

export default router;
