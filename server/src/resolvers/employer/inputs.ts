import { Max, IsMongoId } from "class-validator";
import { InputType, Field, registerEnumType, ID, Float } from "type-graphql";
import { JobSekeerType, States } from "../../enums";

registerEnumType(JobSekeerType, { name: "JobSekeerType" });
registerEnumType(States, { name: "States" });

@InputType()
class workTimeRangeInput {
  @Field()
  start!: number;

  @Field()
  finish!: number;
}

@InputType()
class SalaryRangeInput {
  @Field()
  currency!: string;

  @Field()
  amount!: number;
}

@InputType()
class JobsNeededInput {
  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  job!: string;

  @Field({ nullable: true })
  workTimeRange?: workTimeRangeInput;

  @Field({ nullable: true })
  @Max(24)
  workHours?: number;

  @Field({ nullable: true })
  number?: number;

  @Field((type) => SalaryRangeInput, { nullable: true })
  salaryRange?: SalaryRangeInput;
}

@InputType()
export class PostApplicationRequestInputs {
  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field(() => States)
  state!: States;

  @Field((type) => JobSekeerType)
  jobSekeerType!: JobSekeerType;

  @Field((type) => [JobsNeededInput], { nullable: true })
  jobsNeeded?: JobsNeededInput[];
}
@InputType()
export class UpdatePostInput {
  @Field((type) => ID)
  @IsMongoId()
  postId!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;

  @Field((type) => JobSekeerType, { nullable: true })
  jobSekeerType?: JobSekeerType;

  @Field((type) => [JobsNeededInput], { nullable: true })
  jobsNeeded?: JobsNeededInput[];
}
