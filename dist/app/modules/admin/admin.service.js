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
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../shared/helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdminToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAdmin = yield admin_model_1.Admin.create(data);
    if (!createdAdmin) {
        throw new errors_apiError_1.default(400, 'Failed to create admin');
    }
    const admin = yield admin_model_1.Admin.findById(createdAdmin.id);
    return admin;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isUserExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isUserExist) {
        throw new errors_apiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    if (isUserExist.password &&
        !(yield admin_model_1.Admin.isPasswordMatched(password, isUserExist.password))) {
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
exports.default = {
    createAdminToDB, loginAdmin
};
