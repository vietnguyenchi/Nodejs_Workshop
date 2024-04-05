import dotenv from 'dotenv';

dotenv.config();

const { DB_URI, JWT_SECRET } = process.env;

export { DB_URI, JWT_SECRET }