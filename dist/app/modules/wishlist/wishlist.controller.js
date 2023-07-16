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
const catchAsync_1 = __importDefault(require("../../../shared/HOF/catchAsync"));
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const http_status_1 = __importDefault(require("http-status"));
const wishlist_service_1 = __importDefault(require("./wishlist.service"));
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const addToWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, you are not authorized to add wishlist items');
    }
    const { book } = req.body;
    const data = { book, user: req.user.userId };
    const result = yield wishlist_service_1.default.addWishListToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Added to wishlist successfully',
        data: result,
    });
}));
const getAllWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, you are not authorized');
    }
    const result = yield wishlist_service_1.default.getAllWishListFromDB(req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrived successfully',
        data: result,
    });
}));
const deleteFromWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, user is not authorized');
    }
    const result = yield wishlist_service_1.default.deleteWishListFromDB(id, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Book removed from wishlist successfully!' : `No Book found with id: ${id}`}`,
        data: result,
    });
}));
exports.default = {
    addToWishList,
    getAllWishList,
    deleteFromWishList,
};
