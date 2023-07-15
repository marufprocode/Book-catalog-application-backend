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
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_interface_1 = require("./cow.interface");
const users_model_1 = require("../users/users.model");
const errors_apiError_1 = __importDefault(require("../../../errors/errors.apiError"));
const http_status_1 = __importDefault(require("http-status"));
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: Object.values(cow_interface_1.Location), required: true },
    breed: { type: String, enum: Object.values(cow_interface_1.Breed), required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: Object.values(cow_interface_1.Label), default: cow_interface_1.Label.ForSale },
    category: { type: String, enum: Object.values(cow_interface_1.Category), required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
cowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield users_model_1.User.exists({
            _id: this.seller,
            role: 'seller',
        });
        if (!isExist) {
            // Document with the same title and year already exists
            return next(new errors_apiError_1.default(http_status_1.default.BAD_REQUEST, `Seller Id is not Valid`));
        }
        // Document does not exist, proceed with the save operation
        next();
    });
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
