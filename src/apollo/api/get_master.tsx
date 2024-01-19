import gql from 'graphql-tag';
// GET_MASTER query
export const GET_MASTER = gql`
 query GetMaster($id: String!) {
    getMaster(id: $id) {
      id
      nombre
      correo
      idCompanero
    }
  }
  `;