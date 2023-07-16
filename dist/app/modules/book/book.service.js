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
const http_status_1 = __importDefault(require("http-status"));
const getSearchAndFiltersCondition_1 = require("../../../shared/helpers/getSearchAndFiltersCondition");
const book_constants_1 = require("./book.constants");
const book_model_1 = require("./book.model");
const createNewBookToDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield book_model_1.Book.create(bookData);
    if (!createdBook) {
        throw new errors_apiError_1.default(400, 'Failed to create book');
    }
    return createdBook;
});
const getAllBooksFromDB = (searchAndFilters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sort } = paginationOptions;
    const conditions = (0, getSearchAndFiltersCondition_1.getSearchAndFiltersCondition)(searchAndFilters, book_constants_1.booksSearchableFields);
    const books = yield book_model_1.Book.find(conditions).sort(sort).skip(skip).limit(limit);
    return {
        meta: {
            page,
            limit,
        },
        data: books,
    };
});
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const deleteBookFromDB = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, `No Book found with id: ${bookId}`);
    }
    else if ((book === null || book === void 0 ? void 0 : book.createdBy.toString()) !== userId) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized user');
    }
    const result = yield book_model_1.Book.findByIdAndRemove(bookId);
    return result;
});
const updateBookToDB = (bookId, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, `No Book found with id: ${bookId}`);
    }
    else if ((book === null || book === void 0 ? void 0 : book.createdBy.toString()) !== userId) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized user');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, data, { new: true, runValidators: true });
    return result;
});
exports.default = {
    createNewBookToDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    deleteBookFromDB,
    updateBookToDB,
};
