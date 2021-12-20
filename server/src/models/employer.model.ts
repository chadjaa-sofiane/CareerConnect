import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
class WorkPlace {
  @prop({ required: true })
  @Field()
  adress!: string;

  @prop({ required: true })
  @Field()
  name!: string;

  @prop({ required: true })
  @Field()
  type!: string;
}

@ObjectType()
class Organization {
  @prop({ required: true })
  @Field()
  organizationName!: string;

  @prop({ required: true })
  @Field()
  organizationDescription!: string;
}

@ObjectType()
export default class EmployerInformation {
  @prop({ required: true })
  @Field()
  employerType!: String;

  @prop()
  @Field((type) => WorkPlace)
  workPlace?: WorkPlace;

  @prop()
  @Field((type) => Organization)
  organization?: Organization;
}
