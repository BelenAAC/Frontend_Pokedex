import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const LIST_POKEMONS = gql`
  query ListPokemons {
    listPokemons {
      id
      nombre
    }
  }
`;

const CREATE_MASTER = gql`
  mutation CreateMaster($createMasterInput: CreateMasterInput!) {
    createMaster(createMasterInput: $createMasterInput) {
      id
      nombre
    }
  }
`;

const PokemonListAndMasterCreation: React.FC = () => {
  const { loading, error, data } = useQuery(LIST_POKEMONS);
  const [createMaster] = useMutation(CREATE_MASTER);

  const [formValues, setFormValues] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    nivel: '1',
    idCompanero: '',
  });

  const [message, setMessage] = useState('');

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data: createMasterData } = await createMaster({
        variables: {
          createMasterInput: {
            ...formValues,
          },
        },
      });

      setMessage(`Master creado con éxito. ID: ${createMasterData.createMaster.id}`);
    } catch (error) {
      setMessage(`Error al crear el Master: ${error.message}`);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemons = data?.listPokemons || [];

  return (
    <div>
      <h1>Listado de Pokémon y Creación de Master</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formValues.nombre} onChange={handleFormChange} required />
        </label>
        <br />
        <label>
          Correo:
          <input type="email" name="correo" value={formValues.correo} onChange={handleFormChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="contrasena" value={formValues.contrasena} onChange={handleFormChange} required />
        </label>
        <br />
        <label>
          Nivel:
          <select name="nivel" value={formValues.nivel} onChange={handleFormChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Agregar más niveles según sea necesario */}
          </select>
        </label>
        <br />
        <label>
          Compañero Pokémon:
          <select name="idCompanero" value={formValues.idCompanero} onChange={handleFormChange} required>
            <option value="">Selecciona un Pokémon</option>
            {pokemons.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Crear Master  </button>
      </form>
    </div>
  );
};

export default PokemonListAndMasterCreation;