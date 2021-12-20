import "reflect-metadata";
import mongoose from "mongoose";
import { buildSchema, BuildSchemaOptions } from "type-graphql";
import resolvers from "./resolvers";
import { json, urlencoded } from "express";
import cors from "cors";
import config from "./configs";
import { ApolloServer } from "apollo-server-express";
import expressApp from "./expressApp";
import connectionString from "./configs/db";
import { customAuthChecker } from "./lib/customAuthChecker";
import { graphqlUploadExpress } from "graphql-upload";

(async () => {
  const { port, env } = config;
  await mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connection with database successfuly "))
    .catch(() => console.log("connection with database failed !!"));

  const schemaOption: BuildSchemaOptions = {
    resolvers,
    authChecker: customAuthChecker,
  };

  const App: any = new expressApp({
    port: port,
    middleWares: [
      json(),
      urlencoded({ extended: true }),
      cors(),
      graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    ],
  });
  const apolloServer = new ApolloServer({
    uploads: false,
    schema: await buildSchema(schemaOption),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  apolloServer.applyMiddleware(App);
  (env === "development" || env === "production") && App.listen();
})();
