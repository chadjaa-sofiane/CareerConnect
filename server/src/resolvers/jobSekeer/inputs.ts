import { Field, ID, InputType } from "type-graphql";

@InputType()
export class RequestInput {
  @Field(() => ID)
  PostId!: string;

  @Field()
  body!: string;
}

@InputType()
export class UpdateRequestInput extends RequestInput {
  @Field(() => ID)
  requestId!: string;
}
@InputType()
export class deleteRequestInput {
  @Field(() => ID)
  PostId!: string;

  @Field(() => ID)
  requestId!: string;
}
