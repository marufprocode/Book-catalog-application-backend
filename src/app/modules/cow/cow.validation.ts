import { z } from 'zod';
import { Breed, Category, Label, Location } from './cow.interface';

const createCowZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      age: z.number({
        required_error: 'Age is required',
      }),
      price: z.number({
        required_error: 'Price is required',
      }),
      location: z.enum(Object.values(Location) as [string, ...string[]], {
        required_error: 'Location is required',
      }),
      breed: z.enum(Object.values(Breed) as [string, ...string[]], {
        required_error: 'Breed is required',
      }),
      weight: z.number({
        required_error: 'Weight is required',
      }),
      label: z.enum(Object.values(Label) as [string, ...string[]]).optional(),
      category: z.enum(Object.values(Category) as [string, ...string[]], {
        required_error: 'Category is required',
      }),
      seller: z.string({
        required_error: 'Seller is required',
      }),
    })
    .catchall(
      z
        .unknown()
        .refine(() => false, {
          message:
            'Zod Validation Failed: Invalid body data, please see cow creation API documentation',
        })
    ),
});
const updateCowZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      age: z.number().optional(),
      price: z.number().optional(),
      location: z.enum(Object.values(Location) as [string, ...string[]]).optional(),
      breed: z.enum(Object.values(Breed) as [string, ...string[]]).optional(),
      weight: z.number().optional(),
      label: z.enum(Object.values(Label) as [string, ...string[]]).optional(),
      category: z.enum(Object.values(Category) as [string, ...string[]]).optional(),
      seller: z.string().optional(),
    })
    .catchall(
      z
        .unknown()
        .refine(() => false, {
          message:
            'Zod Validation Failed: Invalid data, please see cow creation API documentation',
        })
    ),
});

export default { createCowZodSchema, updateCowZodSchema };
