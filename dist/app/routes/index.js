"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("../modules/users/users.routes"));
const book_routes_1 = __importDefault(require("../modules/book/book.routes"));
const wishlist_route_1 = __importDefault(require("../modules/wishlist/wishlist.route"));
const readingList_route_1 = __importDefault(require("../modules/readingList/readingList.route"));
const router = express_1.default.Router();
const appRoutes = [
    {
        path: '/auth',
        route: users_routes_1.default,
    },
    {
        path: '/books',
        route: book_routes_1.default,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.default,
    },
    {
        path: '/readinglist',
        route: readingList_route_1.default,
    },
];
appRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
