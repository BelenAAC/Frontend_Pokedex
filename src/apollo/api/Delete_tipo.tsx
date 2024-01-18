import gql from 'graphql-tag';

  export const DELETE_TYPE = gql`
    mutation DeleteType($id: String!) {
    deleteType(id: $id) {
      mensaje
    }
  }
  `;