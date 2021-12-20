import { employerType } from "../enums";
import UserI from "./userI";


interface employerI extends UserI {
  employerType: employerType;
  propertyType: string;
  workPlace: {
    adress: string;
    name: string;
    type: string;
  };
}

export default employerI;
