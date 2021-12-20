import { prop } from "@typegoose/typegoose";
import { Field ,ObjectType} from "type-graphql";

@ObjectType()
export default class JobSekeerInformation {
  @prop({ required: true })
  @Field()
  type!: string;

  @prop({ required: true, type: () => String })
  @Field((type) => [String])
  jobs!: string[];
}


