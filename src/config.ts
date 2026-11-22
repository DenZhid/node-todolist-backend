import "dotenv/config";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: required("DATABASE_URL"),
  authSecret: required("AUTH_SECRET"),
  userLogin: required("USER_LOGIN"),
  userFullName: required("USER_NAME"),
};
