import { gql } from "@apollo/client";

export const REGESTER = gql`
  mutation register($input: RegisterInput!) {
    Register(Inputs: $input) {
      accessToken
      refreshToken
    }
  }
`;
export const LOG_IN = gql`
  mutation Login($input: LoginInputs!) {
    Login(Inputs: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($inputs: PostApplicationRequestInputs!) {
    createPost(Inputs: $inputs) {
      _id
      createdAt
      close
    }
  }
`;

export const SEND_REQUEST = gql`
  mutation sendRequest($inputs: RequestInput!) {
    sendRequest(inputs: $inputs) {
      success
      message
    }
  }
`;

export const TOGGLE_POST_STATUS = gql`
  mutation togglePostStatus($postId: ID!) {
    togglePostStatus(postId: $postId)
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const CHANGE_PROFILE = gql`
  mutation changeprofile($file: Upload!) {
    ChangeProfile(Image: $file)
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($blogId: ID!) {
    deleteBlog(blogId: $blogId)
  }
`;

export const CREAT_BLOG = gql`
  mutation createBlog($inputs: createBlog!) {
    createBlog(Inputs: $inputs) {
      _id
      title
      body
      imageUrl
      user {
        _id
        firstName
        lastName
        profileImage
      }
    }
  }
`;

export const SEND_COMMENT = gql`
  mutation sendComment($user: ID!, $body: String!) {
    sendComment(user: $user, body: $body) {
      _id
      body
      commentOwner {
        firstName
        lastName
        profileImage
      }
    }
  }
`;
