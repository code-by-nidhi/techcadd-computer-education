import mysql from "mysql2/promise";

// Server-only. Connection details come from .env.local (see .env.example).
// The pool is kept on globalThis so dev hot-reloads reuse it instead of opening new connections.
const cache = globalThis as unknown as { mysqlPool?: mysql.Pool; demoTableReady?: Promise<unknown> };

const pool = (cache.mysqlPool ??= mysql.createPool({
  host: process.env.MYSQL_HOST ?? "localhost",
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
}));

// Created on first use, so a fresh database needs no manual table setup.
const createDemoTable = `
  CREATE TABLE IF NOT EXISTS demo_requests (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course VARCHAR(120) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL,
    source_page VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

export type DemoRequest = { course: string; name: string; phone: string; page: string };

export async function saveDemoRequest(req: DemoRequest) {
  cache.demoTableReady ??= pool.query(createDemoTable);
  try {
    await cache.demoTableReady;
  } catch (err) {
    cache.demoTableReady = undefined; // retry table setup on the next request
    throw err;
  }
  await pool.execute(
    "INSERT INTO demo_requests (course, full_name, phone, source_page) VALUES (?, ?, ?, ?)",
    [req.course, req.name, req.phone, req.page || null]
  );
}
