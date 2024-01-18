import gql from 'graphql-tag';

export const CREATE_TYPE = gql`
  mutation CreateType($createTypeInput: CreateTypeInput!) {
    createType(createTypeInput: $createTypeInput) {
      nombre
      descripcion
    }
  }
`;
