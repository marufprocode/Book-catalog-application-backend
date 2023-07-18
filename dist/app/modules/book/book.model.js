"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    image: { type: String, required: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    reviews: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
            name: { type: String, required: true },
            review: { type: String, required: true },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Book Model
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
