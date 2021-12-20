import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from "type-graphql";
import ContextType from "../../interfaces/ContextType";
import { PostApplicationRequestInputs, UpdatePostInput } from "./inputs";
import Post from "../../models/postAppReq.model";
import { PostApplicationRequest } from "../../models/postAppReq.model";
import { Types } from "mongoose";
import { UserInputError } from "apollo-server-errors";

@Resolver()
class employerMutation {
  @Authorized("employer")
  @Mutation(() => PostApplicationRequest)
  async createPost(
    @Arg("Inputs") Inputs: PostApplicationRequestInputs,
    @Ctx() ctx: ContextType
  ): Promise<PostApplicationRequest> {
    const { _id } = ctx.payload;
    try {
      const newPost = new Post({ employer: Types.ObjectId(_id), ...Inputs });
      await newPost.save();
      return newPost;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  @Authorized("employer")
  @Mutation(() => String)
  async updatePost(
    @Arg("Inputs") Inputs: UpdatePostInput,
    @Ctx() ctx: ContextType
  ): Promise<String> {
    const { _id } = ctx.payload;
    const result = await Post.findById(Types.ObjectId(Inputs.postId), {
      employer: 1,
    });
    if (!result) throw new UserInputError("cannot find post");
    if (result.employer != _id) throw new Error();
    const postId = Types.ObjectId(Inputs.postId);
    delete (Inputs as any).postId;
    try {
      await Post.findByIdAndUpdate(postId, {
        $set: Inputs as any,
      });
      return "update post successfuly";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized("employer")
  @Mutation(() => String, { description: "open and close post" })
  async togglePostStatus(
    @Arg("postId", (type) => ID) postId: string,
    @Ctx() ctx: ContextType
  ) {
    const { _id } = ctx.payload;
    const result = await Post.findById(Types.ObjectId(postId), {
      employer: 1,
      close: 1,
    });
    if (!result) throw new UserInputError("cannot find post");
    if (result.employer != _id) throw new Error();
    try {
      await Post.findByIdAndUpdate(Types.ObjectId(postId), {
        $set: { close: !result.close },
      });
      return `${result.close ? "close" : "open"} Post successfully !!!`;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized("employer")
  @Mutation((type) => String)
  async deletePost(
    @Arg("postId", (type) => ID) postId: string,
    @Ctx() ctx: ContextType
  ) {
    console.log(ctx.payload);
    const { _id } = ctx.payload;
    const result = await Post.findById(Types.ObjectId(postId), {
      employer: 1,
    });
    if (!result) throw new UserInputError("cannot find post");
    if (result.employer != _id) throw new Error();
    try {
      await Post.findByIdAndDelete(Types.ObjectId(postId));
      return "delete post successfully";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default employerMutation;
