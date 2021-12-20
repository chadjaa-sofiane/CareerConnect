import { getModelForClass, Prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "./user.model";

@ObjectType()
class Comments {
  @Field((type) => ID)
  _id!: string;

  @Prop({ required: true })
  @Field()
  body!: String;

  @Prop({ required: true })
  @Field()
  likes!: number;
}
@ObjectType()
export class Blogs extends TimeStamps {
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
  @Field()
  body!: string;

  @Prop({ require: false })
  @Field()
  imageUrl!: string;

  @Prop({ required: false })
  @Field()
  likes!: number;

  @Prop({ required: true, ref: () => User, type: () => String })
  @Field((type) => User || ID)
  user!: Ref<User, string>;

  @Prop({ default: false })
  @Field()
  close!: boolean;

  @Prop({ type: () => Comments })
  @Field((type) => [Comments])
  comments!: Comments[];
}

export default getModelForClass(Blogs);
