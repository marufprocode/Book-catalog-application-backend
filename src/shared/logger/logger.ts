import { createLogger, format } from 'winston';
import { consoleTransport, errorTransport, infoTransport } from './transports';
const { combine, timestamp, label, printf } = format;

const formatLogger = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const infoLogger = createLogger({
  format: combine(label({ label: 'PH' }), timestamp(), formatLogger),
  transports: [infoTransport, consoleTransport],
});

const errorLogger = createLogger({
  format: combine(label({ label: 'PH' }), timestamp(), formatLogger),
  transports: [errorTransport, consoleTransport],
});

export { infoLogger, errorLogger };
