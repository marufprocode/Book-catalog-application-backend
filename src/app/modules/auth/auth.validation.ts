import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z
    .object({
      role: z.string({
        required_error: 'Role is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
      phoneNumber: z.string({
        required_error: 'Phone number is required',
      }),
      name: z.object(
        {
          firstName: z.string({
            required_error: 'First name is required',
          }),
          lastName: z.string({
            required_error: 'Last name is required',
          }),
        },
        { required_error: 'Name name is required' }
      ),
      address: z.string({
        required_error: 'Address is required',
      }),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .catchall(
      z
        .unknown()
        .refine(() => false, {
          message: 'Zod Validation Failed: Invalid body data, please see api documentation',
        })
    ),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'PhoneNumber is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});


export default {
  createCowZodSchema, loginZodSchema, refreshTokenZodSchema
};
