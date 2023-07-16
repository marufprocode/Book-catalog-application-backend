"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./users.controller"));
const router = express_1.default.Router();
router.post('/signup', users_controller_1.default.createUser);
router.post('/login', users_controller_1.default.loginUser);
router.get('/refresh-token', users_controller_1.default.refreshToken);
exports.default = router;
