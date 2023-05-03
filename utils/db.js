// just for testing sql

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export async function connect() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  });

  return connection;
}
