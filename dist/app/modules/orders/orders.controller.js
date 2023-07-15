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
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const orders_service_1 = __importDefault(require("./orders.service"));
const http_status_1 = __importDefault(require("http-status"));
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield orders_service_1.default.createOrderToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: `${result ? 'Order created successfully' : 'Some error occurred! no order was created!'}`,
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, seller is not authorized');
    }
    const result = yield orders_service_1.default.getAllOrdersFromDB(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, seller is not authorized');
    }
    const id = req.params.id;
    const result = yield orders_service_1.default.getSingleOrderFromDB(id, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Cow retrieved successfully !' : `No Cow found with id: ${id}`}`,
        data: result,
    });
}));
exports.default = { createOrder, getAllOrders, getSingleOrder };
