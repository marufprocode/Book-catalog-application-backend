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
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = require("../admin/admin.model");
const users_model_1 = require("./users.model");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find({});
    return users;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(id);
    return user;
});
const getMyProfileFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield admin_model_1.Admin.findOne({ _id: user.userId, role: user.role });
        return result;
    }
    else {
        const result = yield users_model_1.User.findOne({ _id: user.userId, role: user.role });
        return result;
    }
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findByIdAndRemove(id);
    return user;
});
const updateUserToDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return result;
});
const updateMyProfileToDB = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield admin_model_1.Admin.findByIdAndUpdate(user.userId, data, { new: true, runValidators: true }).lean();
        return result;
    }
    else {
        const result = yield users_model_1.User.findByIdAndUpdate(user.userId, data, { new: true, runValidators: true }).lean();
        return result;
    }
});
exports.default = {
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserToDB,
    getMyProfileFromDB,
    updateMyProfileToDB,
};
