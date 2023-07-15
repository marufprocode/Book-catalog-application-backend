"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateReqZodMiddleware_1 = __importDefault(require("../../middlewares/validateReqZodMiddleware"));
const auth_validation_1 = __importDefault(require("./auth.validation"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post('/signup', (0, validateReqZodMiddleware_1.default)(auth_validation_1.default.createCowZodSchema), auth_controller_1.default.createUser);
router.post('/login', (0, validateReqZodMiddleware_1.default)(auth_validation_1.default.loginZodSchema), auth_controller_1.default.loginUser);
router.post('/refresh-token', (0, validateReqZodMiddleware_1.default)(auth_validation_1.default.refreshTokenZodSchema), auth_controller_1.default.refreshToken);
exports.default = router;
