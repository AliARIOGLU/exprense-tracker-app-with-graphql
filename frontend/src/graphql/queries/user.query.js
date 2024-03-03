import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    # bu authUser backenddeki resolver içindeki queryler ile eşleşmeli ve içinde dönmesini istediğim fieldlar veriliyor.
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;
