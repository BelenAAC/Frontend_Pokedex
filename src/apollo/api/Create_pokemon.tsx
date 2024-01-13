import gql from 'graphql-tag';

export const CREATE_POKEMON = gql`
  mutation CreatePokemon($createPokemonInput: CreatePokemonInput!) {
    createPokemon(createPokemonInput: $createPokemonInput) {
      id
      nombre
      tipo
      nivel
      puntosSalud
      movimiento
    }
  }
`;