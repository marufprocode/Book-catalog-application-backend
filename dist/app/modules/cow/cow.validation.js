"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const cow_interface_1 = require("./cow.interface");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum(Object.values(cow_interface_1.Location), {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum(Object.values(cow_interface_1.Breed), {
            required_error: 'Breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Weight is required',
        }),
        label: zod_1.z.enum(Object.values(cow_interface_1.Label)).optional(),
        category: zod_1.z.enum(Object.values(cow_interface_1.Category), {
            required_error: 'Category is required',
        }),
        seller: zod_1.z.string({
            required_error: 'Seller is required',
        }),
    })
        .catchall(zod_1.z
        .unknown()
        .refine(() => false, {
        message: 'Zod Validation Failed: Invalid body data, please see cow creation API documentation',
    })),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum(Object.values(cow_interface_1.Location)).optional(),
        breed: zod_1.z.enum(Object.values(cow_interface_1.Breed)).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum(Object.values(cow_interface_1.Label)).optional(),
        category: zod_1.z.enum(Object.values(cow_interface_1.Category)).optional(),
        seller: zod_1.z.string().optional(),
    })
        .catchall(zod_1.z
        .unknown()
        .refine(() => false, {
        message: 'Zod Validation Failed: Invalid data, please see cow creation API documentation',
    })),
});
exports.default = { createCowZodSchema, updateCowZodSchema };
