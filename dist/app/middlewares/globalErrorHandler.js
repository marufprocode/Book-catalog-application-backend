"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const errors_apiError_1 = __importDefault(require("../../errors/errors.apiError"));
const errors_handleValidationError_1 = __importDefault(require("../../errors/errors.handleValidationError"));
const errors_handleZodError_1 = __importDefault(require("../../errors/errors.handleZodError"));
const errors_handleCastError_1 = __importDefault(require("../../errors/errors.handleCastError"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (error, req, res, next) => {
    // check if the error happened before in the console or logs the error
    config_1.default.env === 'development'
        ? console.error(`⛔ globalErrorHandler ~~`, error)
        : console.error(`⛔ globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Internal Server Error!';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, errors_handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, errors_handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, errors_handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        const value = Object.values(error.keyValue)[0];
        const errors = [
            {
                path: field,
                message: `Duplicate key error. The value '${field}: ${value}' already exists.`,
            },
        ];
        statusCode = http_status_1.default.BAD_REQUEST;
        message = 'Duplicate key error.';
        errorMessages = errors;
    }
    else if (error instanceof errors_apiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof mongoose_1.Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
    next();
};
exports.default = globalErrorHandler;
