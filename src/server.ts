import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

let server: Server;

process.on('uncaughtException', (error: Error) => {
  console.error(error);
  process.exit(1);
});

//Connect to the database and start the server
async function connectDB() {
  try {
    await mongoose.connect(config.mongo_url);
    console.log(`🛢 Database connection successful`);

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  }

  process.on('unhandledRejection', (reason: unknown) => {
    if (server) {
      server.close(() => {
        console.error(reason);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDB();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
    mongoose.disconnect();
  }
});
