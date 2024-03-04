import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      date
      location
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransactionInput!) {
    # NOT: bu alttaki metot adı ve üstteki param. karşısındaki tip backendde belirtilen typeDef ile eşleşmeli.
    updateTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      # altakilerin gelmesine gerek yok id yeter ama biz getirdik örnek için
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
