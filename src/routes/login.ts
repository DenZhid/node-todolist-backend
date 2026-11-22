import { Router } from "express";
import { createTokenForLogin } from "../auth/token.js";
import { config } from "../config.js";
import { AppError } from "../errors.js";

export const loginRouter = Router();

function parseLogin(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    throw new AppError(400, "login is required");
  }
  if (Array.isArray(value) || typeof value !== "string") {
    throw new AppError(400, "login must be a string");
  }
  const login = value.trim();
  if (!login) {
    throw new AppError(400, "login is required");
  }
  return login;
}

loginRouter.get("/", (req, res) => {
  const login = parseLogin(req.query.login);

  if (login !== config.userLogin) {
    throw new AppError(401, "Unauthorized");
  }

  const token = createTokenForLogin(login);
  res.type("text/plain").send(token);
});
