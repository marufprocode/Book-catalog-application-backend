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
const users_model_1 = require("../users/users.model");
const jwtHelpers_1 = require("../../../shared/helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = require("../admin/admin.model");
const createUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield users_model_1.User.create(user);
    if (!createdUser) {
        throw new errors_apiError_1.default(400, 'Failed to create user');
    }
    return createdUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isUserExist = yield users_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password && !(yield users_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new errors_apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new errors_apiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId, role } = verifiedToken;
    // checking deleted user's refresh token
    let isUserExist;
    if (role === 'admin') {
        isUserExist = yield admin_model_1.Admin.findById(userId, { id: 1, role: 1 });
    }
    else {
        isUserExist = yield users_model_1.User.findById(userId, { id: 1, role: 1 });
    }
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.default = { createUserToDB, loginUser, refreshToken };
