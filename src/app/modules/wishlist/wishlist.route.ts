import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import wishlistController from './wishlist.controller';

const router = express.Router();

//Book Routes
router.post('/', checkAuth(), wishlistController.addToWishList)
router.get('/', checkAuth(), wishlistController.getAllWishList)
router.delete('/:id', checkAuth(), wishlistController.deleteFromWishList)

export default router;
