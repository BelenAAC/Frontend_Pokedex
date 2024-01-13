import gql from 'graphql-tag';
export const LIST_TYPES = gql`
query{
    listTypes{
      id
      nombre
      descripcion
    }
  }
`;