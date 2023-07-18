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
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const wishlist_model_1 = require("./wishlist.model");
const addWishListToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield wishlist_model_1.WishList.create(data);
    if (!createdBook) {
        throw new errors_apiError_1.default(400, 'Failed to added into WishList');
    }
    return createdBook;
});
const getAllWishListFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.WishList.find({ user }, { book: 1 }).populate('book');
    if (!result) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'No Items found in your WishList');
    }
    return result;
});
const deleteWishListFromDB = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield wishlist_model_1.WishList.findOne({ book: bookId, user: userId });
    if (!book) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, `No WishList found with id: ${bookId}`);
    }
    else if ((book === null || book === void 0 ? void 0 : book.user.toString()) !== userId) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized user');
    }
    const result = yield wishlist_model_1.WishList.findByIdAndRemove(book.id);
    return result;
});
exports.default = { addWishListToDB, getAllWishListFromDB, deleteWishListFromDB };
