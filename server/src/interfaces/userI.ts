import { Document } from "mongoose";
import { gender, state } from "../enums";

interface userI extends Document {
  firstName: string;
  lastName: string;
  gender: gender;
  createdAt: Date;
  phone: {
    number: number;
    visible: boolean;
  };
  email: string;
  adresse?: string;
  ipAdresses: [{ ip: string }];
  state: state;
  borthDate: Date;
  shocialMedia: [
    {
      shocialMediaName: string;
      link: string;
    }
  ];
  dealtWith: [
    {
      userId: String;
      dealAt: Date;
    }
  ];
  description?: string;
}

export default userI;
