import { createHmac, timingSafeEqual } from "node:crypto";
import { config } from "../config.js";

export function createTokenForLogin(login: string): string {
  return createHmac("sha256", config.authSecret).update(login).digest("hex");
}

export function isValidAccessToken(token: string): boolean {
  const expected = createTokenForLogin(config.userLogin);
  const provided = Buffer.from(token);
  const expectedBuf = Buffer.from(expected);

  if (provided.length !== expectedBuf.length) {
    return false;
  }

  return timingSafeEqual(provided, expectedBuf);
}
