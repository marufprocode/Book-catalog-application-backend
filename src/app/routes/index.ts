import express from 'express';
import usersRoutes from '../modules/users/users.routes';
import booksRoutes from '../modules/book/book.routes';

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
];

appRoutes.forEach(route => router.use(route.path, route.route));

export default router;
