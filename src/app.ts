import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();
import routes from './app/routes';
import handleNotFoundRoutes from './app/middlewares/handleNotFoundRoutes';
import cookieParser from 'cookie-parser';

// using cors
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

//Testing routes is running well
app.get('/', async (req: Request, res: Response) => {
  res.send('Book Catalog Backend Server is Running');
});

//global error handler
app.use(globalErrorHandler);
// Hanlde Not Found with custom messaages
app.use(handleNotFoundRoutes);

export default app;
