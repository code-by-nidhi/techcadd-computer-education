import mysql from "mysql2/promise";

// Server-only. Connection details come from .env.local (see .env.example).
// The pool is kept on globalThis so dev hot-reloads reuse it instead of opening new connections — keyed
// by the settings, so editing .env.local while `next dev` runs gets a fresh pool rather than a stale one.
const cache = globalThis as unknown as { mysqlPool?: mysql.Pool; mysqlKey?: string; tablesReady?: Promise<unknown> };

const config = {
  host: process.env.MYSQL_HOST ?? "localhost",
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
};
const database = process.env.MYSQL_DATABASE ?? "techcadd";

const key = JSON.stringify({ ...config, database });
if (cache.mysqlKey !== key) {
  cache.mysqlPool?.end().catch(() => {});
  cache.mysqlPool = mysql.createPool({ ...config, database, connectionLimit: 5 });
  cache.mysqlKey = key;
  cache.tablesReady = undefined;
}
const pool = cache.mysqlPool!;

// The database and both tables are created on first use, so a fresh MySQL install (e.g. XAMPP) needs
// no manual setup. demo_requests = header "Book Demo" pop-up; contact_enquiries = /contact page form.
const createTables = [
  `CREATE TABLE IF NOT EXISTS demo_requests (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course VARCHAR(120) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL,
    email VARCHAR(190) NULL,
    message VARCHAR(1000) NULL,
    source_page VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL,
    email VARCHAR(190) NULL,
    course VARCHAR(120) NOT NULL,
    message VARCHAR(1000) NULL,
    source_page VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

// email/message were added to demo_requests after it already existed on some installs — CREATE TABLE
// IF NOT EXISTS only covers fresh ones, so back-fill the columns (ignoring "already exists").
const addLaterColumns = [
  "ALTER TABLE demo_requests ADD COLUMN email VARCHAR(190) NULL AFTER phone",
  "ALTER TABLE demo_requests ADD COLUMN message VARCHAR(1000) NULL AFTER email",
];

export type Enquiry = { course: string; name: string; phone: string; email: string; message: string; page: string };

async function ensureTables() {
  const conn = await mysql.createConnection(config);
  try {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database.replace(/`/g, "")}\``);
  } finally {
    await conn.end();
  }
  for (const stmt of createTables) await pool.query(stmt);
  for (const stmt of addLaterColumns) {
    try {
      await pool.query(stmt);
    } catch (err) {
      if ((err as { code?: string }).code !== "ER_DUP_FIELDNAME") throw err;
    }
  }
}

async function ready() {
  cache.tablesReady ??= ensureTables();
  try {
    await cache.tablesReady;
  } catch (err) {
    cache.tablesReady = undefined; // retry setup on the next request
    throw err;
  }
}

export async function saveDemoRequest(req: Enquiry) {
  await ready();
  await pool.execute(
    "INSERT INTO demo_requests (course, full_name, phone, email, message, source_page) VALUES (?, ?, ?, ?, ?, ?)",
    [req.course, req.name, req.phone, req.email || null, req.message || null, req.page || null]
  );
}

export async function saveContactEnquiry(req: Enquiry) {
  await ready();
  await pool.execute(
    "INSERT INTO contact_enquiries (full_name, phone, email, course, message, source_page) VALUES (?, ?, ?, ?, ?, ?)",
    [req.name, req.phone, req.email || null, req.course, req.message || null, req.page || null]
  );
}
