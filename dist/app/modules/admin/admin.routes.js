"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("./admin.controller"));
const validateReqZodMiddleware_1 = __importDefault(require("../../middlewares/validateReqZodMiddleware"));
const admin_validation_1 = __importDefault(require("./admin.validation"));
const router = express_1.default.Router();
router.post('/create-admin', (0, validateReqZodMiddleware_1.default)(admin_validation_1.default.createAdminZodSchema), admin_controller_1.default.createAdmin);
router.post('/login', (0, validateReqZodMiddleware_1.default)(admin_validation_1.default.loginAdminZodSchema), admin_controller_1.default.loginAdmin);
exports.default = router;
