import gql from 'graphql-tag';

export const LOGOUT_MASTER = gql`
  mutation LogoutMaster($id: String!) {
    logoutMaster(id: $id) {
      mensaje
    }
  }
`;
