"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }, { required_error: 'Name name is required' }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        })
    })
        .catchall(zod_1.z
        .unknown()
        .refine(() => false, {
        message: 'Zod Validation Failed: Invalid body data, please see api documentation',
    })),
});
const loginAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'PhoneNumber is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.default = {
    createAdminZodSchema, loginAdminZodSchema
};
