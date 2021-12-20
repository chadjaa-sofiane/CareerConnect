import { UserInputError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { createTokens } from "../../lib/token";
import { createBlog, LoginInputs, RegisterInput } from "./inputs";
import UserModel, { User } from "../../models/user.model";
import BlogModel, { Blogs } from "../../models/Blog.model";
import CommentModel, { Comment } from "../../models/comment.model";
import { hash, verify } from "argon2";
import ContextType from "../../interfaces/ContextType";
import { addFile, imagePaths, deleteFile } from "../../lib/files";
import { Types } from "mongoose";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@ObjectType()
class TokenFileds {
  @Field({ nullable: false })
  accessToken!: string;

  @Field({ nullable: false })
  refreshToken!: string;

  @Field()
  userType!: string;
}

@Resolver()
class userMutations {
  @Mutation(() => TokenFileds)
  async Register(@Arg("Inputs") Inputs: RegisterInput) {
    const { firstName, lastName, employer, jobSekeer, userType, phone } =
      Inputs;

    // the user name already exist
    const checkUserNameExist = await UserModel.findOne(
      { firstName, lastName },
      { _id: 1 }
    );
    if (checkUserNameExist) {
      throw new UserInputError("user name already exist", {
        errors: {
          userName: " you should change first or last name  ",
        },
      });
    }

    //employer cannot be employer and jobSekeer in the same time
    if (isNaN(Number(phone.number))) {
      throw new UserInputError("phone most be a number", {
        errors: {
          phone: "phone number most be a valide number",
        },
      });
    }
    if (employer && jobSekeer) {
      throw new UserInputError("user Input Error", {
        errors: {
          message: "user cannot be employer and jobSekeer in the smae time ",
        },
      });
    }
    if (
      (jobSekeer && userType == "employer") ||
      (employer && userType == "jobSekeer")
    ) {
      throw new UserInputError("user Input Error", {
        errors: {
          userType: "Inputs do not match with userType !!! ",
        },
      });
    }
    if (
      (userType == "employer" && !employer) ||
      (userType == "jobSekeer" && !jobSekeer)
    ) {
      throw new UserInputError("there are no enough data");
    }
    const hashPassowrd = await hash(Inputs.password).catch((e) => {
      throw new Error();
    });
    //add new user
    const newUser = new UserModel({ ...Inputs, password: hashPassowrd });
    const res = await newUser.save();

    //prepare tokens
    const [accessToken, refreshToken] = createTokens({
      _id: res._id,
      userType: Inputs.userType,
    });
    //sned accessToken and refreshToken to the client
    return {
      userType: Inputs.userType,
      accessToken,
      refreshToken,
    };
  }
  @Mutation(() => TokenFileds)
  async Login(@Arg("Inputs") Inputs: LoginInputs) {
    const { email, password } = Inputs;
    const res = await UserModel.findOne({ email });
    if (!res) {
      throw new UserInputError("email doe's not exist !!", {
        errors: { email: "email doe's not exist " },
      });
    }
    if (!(await verify(res.password!, password))) {
      throw new UserInputError("incorrect password !!", {
        errors: { password: "incorrect password !!" },
      });
    }
    const [accessToken, refreshToken] = createTokens({
      _id: res._id,
      userType: res.userType,
    });
    //send tokens and refreshToken to the client
    return {
      userType: res.userType,
      accessToken,
      refreshToken,
    };
  }
  @Authorized()
  @Mutation(() => Blogs)
  async createBlog(@Ctx() ctx: ContextType, @Arg("Inputs") inputs: createBlog) {
    const { Image, body, title } = inputs;
    const imageUrl = await addFile(imagePaths.BLOGS, await Image);

    try {
      const { _id: user } = ctx.payload;
      const _id: any = Types.ObjectId();
      const newBlogData = {
        _id,
        title,
        body,
        user,
        imageUrl,
        close: false,
      };
      await BlogModel.insertMany(newBlogData);
      const res = await BlogModel.findById(Types.ObjectId(_id)).populate(
        "user"
      );
      return res;
    } catch (e: any) {
      deleteFile(imageUrl);
      throw new Error(e);
    }
  }
  @Authorized()
  @Mutation((type) => String)
  async ChangeProfile(
    @Ctx() ctx: ContextType,
    @Arg("Image", () => GraphQLUpload) Image: FileUpload
  ) {
    try {
      const { _id } = ctx.payload;

      const res = await UserModel.findById(Types.ObjectId(_id), {
        _id: 1,
        profileImage: 1,
      });

      if (!res) throw new UserInputError("there is no user");
      if (res.profileImage) {
        deleteFile(res.profileImage);
      }

      const profileImage = await addFile(imagePaths.PROFILE, await Image);

      await UserModel.findByIdAndUpdate(Types.ObjectId(_id), { profileImage });
      return profileImage;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized()
  @Mutation((type) => String)
  async ChangeDescription(
    @Ctx() ctx: ContextType,
    @Arg("description") description: string
  ) {
    try {
      const { _id } = ctx.payload;
      await UserModel.findByIdAndUpdate(Types.ObjectId(_id), { description });
      return description;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized()
  @Mutation((type) => Boolean)
  async deleteAccount(@Ctx() ctx: ContextType) {
    try {
      const { _id } = ctx.payload;
      await UserModel.findByIdAndDelete(Types.ObjectId(_id));
      return true;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized()
  @Mutation(() => Boolean)
  async deleteBlog(
    @Ctx() ctx: ContextType,
    @Arg("blogId", (type) => ID) blogID: string
  ) {
    try {
      const { _id } = ctx.payload;
      const res = await BlogModel.findById(Types.ObjectId(blogID));
      if (!res) throw new UserInputError("blog deosn't exist ");
      if (res.user !== _id)
        throw new UserInputError("you not allowed to delete this plog");
      deleteFile(res.imageUrl);
      await BlogModel.findByIdAndDelete(Types.ObjectId(blogID));
      return true;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  @Authorized()
  @Mutation(() => Comment)
  async sendComment(
    @Ctx() ctx: ContextType,
    @Arg("body") body: string,
    @Arg("user", (type) => ID) User: string
  ) {
    try {
      const { _id: commentOwner } = ctx.payload;
      if (commentOwner == User)
        throw new UserInputError("you can not send comment to your self");
      const checkUser = await UserModel.findById(Types.ObjectId(User), {
        _id: 0,
      });
      if (!checkUser) throw new UserInputError("this user doe's not exist");

      const _id: any = Types.ObjectId();
      await CommentModel.insertMany({ _id, User, commentOwner, body });

      const res = await CommentModel.findById(Types.ObjectId(_id)).populate(
        "User commentOwner"
      );

      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default userMutations;
