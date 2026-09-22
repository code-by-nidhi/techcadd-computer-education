import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

// Simple "a + b = ?" check against form bots. The answer never reaches the browser: the client gets a
// token signed over (answer, expiry, nonce), and the server re-signs with the submitted answer to compare.
// Without CAPTCHA_SECRET a per-process secret is used, which is fine for a single server.
const secret = process.env.CAPTCHA_SECRET || randomBytes(32).toString("hex");
const TTL_MS = 10 * 60 * 1000;

function sign(answer: number, expires: string, nonce: string) {
  return createHmac("sha256", secret).update(`${answer}.${expires}.${nonce}`).digest("base64url");
}

export function newCaptcha() {
  const a = randomInt(1, 10);
  const b = randomInt(1, 10);
  const expires = String(Date.now() + TTL_MS);
  const nonce = randomBytes(8).toString("base64url");
  return { question: `${a} + ${b} = ?`, token: `${expires}.${nonce}.${sign(a + b, expires, nonce)}` };
}

export function checkCaptcha(token: string, answer: string) {
  const [expires, nonce, sig] = token.split(".");
  const value = Number(answer.trim());
  if (!sig || Number(expires) < Date.now() || !Number.isInteger(value)) return false;
  const expected = Buffer.from(sign(value, expires, nonce));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
