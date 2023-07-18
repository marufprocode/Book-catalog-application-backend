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
const readingList_model_1 = require("./readingList.model");
const addToReadingListToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.ReadingList.findOneAndUpdate({ 'book.id': data.book.id }, data, {
        new: true,
        runValidators: true,
        upsert: true,
    });
    return result;
});
const getAllReadingListFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.ReadingList.find({ user }, { book: 1 }).populate("book");
    return result;
});
const removeFromReadingList = (bookId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const readingListItem = yield readingList_model_1.ReadingList.findOne({ "book.id": bookId, user });
    if (!readingListItem) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, `No ReadingList found with id: ${bookId}`);
    }
    else if ((readingListItem === null || readingListItem === void 0 ? void 0 : readingListItem.user.toString()) !== user) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized user');
    }
    const result = yield readingList_model_1.ReadingList.findByIdAndRemove(readingListItem.id);
    return result;
});
exports.default = { addToReadingListToDB, getAllReadingListFromDB, removeFromReadingList };
