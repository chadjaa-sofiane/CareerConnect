import { Request, Response } from "express";

interface ContextType {
  req: Request;
  res: Response;
  payload: {
    userType: string;
    _id: string;
  };
}
export default ContextType;
