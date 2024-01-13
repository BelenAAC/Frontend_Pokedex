import gql from 'graphql-tag';

export const GET_POKEMON = gql`
  query GetPokemon($id: String!) {
    getPokemon(id: $id) {
      id
      nombre
      tipo
      nivel
      puntosSalud
      movimiento
    }
  }
`;