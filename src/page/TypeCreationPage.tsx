import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TYPE } from '../apollo/api/Create_type'; // Asegúrate de importar la mutación correcta

function TypeCreationPage() {
  const [typeData, setTypeData] = useState({
    nombre: '',
    descripcion: '',
  });

  const [createType] = useMutation(CREATE_TYPE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTypeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createType({
        variables: { createTypeInput: typeData },
      });

      console.log('Tipo de Pokémon creado:', data.createType);

      // Recargar la página solo después de una creación exitosa
      location.reload();
    } catch (error) {
      console.error('Error al crear el tipo de Pokémon:', error);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Tipo de Pokémon</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={typeData.nombre} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={typeData.descripcion} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">
          Crear Tipo de Pokémon
        </button>
      </form>
    </div>
  );
}

export default TypeCreationPage;
