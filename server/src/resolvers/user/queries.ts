import { Types } from "mongoose";
import {
  Authorized,
  Resolver,
  Query,
  Ctx,
  ArgsType,
  Field,
  Int,
  Args,
  Arg,
  ID,
  registerEnumType,
} from "type-graphql";
import { User, default as userModel } from "../../models/user.model";
import { PostApplicationRequest } from "../../models/postAppReq.model";
import BlogsModel, { Blogs } from "../../models/Blog.model";
import Post from "../../models/postAppReq.model";
import { FilterInput, UsersFilter } from "./inputs";
import { getNewAccessToken } from "../../lib/token";
import Context from "../../interfaces/ContextType";
import { jobAccordingField, JobFileds, States } from "../../enums";
import {
  getPostsInputFilter,
  getUsersInputFilter,
} from "../../lib/inputsFilters";
import CommentModel, { Comment } from "../../models/comment.model";

registerEnumType(JobFileds, { name: "JobFileds" });

@ArgsType()
class input {
  @Field(() => JobFileds)
  jobField!: JobFileds;
}
@ArgsType()
class Option {
  @Field({ nullable: true })
  title?: string;

  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

@ArgsType()
class UserOptions {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}

// I will work to make it cleanner later
// you can say that is version one of filter

@Resolver()
class userQueries {
  @Query(() => [PostApplicationRequest])
  async getAllPosts(
    @Args() { title = "", skip = 0, limit = 10 }: Option,
    @Arg("filter") filter: FilterInput = {}
  ) {
    try {
      (title as unknown as RegExp) = new RegExp(title.trim());
      const input: any = getPostsInputFilter(title, filter);
      skip = Math.abs(skip);
      const posts = await Post.find(input)
        .skip(skip)
        .limit(limit)
        .populate("employer requests.jobSekeer");
      return posts;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => Number)
  async getPostsCount(
    @Args() { title = "" }: Option,
    @Arg("filter") filter: FilterInput = {}
  ) {
    try {
      (title as unknown as RegExp) = new RegExp(title);
      const input: any = getPostsInputFilter(title, filter);
      const count = await Post.count(input);
      return count;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => PostApplicationRequest)
  async gePostById(@Arg("id", () => ID) id: string) {
    try {
      const post = await Post.findById(Types.ObjectId(id)).populate(
        "employer requests.jobSekeer"
      );
      return post;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized()
  @Query(() => User)
  async getMyInfo(@Ctx() ctx: Context) {
    const { _id } = ctx.payload;
    try {
      return await userModel.findById(Types.ObjectId(_id));
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => [User])
  async getUsers(
    @Args() { skip = 0, limit = 10 }: UserOptions,
    @Arg("filter") filter: UsersFilter = {}
  ) {
    try {
      const input: any = getUsersInputFilter(filter);
      skip = Math.abs(skip);
      return await userModel
        .find(input)
        .skip(skip)
        .limit(limit)
        .populate("dealWith.userId");
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => User)
  async getUserById(@Arg("id", () => ID) userId: string) {
    try {
      return userModel
        .findById(Types.ObjectId(userId))
        .populate("dealWith.userId");
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => User)
  async getUserByName(@Arg("userName") userName: string) {
    try {
      (userName as unknown as string[]) = userName.split("_");
      const firstName: string = userName[0] || "";
      const lastName: string = userName[1] || "";
      return await userModel
        .findOne({ firstName, lastName })
        .populate("dealWith.userId");
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => String)
  async refreshToken(@Arg("refreshToken") refreshToken: string) {
    try {
      return getNewAccessToken(refreshToken);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  // get values to fit it in inputs
  @Query((type) => [String])
  async getAllStates() {
    return Object.keys(States).sort();
  }
  @Query((type) => [String])
  async getAllJobsField() {
    return Object.keys(JobFileds).sort();
  }
  @Query((type) => [String])
  async jobAccordingField(@Args() { jobField }: input) {
    return jobAccordingField[jobField];
  }
  @Query((type) => [String])
  async getJobsByJobFieldName(@Arg("jobField") jobField: string) {
    return jobAccordingField[jobField];
  }
  @Query((type) => [Blogs])
  async getBlogsById(
    @Args() { limit = 10, skip = 0 }: UserOptions,
    @Arg("id", (type) => ID) id: string
  ) {
    try {
      skip = Math.abs(skip);
      const blogs = BlogsModel.find({ user: id })
        .limit(limit)
        .skip(skip)
        .populate("user");

      return blogs;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Query(() => [Comment])
  async getCommentsByUserId(
    @Args() { limit = 10, skip = 0 }: UserOptions,
    @Arg("id", () => ID) User: string
  ) {
    try {
      skip = Math.abs(skip);
      const comments = await CommentModel.find({ User })
        .skip(skip)
        .limit(limit)
        .populate("User commentOwner");

      return comments;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default userQueries;
