import express from 'express';
import usersRoutes from '../modules/users/users.routes';
import booksRoutes from '../modules/book/book.routes';
import wishListRoutes from '../modules/wishlist/wishlist.route';
import readingListRoutes from '../modules/readingList/readingList.route';

const router = express.Router();

const appRoutes = [
  {
    path: '/auth',
    route: usersRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
  {
    path: '/wishlist',
    route: wishListRoutes,
  },
  {
    path: '/readinglist',
    route: readingListRoutes,
  },
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
