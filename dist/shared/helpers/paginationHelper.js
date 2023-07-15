"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const sort = {
        [sortBy]: sortOrder,
    };
    return {
        page,
        limit,
        skip,
        sort,
    };
};
exports.calculatePagination = calculatePagination;
