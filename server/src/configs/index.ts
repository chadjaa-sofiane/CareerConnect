import dotenv from "dotenv";
import normalizePort from "../lib/normalizePort";
dotenv.config();
const env: string = process.env.NODE_ENV || "development";
const port = normalizePort(process.env.PORT || 3000);
const common = {};
const production = {
  port,
  secretTokens: {
    accessSecretToken: process.env.ACCESS_SECRET_TOKEN,
    refreshSecretToken: process.env.REFRESH_SECRET_TOKEN,
  },
};
const development = {
  port: 5000,
  secretTokens: {
    accessSecretToken: "SECRET_TOKEN",
    refreshSecretToken: "SECRET_REFRESH_TOKEN",
  },
};
const test = {
  port: 5000,
  secretTokens: {
    accessSecretToken: "SECRET_TOKEN",
    refreshSecretToken: "SECRET_REFRESH_TOKEN",
  },
};
const config: any = {
  production,
  development,
  test,
};

export default { env, ...common, ...config[env] };
