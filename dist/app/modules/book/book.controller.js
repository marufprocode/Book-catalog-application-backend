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
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/HOF/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const pickKeys_1 = __importDefault(require("../../../shared/utilities/pickKeys"));
const pagination_constants_1 = require("../../../shared/constants/pagination.constants");
const book_service_1 = __importDefault(require("./book.service"));
const paginationHelper_1 = require("../../../shared/helpers/paginationHelper");
const book_constants_1 = require("./book.constants");
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, you are not authorized to create a book');
    }
    const bookData = Object.assign(Object.assign({}, req.body), { createdBy: req.user.userId });
    const result = yield book_service_1.default.createNewBookToDB(bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pickKeys_1.default)(req.query, pagination_constants_1.paginationFields);
    const formattedPaginationOptions = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const searchAndFilters = (0, pickKeys_1.default)(req.query, book_constants_1.booksSearchAndFiltersFields);
    const { meta, data } = yield book_service_1.default.getAllBooksFromDB(searchAndFilters, formattedPaginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        meta,
        data,
    });
}));
const getAllDistinct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.id;
    const data = yield book_service_1.default.getAllDistinctFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        data,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.default.getSingleBookFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Book retrieved successfully !' : `No Book found with id: ${id}`}`,
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const result = yield book_service_1.default.deleteBookFromDB(id, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Book deleted successfully!' : `No Book found with id: ${id}`}`,
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const result = yield book_service_1.default.updateBookToDB(id, req.body, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Book updated successfully !' : `No Book found with id: ${id}`}`,
        data: result,
    });
}));
const postReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const { name, review } = req.body;
    const data = { user: req.user.userId, name, review };
    const result = yield book_service_1.default.postReviewToDB(data, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: result,
        message: `${result ? 'Review added successfully!' : `Review post failed`}`,
        data: null,
    });
}));
exports.default = { createBook, getAllBooks, getSingleBook, deleteBook, updateBook, getAllDistinct, postReview };
