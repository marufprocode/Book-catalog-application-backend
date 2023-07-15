"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const orders_model_1 = require("./orders.model");
const users_model_1 = require("../users/users.model");
const cow_model_1 = require("../cow/cow.model");
const http_status_1 = __importDefault(require("http-status"));
const createOrderToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield users_model_1.User.findById(data.buyer);
    const cow = yield cow_model_1.Cow.findById(data.cow);
    let newOrderResult = null;
    if (cow === null || buyer === null) {
        throw new errors_apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to retrieve buyer or cow');
    }
    else if (cow.price > buyer.budget) {
        throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer does not have enough money to buy this cow');
    }
    else if (cow.label === 'sold out') {
        throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'This cow has been sold out');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const seller = yield users_model_1.User.findById(cow.seller);
        if (seller === null) {
            throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'Seller is not valid');
        }
        const cowPrice = cow.price;
        const buyerBudget = buyer.budget - cowPrice;
        const sellerIncome = seller.income + cowPrice;
        const updatedCow = yield cow_model_1.Cow.findByIdAndUpdate(cow.id, { label: 'sold out' }, { new: true, session });
        const updatedSeller = yield users_model_1.User.findByIdAndUpdate(cow.seller, { income: sellerIncome }, { new: true, session });
        const updatedBuyer = yield users_model_1.User.findByIdAndUpdate(buyer.id, { budget: buyerBudget }, { new: true, session });
        if (!updatedCow || !updatedSeller || !updatedBuyer) {
            throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to proceed order');
        }
        const result = yield orders_model_1.Order.create([data], { new: true, session });
        if (!result || result.length === 0) {
            throw new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to proceed order');
        }
        newOrderResult = result[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newOrderResult;
});
const getAllOrdersFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const orders = yield orders_model_1.Order.find({}).populate([{ path: 'cow' }, { path: 'buyer' }]);
        return orders;
    }
    else if (user.role === 'buyer') {
        const orders = yield orders_model_1.Order.find({ buyer: user.userId }).populate([
            { path: 'cow' },
            { path: 'buyer' },
        ]);
        return orders;
    }
    else if (user.role === 'seller') {
        const filteredOrders = yield orders_model_1.Order.aggregate([
            {
                $lookup: {
                    from: 'cows',
                    localField: 'cow',
                    foreignField: '_id',
                    as: 'cow',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyer',
                },
            },
            {
                $match: {
                    'cow.seller': new mongoose_1.default.Types.ObjectId(user.userId),
                },
            },
        ]);
        return filteredOrders;
    }
    else {
        return null;
    }
});
const getSingleOrderFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield orders_model_1.Order.findById(id).populate([{ path: 'cow' }, { path: 'buyer' }]);
        return result;
    }
    else if (user.role === 'buyer') {
        const orders = yield orders_model_1.Order.findOne({ buyer: user.userId }).populate([
            { path: 'cow' },
            { path: 'buyer' },
        ]);
        return orders;
    }
    else if (user.role === 'seller') {
        const orders = yield orders_model_1.Order.findOne({ buyer: user.userId }).populate([
            { path: 'cow', match: { seller: user.userId } },
            { path: 'buyer' },
        ]);
        return orders;
    }
    else {
        return null;
    }
});
exports.default = { createOrderToDB, getAllOrdersFromDB, getSingleOrderFromDB };
