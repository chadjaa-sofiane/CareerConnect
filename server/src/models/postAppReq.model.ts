import { getModelForClass, prop, Prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { JobSekeerType, States } from "../enums";
import { User } from "./user.model";

registerEnumType(JobSekeerType, { name: "JobSekeerType" });
registerEnumType(States, { name: "States" });

@ObjectType()
class WorkTimeRange {
  @Prop({
    validate: {
      validator: (n) => n <= 24 && n >= 0,
      message: "time most be between 0 and 24",
    },
  })
  @Field({ nullable: true })
  start!: number;

  @Prop({
    validate: {
      validator: (n) => n <= 24 && n >= 0,
      message: "time most be between 0 and 24",
    },
  })
  @Field({ nullable: true })
  finish!: number;
}

@ObjectType()
class SalaryRange {
  @Prop({ required: true })
  @Field({ nullable: true })
  currency!: string;

  @Prop({ required: true })
  @Field({ nullable: true })
  amount!: number;
}

@ObjectType()
class JobsNeeded {
  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ required: true })
  @Field({ nullable: true })
  job!: string;

  @Prop({ type: () => WorkTimeRange })
  @Field((type) => WorkTimeRange, { nullable: true })
  workTimeRange!: WorkTimeRange;

  @Prop({ default: 0 })
  @Field({ nullable: true })
  workHours?: number;

  @Prop()
  @Field({ nullable: true })
  number?: number;

  @Prop({ type: () => SalaryRange })
  @Field(() => SalaryRange, { nullable: true })
  salaryRange?: SalaryRange;
}

@ObjectType()
class Request extends TimeStamps {
  @Field((type) => ID)
  _id!: string;

  @prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => User || ID)
  jobSekeer!: Ref<User, string>;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Prop({ default: "" })
  @Field()
  body!: String;
}

@ObjectType()
export class PostApplicationRequest extends TimeStamps {
  @Field((type) => ID)
  _id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Prop({ required: true })
  @Field()
  title!: string;

  @Prop({ required: true })
  @Field(() => States)
  state!: States;

  @Prop({ required: true })
  @Field()
  body!: string;

  @prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => User || ID)
  employer!: Ref<User, string>;

  @Prop()
  @Field((type) => JobSekeerType)
  jobSekeerType!: JobSekeerType;

  @Prop({ default: false })
  @Field()
  close!: boolean;

  @Prop({ type: () => JobsNeeded })
  @Field((type) => [JobsNeeded])
  jobsNeeded?: JobsNeeded[];

  @Prop({ type: () => Request })
  @Field((type) => [Request])
  requests?: Request[];
}

export default getModelForClass(PostApplicationRequest);
