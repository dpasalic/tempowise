import { Pool } from "pg";

let pool: any;

if (!pool) {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_SSL
  } = process.env;

  pool = new Pool({
    // user: DB_USER,
    // password: DB_PASSWORD,
    // host: DB_HOST,
    // database: DB_NAME,
    // port: 26257,
    connectionString: process.env.DB_CONNECTION
  });
}

export default pool;