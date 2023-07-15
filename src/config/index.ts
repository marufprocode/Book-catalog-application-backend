import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongo_url: process.env.MONGO_URL as string,
  bycrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
  jwt:{
    secret: process.env.JWT_SECRET as Secret,
    expires_in: process.env.JWT_EXPIRES_IN as string,
    refresh_secret: process.env.JWT_REFRESH_SECRET as Secret,
    refresh_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN as string
  }
};
