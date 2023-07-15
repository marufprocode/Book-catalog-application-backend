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
const cow_service_1 = __importDefault(require("./cow.service"));
const sendResponse_1 = __importDefault(require("../../../shared/utilities/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pickKeys_1 = __importDefault(require("../../../shared/utilities/pickKeys"));
const pagination_constants_1 = require("../../../shared/constants/pagination.constants");
const paginationHelper_1 = require("../../../shared/helpers/paginationHelper");
const cow_constants_1 = require("./cow.constants");
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const result = yield cow_service_1.default.createNewCowToDB(cowData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Cow created successfully',
        data: result,
    });
}));
const getAllCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pickKeys_1.default)(req.query, pagination_constants_1.paginationFields);
    const formattedPaginationOptions = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const searchAndFilters = (0, pickKeys_1.default)(req.query, cow_constants_1.cowsSearchAndFiltersFields);
    const { meta, data } = yield cow_service_1.default.getAllCowsFromDB(searchAndFilters, formattedPaginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cows retrieved successfully',
        meta,
        data,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.default.getSingleCowFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Cow retrieved successfully !' : `No Cow found with id: ${id}`}`,
        data: result,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, seller is not authorized');
    }
    const result = yield cow_service_1.default.deleteCowFromDB(id, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Cow deleted successfully!' : `No Cow found with id: ${id}`}`,
        data: result,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.user) {
        return new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden access, seller is not authorized');
    }
    const result = yield cow_service_1.default.updateCowToDB(id, req.body, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${result ? 'Cow updated successfully !' : `No Cow found with id: ${id}`}`,
        data: result,
    });
}));
exports.default = { createCow, getAllCows, getSingleCow, deleteCow, updateCow };
