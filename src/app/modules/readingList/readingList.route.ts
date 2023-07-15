import express from 'express';
import readingListController from './readingList.controller';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

//Book Routes
router.patch('/', checkAuth(), readingListController.addToReadingList)
router.get('/', checkAuth(), readingListController.getAllReadingList)
router.delete('/:id', checkAuth(), readingListController.deleteFromReadingList)

export default router;
