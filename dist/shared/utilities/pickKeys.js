"use strict";
//['page','limit','sortBy','sortOrder']
Object.defineProperty(exports, "__esModule", { value: true });
const pickKeys = (obj, keys) => {
    return keys.reduce((result, key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
        return result;
    }, {});
};
exports.default = pickKeys;
