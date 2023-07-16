"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchAndFiltersCondition = void 0;
const getSearchAndFiltersCondition = (options, searchableFields) => {
    const { search } = options, filters = __rest(options, ["search"]);
    const conditions = [];
    if (search) {
        conditions.push({
            $or: searchableFields.map(field => ({
                [field]: {
                    $regex: search,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filters).length) {
        const filterConditions = {};
        Object.entries(filters).forEach(([field, value]) => {
            // if (field === 'publicationYear') {
            //   filterConditions[field] = value;
            // } else{
            //   filterConditions[field] = {
            //     $regex: value,
            //     $options: 'i',
            //   };
            // }  
            filterConditions[field] = value;
        });
        if (Object.keys(filterConditions).length) {
            conditions.push({
                $and: [filterConditions],
            });
        }
    }
    return conditions.length > 0 ? { $and: conditions } : {};
};
exports.getSearchAndFiltersCondition = getSearchAndFiltersCondition;
