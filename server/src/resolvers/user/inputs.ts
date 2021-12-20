import { IsEmail, Length, MaxLength, MinLength } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, ID, InputType, Int, registerEnumType } from "type-graphql";
import {
  UserType,
  EmployerType,
  Gender,
  JobFileds,
  JobSekeerType,
  Provider,
  States,
} from "../../enums";

registerEnumType(UserType, { name: "UserType" });
registerEnumType(Provider, { name: "Provider" });
registerEnumType(Gender, { name: "Gender" });
registerEnumType(States, { name: "States" });
registerEnumType(JobFileds, { name: "JobFileds" });
registerEnumType(JobSekeerType, { name: "JobSekeerType" });
registerEnumType(EmployerType, { name: "EmployerType" });

@InputType()
class PhoneInput {
  @Field((type) => String)
  @MinLength(13)
  @MaxLength(13)
  number!: string;

  @Field()
  visible!: boolean;
}

@InputType()
class WorkPlaceInput {
  @Field()
  adress!: string;

  @Field()
  name!: string;

  @Field()
  type!: string;
}
@InputType()
class OrganizationInput {
  @Field()
  organizationName!: string;
  @Field()
  organizationDescription!: string;
}

@InputType()
export class EmployerInput {
  @Field((type) => EmployerType)
  employerType!: EmployerType;

  @Field({ nullable: true })
  organization?: OrganizationInput;

  @Field({ nullable: true })
  workPlace?: WorkPlaceInput;
}

@InputType()
export class JobSekeerInput {
  @Field((type) => JobSekeerType)
  type!: JobSekeerType;

  @Field((type) => [String])
  jobs!: string[];
}

@InputType()
export class RegisterInput {
  @Field((type) => UserType)
  userType!: UserType;

  @Field((type) => Provider)
  provider!: Provider;

  @Field()
  @Length(3)
  firstName!: string;

  @Field()
  @Length(3)
  lastName!: string;

  @Field({ nullable: true })
  @Length(8)
  password!: string;

  @Field((type) => Gender)
  gender!: Gender;

  @Field()
  phone!: PhoneInput;

  @Field()
  @IsEmail()
  email!: string;

  @Field({ nullable: true })
  adress?: string;

  @Field((type) => States)
  state!: States;

  @Field((type) => JobFileds)
  jobFiled!: JobFileds;

  @Field()
  borthDate!: Date;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  employer?: EmployerInput;

  @Field({ nullable: true })
  jobSekeer?: JobSekeerInput;
}

@InputType()
export class LoginInputs {
  @Field((type) => Provider)
  provider!: Provider;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(8)
  password!: string;
}

@InputType()
class WorkTimeRangeFilter {
  @Field({ nullable: true })
  start?: number;

  @Field({ nullable: true })
  finish?: number;
}

@InputType()
class SalaryRangeFilter {
  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  amountLessThan?: number;

  @Field({ nullable: true })
  amountMoreThan?: number;
}

@InputType()
class JobsNeededFilter {
  @Field(() => WorkTimeRangeFilter, { nullable: true })
  workTimeRange?: WorkTimeRangeFilter;

  @Field(() => Int, { nullable: true })
  workHoursLessThan?: number;

  @Field(() => Int, { nullable: true })
  workHoursMoreThan?: number;

  @Field(() => SalaryRangeFilter, { nullable: true })
  salaryRange?: SalaryRangeFilter;

  @Field({ nullable: true })
  job?: string;
}

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  jobsNeeded?: JobsNeededFilter;

  @Field({ nullable: true })
  jobSekeerType?: string;

  @Field(() => States, { nullable: true })
  state?: States;

  @Field({ nullable: true })
  body?: string;
}

@InputType()
export class UsersFilter {
  @Field(() => UserType, { nullable: true })
  userType?: UserType;

  @Field(() => JobFileds, { nullable: true })
  jobFiled?: JobFileds;

  @Field(() => EmployerType, { nullable: true })
  employerType?: EmployerType;

  @Field(() => JobSekeerType, { nullable: true })
  jobSekeerType?: JobSekeerType;

  @Field(() => String, { nullable: true })
  job?: string;
}

@InputType()
export class createBlog {
  @Field()
  title!: string;

  @Field()
  body!: string;

  @Field(() => GraphQLUpload)
  Image!: FileUpload;
}
