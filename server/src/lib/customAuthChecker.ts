import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";
import { Types } from "mongoose";
import { AuthChecker } from "type-graphql";
import configs from "../configs";
import ContextType from "../interfaces/ContextType";
import User from "../models/user.model";

export const customAuthChecker: AuthChecker<ContextType> = async (
  { context },
  rules
) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new Error("authontication most be provided");
  }
  const token = authHeader!.split("bearer ")[1];
  if (!token) {
    throw new Error("token most be [bearer token]");
  }
  let res: any;
  try {
    res = verify(token, configs.secretTokens.accessSecretToken);
    if (!res) throw new Error();
  } catch {
    throw new AuthenticationError("expicted/invalid");
  }
  if (rules.length && !rules.includes(res.userType)) return false;
  const result = await User.findById(Types.ObjectId(res._id));
  if (!result || result._id != res._id) return false;

  context.payload = res;
  return true;
};
