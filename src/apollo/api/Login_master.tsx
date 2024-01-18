import gql from 'graphql-tag';

export const LOGIN_MASTER = gql`
  mutation LoginMaster($loginMasterInput: LoginMasterInput!) {
    loginMaster(loginMasterInput: $loginMasterInput) {
      token
    }
  }
`;