import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  # bunlar backend tarafındaki mutation altındaki tanımladığımız imzalar diyebilirim mutation keywordü verilmek zorunda (typeDef içinde)
  mutation SignUp($input: SignupInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
