import { UserInputError } from "apollo-server-errors";
import { createWriteStream, unlinkSync, unlink } from "fs";
import { FileUpload } from "graphql-upload";
import path from "path";

const mimetypes = ["image/png", "image/jpeg", "image/jpg"];

export enum imagePaths {
  BLOGS = "blogs",
  PROFILE = "profiles",
}

export const addFile = async (
  imagePath: imagePaths,
  File: FileUpload
): Promise<string> => {
  // check if the file is an image
  if (!mimetypes.includes(File.mimetype))
    throw new UserInputError("the file is not an image !!", {
      errors: { file: "file type should be png, jpg, jpeg " },
    });

  const stream = File.createReadStream();
  const Time: Date = new Date();
  const filename = File.filename.split(".")[0];
  const filetype = File.mimetype.split("/")[1];
  const filepath = `${imagePath}/${filename}_${Time.getTime()}.${filetype}`;
  const pathname = path.join(__dirname, `../public/images/${filepath}`);

  try {
    await stream.pipe(createWriteStream(pathname));
  } catch (e: any) {
    throw new Error(e);
  }
  return filepath;
};

export const deleteFile = (filepath: string) => {
  const pathname = path.join(__dirname, `../public/images/${filepath}`);
  unlinkSync(pathname);
};
