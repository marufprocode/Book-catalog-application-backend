"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = __importDefault(require("./cow.controller"));
const validateReqZodMiddleware_1 = __importDefault(require("../../middlewares/validateReqZodMiddleware"));
const cow_validation_1 = __importDefault(require("./cow.validation"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const usersEnum_1 = require("../../../shared/enums/usersEnum");
const router = express_1.default.Router();
// Cow routes
router.post('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.SELLER), (0, validateReqZodMiddleware_1.default)(cow_validation_1.default.createCowZodSchema), cow_controller_1.default.createCow);
router.get('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.SELLER, usersEnum_1.ENUM_USER_ROLE.BUYER, usersEnum_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.default.getAllCows);
router.get('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.SELLER, usersEnum_1.ENUM_USER_ROLE.BUYER, usersEnum_1.ENUM_USER_ROLE.ADMIN), cow_controller_1.default.getSingleCow);
router.delete('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.SELLER), cow_controller_1.default.deleteCow);
router.patch('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.SELLER), (0, validateReqZodMiddleware_1.default)(cow_validation_1.default.updateCowZodSchema), cow_controller_1.default.updateCow);
exports.default = router;
