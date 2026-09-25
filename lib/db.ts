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
    email VARCHAR(190) NULL,
    message VARCHAR(1000) NULL,
    source_page VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

// email/message were added after the table already existed on some installs — CREATE TABLE IF NOT
// EXISTS above only covers fresh ones, so back-fill the columns here too (ignoring "already exists"
// so this stays a no-op once a table has them).
const addLaterColumns = [
  "ALTER TABLE demo_requests ADD COLUMN email VARCHAR(190) NULL AFTER phone",
  "ALTER TABLE demo_requests ADD COLUMN message VARCHAR(1000) NULL AFTER email",
];

export type DemoRequest = { course: string; name: string; phone: string; email: string; message: string; page: string };

async function ensureDemoTable() {
  await pool.query(createDemoTable);
  for (const stmt of addLaterColumns) {
    try {
      await pool.query(stmt);
    } catch (err) {
      if ((err as { code?: string }).code !== "ER_DUP_FIELDNAME") throw err;
    }
  }
}

export async function saveDemoRequest(req: DemoRequest) {
  cache.demoTableReady ??= ensureDemoTable();
  try {
    await cache.demoTableReady;
  } catch (err) {
    cache.demoTableReady = undefined; // retry table setup on the next request
    throw err;
  }
  await pool.execute(
    "INSERT INTO demo_requests (course, full_name, phone, email, message, source_page) VALUES (?, ?, ?, ?, ?, ?)",
    [req.course, req.name, req.phone, req.email || null, req.message || null, req.page || null]
  );
}
