import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserType } from "../enums";
import EmployerInformation from "./employer.model";
import JobSekeerInformation from "./jobSekeer.model";

registerEnumType(UserType, { name: "UserType" });

@ObjectType()
class Phone {
  @prop({ unique: true })
  @Field()
  number!: string;

  @prop({ default: false })
  visible!: boolean;
}

@ObjectType()
class SocialMedia {
  @prop()
  @Field()
  socialMedia!: string;

  @prop()
  @Field()
  link!: string;
}

@ObjectType()
class DealWith {
  @prop({ ref: () => User, type: () => String })
  @Field((type) => User || ID)
  userId!: Ref<User, string>;

  @prop({ default: Date.now })
  dealWithAt!: Date;
}

@ObjectType()
export class User extends TimeStamps {
  @Field((type) => ID)
  _id!: string;

  @prop({ required: true })
  @Field((type) => UserType)
  userType!: UserType;

  @prop({ required: true })
  @Field()
  firstName!: string;

  @prop({ required: true })
  @Field()
  lastName!: string;

  @prop({ default: "" })
  @Field({ nullable: true })
  profileImage!: string;

  @prop()
  password?: string;

  @prop({ required: true })
  @Field()
  gender!: string;

  @prop({ default: false })
  IsActive!: boolean;

  @prop({ required: true, unique: true })
  @Field((type) => Phone)
  phone!: Phone;

  @prop({ required: true, unique: true })
  @Field()
  email!: string;

  @prop()
  @Field()
  adress?: string;

  @prop({ default: "0.0.0.0/32", type: () => String })
  @Field((type) => [String])
  ipAdrresses!: string[];

  @prop({ required: true })
  @Field()
  state!: string;

  @prop({ required: true })
  @Field()
  jobFiled!: string;

  @prop({ required: true })
  @Field()
  borthDate!: Date;

  @prop({ default: "" })
  @Field()
  description?: string;

  @prop({ type: () => SocialMedia })
  @Field((type) => [SocialMedia])
  socialMedia?: SocialMedia[];

  @prop({ type: () => DealWith })
  @Field(() => [DealWith])
  dealWith?: DealWith[];

  @prop()
  @Field({ nullable: true })
  jobSekeer!: JobSekeerInformation;

  @prop()
  @Field({ nullable: true })
  employer!: EmployerInformation;
}

export default getModelForClass(User);
