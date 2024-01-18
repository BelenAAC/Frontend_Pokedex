import gql from 'graphql-tag';

export const CREATE_MASTER = gql`
  mutation CreateMaster($createMasterInput: CreateMasterInput!) {
    createMaster(createMasterInput: $createMasterInput) {
      id
      nombre
      correo
      contrasena
      nivel
      idCompanero
    }
  }
`;