import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import readingListController from './readingList.controller';

const router = express.Router();

//Book Routes
router.patch('/', checkAuth(), readingListController.addToReadingList)
router.get('/', checkAuth(), readingListController.getAllReadingList)
router.delete('/:id', checkAuth(), readingListController.deleteFromReadingList)

export default router;
