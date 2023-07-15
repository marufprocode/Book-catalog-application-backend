"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./users.controller"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const usersEnum_1 = require("../../../shared/enums/usersEnum");
const router = express_1.default.Router();
router.get('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.getAllUsers);
router.get('/my-profile', (0, checkAuth_1.default)(), users_controller_1.default.getMyProfile);
router.patch('/my-profile', (0, checkAuth_1.default)(), users_controller_1.default.updateMyProfile);
router.get('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.getSignleUsers);
router.patch('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.updateUser);
router.delete('/:id', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN), users_controller_1.default.deleteUser);
exports.default = router;
