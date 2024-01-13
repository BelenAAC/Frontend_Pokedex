import gql from 'graphql-tag';

  export const DELETE_POKEMON = gql`
    mutation DeletePokemon($id: String!) {
    deletePokemon(id: $id) {
      mensaje
    }
  }
  `;