import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($count: Int) {
    allUsers(count: $count) {
      id
      firstName
      lastName
    }
  }
`;
