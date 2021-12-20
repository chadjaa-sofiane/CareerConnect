import { AuthenticationError } from "apollo-server-express";
import { sign, verify } from "jsonwebtoken";
import configs from "../configs";

interface tokenPayloadI {
  _id: string;
  userType: string;
}

export const createTokens = ({ _id, userType }: tokenPayloadI) => {
  const {
    secretTokens: { accessSecretToken, refreshSecretToken },
  } = configs;

  if (!accessSecretToken || !refreshSecretToken)
    throw new Error("secret tokens most be provided");

  const accessToken = sign({ _id, userType }, accessSecretToken);

  const refreshToken = sign({ _id, userType }, refreshSecretToken);

  return [accessToken, refreshToken];
};

export const getNewAccessToken = (refreshToken: string) => {
  const {
    secretTokens: { accessSecretToken, refreshSecretToken },
  } = configs;
  let newAccessToken: string = "";
  verify(refreshToken, refreshSecretToken, (err: any, res: any) => {
    if (err || !res) throw new AuthenticationError("expicted/invalid");
    delete res.iat;
    try {
      newAccessToken = sign(res, accessSecretToken);
    } catch (e:any) {
      throw new Error(e.message);
    }
  });
  return newAccessToken;
};
