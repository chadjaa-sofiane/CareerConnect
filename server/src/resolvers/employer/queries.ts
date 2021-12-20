import Post from "../../models/postAppReq.model";
import { ArgsType, Int, Ctx, Field, Query, Args, Arg, ID } from "type-graphql";
import { Authorized, Resolver } from "type-graphql";
import Context from "../../interfaces/ContextType";
import { PostApplicationRequest } from "../../models/postAppReq.model";

@ArgsType()
class Option {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

@Resolver()
class employerQueries {
  @Authorized("employer")
  @Query(() => [PostApplicationRequest])
  async getMyPosts(
    @Args() { skip = 0, limit = 10 }: Option,
    @Ctx() ctx: Context
  ) {
    try {
      const { _id } = ctx.payload;
      skip = Math.abs(skip);

      const myPosts = await Post.find({ employer: _id })
        .skip(skip)
        .limit(limit)
        .populate("employer requests.jobSekeer");

      return myPosts;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => [PostApplicationRequest])
  async getPostsByUserId(
    @Args() { skip = 0, limit = 10 }: Option,
    @Arg("id", () => ID) employer: string
  ) {
    try {
      skip = Math.abs(skip);
      const posts = await Post.find({ employer })
        .skip(skip)
        .limit(limit)
        .populate("employer requests.jobSekeer");

      return posts;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default employerQueries;
function populate(arg0: string) {
  throw new Error("Function not implemented.");
}
