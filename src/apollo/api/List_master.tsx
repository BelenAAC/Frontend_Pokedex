import gql from 'graphql-tag';
export const LIST_MASTER = gql`
  query ListMasters{
    listMasters {
      id
      nombre
      correo 
      nivel
    idCompanero
    }
  }
`;