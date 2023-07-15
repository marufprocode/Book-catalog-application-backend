"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleTransport = exports.errorTransport = exports.infoTransport = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
exports.infoTransport = new winston_daily_rotate_file_1.default({
    level: 'info',
    filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'phu-%DATE%-success.log'),
    datePattern: 'YYYY-DD-MM-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
exports.errorTransport = new winston_daily_rotate_file_1.default({
    level: 'error',
    filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'phu-%DATE%-error.log'),
    datePattern: 'YYYY-DD-MM-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
exports.consoleTransport = new winston_1.transports.Console();
