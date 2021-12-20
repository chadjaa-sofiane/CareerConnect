import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAll($title: String, $filter: FilterInput!, $limit: Int, $skip: Int) {
    getAllPosts(limit: $limit, skip: $skip, title: $title, filter: $filter) {
      _id
      title
      body
      createdAt
      close
      jobsNeeded {
        job
      }
      employer {
        _id
      }
    }
    getPostsCount(filter: $filter)
  }
`;

export const GET_ONE_POST = gql`
  query getPostById($id: ID!) {
    gePostById(id: $id) {
      _id
      title
      createdAt
      state
      body
      close
      employer {
        firstName
        lastName
        email
        state
        profileImage
        jobFiled
        socialMedia {
          socialMedia
          link
        }
      }
      jobsNeeded {
        job
        description
        workTimeRange {
          start
          finish
        }
        workHours
        number
        salaryRange {
          currency
          amount
        }
      }
      requests {
        _id
        jobSekeer {
          _id
          firstName
          lastName
        }
        createdAt
        body
      }
    }
  }
`;

export const GET_JOB_FIELD = gql`
  query getJobsField($jobField: JobFileds!) {
    getAllJobsField
    jobAccordingField(jobField: $jobField)
  }
`;
export const GET_JOBS = gql`
  query getJobs($jobField: String!) {
    getJobsByJobFieldName(jobField: $jobField)
  }
`;

export const GET_USER_BY_USER_NAME = gql`
  query getUserByName($userName: String!) {
    getUserByName(userName: $userName) {
      _id
      firstName
      lastName
      email
      userType
      profileImage
      jobFiled
      state
      socialMedia {
        link
        socialMedia
      }
      jobSekeer {
        type
        jobs
      }
    }
  }
`;

export const GET_MY_INFO = gql`
  query getMyInfo {
    getMyInfo {
      _id
      userType
      firstName
      lastName
      state
      jobFiled
      profileImage
      description
    }
  }
`;

export const GET_ALL_STATES = gql`
  query {
    getAllStates
  }
`;

export const GET_MY_POSTS = gql`
  query getMyPosts {
    getMyPosts {
      _id
      title
      body
      createdAt
      close
      jobsNeeded {
        job
      }
      employer {
        _id
      }
    }
  }
`;

export const GET_POSTS_BY_USER_ID = gql`
  query getPostsByUserId($id: ID!) {
    getPostsByUserId(id: $id) {
      _id
      title
      body
      createdAt
      close
      jobsNeeded {
        job
      }
      employer {
        _id
      }
    }
  }
`;

export const GET_USERS = gql`
  query getusers($filter: UsersFilter!) {
    getUsers(filter: $filter) {
      _id
      firstName
      lastName
      description
      profileImage
      jobFiled
    }
  }
`;

export const GET_BLOG_ID = gql`
  query getBlogsById($id: ID!, $skip: Int!, $limit: Int!) {
    getBlogsById(id: $id, skip: $skip, limit: $limit) {
      _id
      title
      body
      imageUrl
      createdAt
      user {
        _id
        firstName
        lastName
        profileImage
      }
    }
  }
`;

export const GET_COMMENTS_BY_USER_ID = gql`
  query getCommentByUserId($id: ID!) {
    getCommentsByUserId(id: $id) {
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
