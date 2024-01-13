import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LIST_POKEMONS } from '../apollo/api/List_pokemon';
import { DELETE_POKEMON } from '../apollo/api/Delete_pokemon'; // Reemplaza con la ruta correcta
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Pokemon {
  id: string;
  nombre: string;
  tipo: string;
  nivel: number;
  puntosSalud: number;
  movimiento: string;
}

interface ListPokemonsResponse {
  listPokemons: Pokemon[];
}

function PokemonListPage() {
  // Realiza la consulta GraphQL
  const { loading, error, data } = useQuery<ListPokemonsResponse>(LIST_POKEMONS);

  // Importa la mutación de eliminación
  const [deletePokemonMutation] = useMutation(DELETE_POKEMON, {
    refetchQueries: [{ query: LIST_POKEMONS }],
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extrae la lista de pokémons desde los datos
  const pokemons = data?.listPokemons || [];

  // Función para manejar la eliminación del Pokémon
  const handleDeletePokemon = async (id: string) => {
    try {
      await deletePokemonMutation({ variables: { id } });
    } catch (error) {
      console.error('Error al eliminar el Pokémon', error);
    }
  };

  // Renderiza la lista de pokémons con la Card y el botón de eliminación
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {pokemons.map(pokemon => (
        <Card key={pokemon.id} sx={{ maxWidth: 345, margin: '16px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg" // Puedes cambiar esto con la lógica para obtener la imagen del Pokémon
            title={pokemon.nombre}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tipo: {pokemon.tipo}, Nivel: {pokemon.nivel}, Salud: {pokemon.puntosSalud}, Movimiento: {pokemon.movimiento}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleDeletePokemon(pokemon.id)}>
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default PokemonListPage;