"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.infoLogger = void 0;
const winston_1 = require("winston");
const transports_1 = require("./transports");
const { combine, timestamp, label, printf } = winston_1.format;
const formatLogger = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
const infoLogger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'PH' }), timestamp(), formatLogger),
    transports: [transports_1.infoTransport, transports_1.consoleTransport],
});
exports.infoLogger = infoLogger;
const errorLogger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'PH' }), timestamp(), formatLogger),
    transports: [transports_1.errorTransport, transports_1.consoleTransport],
});
exports.errorLogger = errorLogger;
