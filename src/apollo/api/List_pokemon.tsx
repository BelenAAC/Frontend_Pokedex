import gql from 'graphql-tag';
export const LIST_POKEMONS = gql`
  query ListPokemons {
    listPokemons {
      id
      nombre
      tipo
      nivel
      puntosSalud
      movimiento
    }
  }
`;