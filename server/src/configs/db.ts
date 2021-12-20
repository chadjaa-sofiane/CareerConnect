import dotenv from "dotenv";
dotenv.config();

const env: string = process.env.NODE_ENV || "development";

const production = {
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};
const development = {
  dbName: "devolopment",
};
const test = {
  dbName: "test",
};

const databaseconfig: any = {
  production,
  development,
  test,
};
const { username, password, dbName } = databaseconfig[env];
const dbPort = process.env.DB_PORT || 27017;

const connectionString =
  env === "production"
    ? `mongodb+srv://${username}:${password}@cluster0.fzfqc.mongodb.net/${dbName}?retryWrites=true&w=majority`
    : `mongodb://127.0.0.1:${dbPort}/${dbName}`;

export default connectionString;
