import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POKEMON } from '../apollo/api/Create_pokemon'

function PokemonCreationPage() {
  const [pokemonData, setPokemonData] = useState({
    nombre: '',
    tipo: '',
    nivel: '',
    puntosSalud: '',
    movimiento: '',
  });

  const [createPokemon] = useMutation(CREATE_POKEMON);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createPokemon({
        variables: { createPokemonInput: pokemonData },
      });

      console.log('Pokemon creado:', data.createPokemon);
    } catch (error) {
      console.error('Error al crear el Pokémon:', error);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Pokémon</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={pokemonData.nombre} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Tipo:
          <input type="text" name="tipo" value={pokemonData.tipo} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Nivel:
          <input type="text" name="nivel" value={pokemonData.nivel} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Puntos de Salud:
          <input type="text" name="puntosSalud" value={pokemonData.puntosSalud} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Movimiento:
          <input type="text" name="movimiento" value={pokemonData.movimiento} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Crear Pokémon</button>
      </form>
    </div>
  );
}

export default PokemonCreationPage;