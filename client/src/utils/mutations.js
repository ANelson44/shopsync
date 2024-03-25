import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const GET_LISTS = gql`
  query GetLists {
    lists {
      _id
      title
      items {
        _id
        name
      }
    }
  }
`;

export const ADD_LIST = gql`
  mutation AddList($name: String!) {
    addList(name: $name) {
      _id
      title
      items {
        _id
        name
      }
    }
  }
`;

export const ADD_ITEM_TO_LIST = gql`
  mutation AddItemToList($listId: ID!, $itemName: String!) {
    addItemToList(listId: $listId, itemName: $itemName) {
      _id
      title
      items {
        _id
        name
      }
    }
  }
`;

export const DELETE_ITEM_FROM_LIST = gql`
  mutation DeleteItemFromList($listId: ID!, $itemId: ID!) {
    deleteItemFromList(listId: $listId, itemId: $itemId) {
      _id
      items {
        _id
        name
      }
    }
  }
`;

export const UPDATE_LIST_NAME = gql`
  mutation UpdateListName($listId: ID!, $newName: String!) {
    updateListName(listId: $listId, newName: $newName) {
      _id
      title
    }
  }
`;
