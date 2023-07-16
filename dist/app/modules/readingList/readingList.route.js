"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readingList_controller_1 = __importDefault(require("./readingList.controller"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const router = express_1.default.Router();
//Book Routes
router.patch('/', (0, checkAuth_1.default)(), readingList_controller_1.default.addToReadingList);
router.get('/', (0, checkAuth_1.default)(), readingList_controller_1.default.getAllReadingList);
router.delete('/:id', (0, checkAuth_1.default)(), readingList_controller_1.default.deleteFromReadingList);
exports.default = router;
