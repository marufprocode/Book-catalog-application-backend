"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = __importDefault(require("./orders.controller"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const usersEnum_1 = require("../../../shared/enums/usersEnum");
const router = express_1.default.Router();
router.post('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.BUYER), orders_controller_1.default.createOrder);
router.get('/', (0, checkAuth_1.default)(usersEnum_1.ENUM_USER_ROLE.ADMIN, usersEnum_1.ENUM_USER_ROLE.BUYER, usersEnum_1.ENUM_USER_ROLE.SELLER), orders_controller_1.default.getAllOrders);
router.get('/:id', (0, checkAuth_1.default)(), orders_controller_1.default.getSingleOrder);
exports.default = router;
