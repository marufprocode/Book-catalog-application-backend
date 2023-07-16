"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingList = void 0;
const mongoose_1 = require("mongoose");
const readingList_interface_1 = require("./readingList.interface");
const readingListSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(readingList_interface_1.READING_STATUS),
            required: true,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ReadingList = (0, mongoose_1.model)('Readinglist', readingListSchema);
