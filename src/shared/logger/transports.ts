import { transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

export const infoTransport = new DailyRotateFile({
  level: 'info',
  filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'phu-%DATE%-success.log'),
  datePattern: 'YYYY-DD-MM-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const errorTransport = new DailyRotateFile({
  level: 'error',
  filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'phu-%DATE%-error.log'),
  datePattern: 'YYYY-DD-MM-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const consoleTransport = new transports.Console();
