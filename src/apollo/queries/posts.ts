import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($id: ID!) {
    Post(id: $id) {
      id
      author {
        id
        firstName
        lastName
      }
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($count: Int) {
    allPosts(count: $count) {
      id
      createdAt
      published
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;

export const GET_POSTS_WITH_AUTHOR = gql`
  query GetPosts($count: Int) {
    allPosts(count: $count) {
      id
      createdAt
      published
      author {
        id
        firstName
        lastName
      }
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;
