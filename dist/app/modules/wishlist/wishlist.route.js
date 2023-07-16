"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const wishlist_controller_1 = __importDefault(require("./wishlist.controller"));
const router = express_1.default.Router();
//Book Routes
router.post('/', (0, checkAuth_1.default)(), wishlist_controller_1.default.addToWishList);
router.get('/', (0, checkAuth_1.default)(), wishlist_controller_1.default.getAllWishList);
router.delete('/:id', (0, checkAuth_1.default)(), wishlist_controller_1.default.deleteFromWishList);
exports.default = router;
