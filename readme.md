# Digital Cow Hut Auth Backend API Documentation

This repository contains the backend code for an Online Cow Selling platform, developed using TypeScript, Express.js, and Mongoose. The API provides various routes to perform CRUD operations on users, cows, and orders. Additionally, it includes error handling, pagination, filtering, and a transactional operation for buying cows.

## Technology Stack

- TypeScript
- Express.js
- Mongoose

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-marufprocode
   ```

## Live Link: https://cow-hat-auth-tau.vercel.app

### Application Routes:

#### Auth (User)

Route: https://cow-hat-auth-tau.vercel.app/api/v1/auth/login (POST) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/auth/signup (POST) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/auth/refresh-token (POST)  [OK]

#### Auth (Admin)

Route: https://cow-hat-auth-tau.vercel.app/api/v1/admins/create-admin (POST) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/admins/login (POST) [OK]

#### User

Route: https://cow-hat-auth-tau.vercel.app/api/v1/users (GET) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/users/64a2ffb21b344a522a37d24d (Single-GET)[OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/users/64a2ffb21b344a522a37d24d (PATCH) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/users/64a2ffb21b344a522a37d24d (DELETE) [OK]

#### Cows

Route: https://cow-hat-auth-tau.vercel.app/api/v1/cows (POST) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/cows (GET) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/cows/64a3044d1b344a522a37d25e (Single GET) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/cows/64a3044d1b344a522a37d25e (PATCH) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/cows/64a3044d1b344a522a37d25e (DELETE) [OK]

#### Orders

Route: https://cow-hat-auth-tau.vercel.app/api/v1/orders (POST) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/orders (GET) [OK]

### Bonus Part

#### Admin
Route: https://cow-hat-auth-tau.vercel.app/api/v1/admins/create-admin (POST) [OK]

#### My Profile
Route: https://cow-hat-auth-tau.vercel.app/api/v1/users/my-profile (GET) [OK]
Route: https://cow-hat-auth-tau.vercel.app/api/v1/users/my-profile (PATCH) [OK]
#### Order:
Route: https://cow-hat-auth-tau.vercel.app/api/v1/orders/64a30704c667c38fb0f263a1 (GET) [OK]
