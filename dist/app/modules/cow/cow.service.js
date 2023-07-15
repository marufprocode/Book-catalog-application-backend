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
const getSearchAndFiltersCondition_1 = require("../../../shared/helpers/getSearchAndFiltersCondition");
const cow_constants_1 = require("./cow.constants");
const cow_model_1 = require("./cow.model");
const createNewCowToDB = (cowData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCow = yield cow_model_1.Cow.create(cowData);
    if (!createdCow) {
        throw new errors_apiError_1.default(400, 'Failed to create cow data');
    }
    return createdCow;
});
const getAllCowsFromDB = (searchAndFilters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sort } = paginationOptions;
    const conditions = (0, getSearchAndFiltersCondition_1.getSearchAndFiltersCondition)(searchAndFilters, cow_constants_1.cowsSearchableFields);
    const cows = yield cow_model_1.Cow.find(conditions).sort(sort).skip(skip).limit(limit);
    return {
        meta: {
            page,
            limit,
        },
        data: cows,
    };
});
const getSingleCowFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id);
    return result;
});
const deleteCowFromDB = (id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedSeller = yield cow_model_1.Cow.exists({ _id: id, seller: sellerId });
    if (!verifiedSeller) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized seller');
    }
    const result = yield cow_model_1.Cow.findByIdAndRemove(id);
    return result;
});
const updateCowToDB = (id, data, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedSeller = yield cow_model_1.Cow.exists({ _id: id, seller: sellerId });
    if (!verifiedSeller) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized seller');
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
    return result;
});
exports.default = {
    createNewCowToDB,
    getAllCowsFromDB,
    getSingleCowFromDB,
    deleteCowFromDB,
    updateCowToDB,
};
