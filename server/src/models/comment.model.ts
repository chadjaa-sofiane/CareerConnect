import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user.model";

@ObjectType()
export class Comment extends TimeStamps {
  @Field((type) => ID)
  _id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => User || ID)
  User!: Ref<User, string>;

  @prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => User || ID)
  commentOwner!: Ref<User, string>;

  @prop({ required: true })
  @Field((type) => String)
  body!: string;
}

export default getModelForClass(Comment);
