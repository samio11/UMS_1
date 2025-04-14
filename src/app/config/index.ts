import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database: process.env.DATABASE,
  default_password: process.env.DEFAULT_PASS,
  bcrypt_salt: process.env.BCRYPT_SALT,
  NODE_ENV: process.env.NODE_ENV,
};
