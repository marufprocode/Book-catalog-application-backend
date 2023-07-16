"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const book_controller_1 = __importDefault(require("./book.controller"));
const router = express_1.default.Router();
//Book Routes
router.post('/create', (0, checkAuth_1.default)(), book_controller_1.default.createBook);
router.get('/', book_controller_1.default.getAllBooks);
router.get('/:id', book_controller_1.default.getSingleBook);
router.delete('/:id', (0, checkAuth_1.default)(), book_controller_1.default.deleteBook);
router.patch('/:id', (0, checkAuth_1.default)(), book_controller_1.default.updateBook);
exports.default = router;
