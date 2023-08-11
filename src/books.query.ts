import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      title
      id
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation ($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

export { GET_BOOKS, ADD_BOOK };
