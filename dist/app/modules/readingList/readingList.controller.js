"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const catchAsync_1 = __importDefault(require("../../../shared/HOF/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const readingList_service_1 = __importDefault(require("./readingList.service"));
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const addToReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const data = { book: req.body, user: req.user.userId };
    const result = yield readingList_service_1.default.addToReadingListToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'ReadingList updated successfully !' : `No Book found with id: ${id}`}`,
        data: result,
    });
}));
const getAllReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const data = yield readingList_service_1.default.getAllReadingListFromDB(req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ReadingList retrieved successfully',
        data,
    });
}));
const deleteFromReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const id = req.params.id;
    const data = yield readingList_service_1.default.removeFromReadingList(id, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Deleted from ReadingList successfully',
        data,
    });
}));
exports.default = {
    addToReadingList,
    getAllReadingList,
    deleteFromReadingList,
};
