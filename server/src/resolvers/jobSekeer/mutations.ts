import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import ContextType from "../../interfaces/ContextType";
import { deleteRequestInput, RequestInput, UpdateRequestInput } from "./inputs";
import Post from "../../models/postAppReq.model";
import { Types } from "mongoose";

// function to help our to check if the post and request exist
const findPostAndRequest = async (postId: string, requestId?: string) => {
  if (postId && requestId) {
    return await Post.findOne(
      {
        _id: postId,
        "requests._id": requestId,
      },
      { _id: 1, employer: 1 }
    );
  }
  return await Post.findById(Types.ObjectId(postId), { _id: 1, employer: 1 });
};

@ObjectType()
class Successfuly {
  @Field()
  success?: boolean;

  @Field()
  message?: string;
}

@Resolver()
class JobSekeerMutations {
  @Authorized("jobSekeer")
  @Mutation(() => Successfuly)
  async sendRequest(
    @Arg("inputs") { PostId, body }: RequestInput,
    @Ctx() { payload: { _id } }: ContextType
  ) {
    try {
      const res = await findPostAndRequest(PostId);
      if (!res) {
        throw new Error("post or request not found");
      }
      await Post.findByIdAndUpdate(
        Types.ObjectId(PostId),
        {
          $push: {
            requests: {
              body,
              jobSekeer: _id,
            },
          },
        },
        (error) => {
          if (error) {
            throw new Error(error.massage);
          }
        }
      );
      return {
        success: true,
        message: "you have add new request successfuly",
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Authorized("jobSekeer")
  @Mutation(() => Successfuly)
  async updateRequest(
    @Arg("inputs") { PostId, requestId, body }: UpdateRequestInput,
    @Ctx() { payload: { _id } }: ContextType
  ) {
    try {
      const res = await findPostAndRequest(PostId, requestId);
      if (!res) {
        throw new Error("post or request not found");
      }
      await Post.updateOne(
        {
          _id: PostId,
        },
        {
          $set: {
            "requests.$[elem].body": body,
          },
        },
        {
          arrayFilters: [{ "elem.jobSekeer": _id, "elem._id": requestId }],
        },
        (error) => {
          if (error) {
            throw new Error(error.message);
          }
        }
      );
      return {
        success: true,
        message: "you have add new request successfuly",
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
  @Authorized("jobSekeer", "employer")
  @Mutation(() => Successfuly)
  async deleteRequest(
    @Arg("input") { PostId, requestId }: deleteRequestInput,
    @Ctx() { payload: { _id, userType } }: ContextType
  ) {
    try {
      //check if post and request are exist
      const res = await findPostAndRequest(PostId, requestId);
      if (!res) {
        throw new Error("post or request not found");
      }
      // onec it is exist , we're going to check if the post owner who wanted to delete it
      if (userType == "employer" && res.employer != _id) {
        throw new Error("you dont hava Access to delete this !!! ");
      }
      if (res.employer == _id) {
        await Post.findByIdAndUpdate(
          Types.ObjectId(PostId),
          {
            $pull: {
              requests: {
                _id: requestId,
              },
            },
          },
          (error) => {
            if (error) throw new Error(error.message);
          }
        );
      }
      if (userType == "jobSekeer") {
        const res = await Post.findOne(
          {
            _id: PostId,
            "requests.jobSekeer": _id,
          },
          { _id: 1 }
        );
        if (!res) throw new Error("you are not have an request");
        await Post.findByIdAndUpdate(
          Types.ObjectId(PostId),
          {
            $pull: {
              requests: {
                _id: requestId,
                jobSekeer: _id,
              },
            },
          },
          (error) => {
            if (error) throw new Error(error.message);
          }
        );
      }
      return {
        success: true,
        message: "delete message successfuly",
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default JobSekeerMutations;
