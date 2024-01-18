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
//image to pokemon
import abra from '../images/pokemones/abra.png';
import bulbasaur from '../images/pokemones/bulbasaur.png';
import charmander from '../images/pokemones/charmander.png';
import chikorita from '../images/pokemones/chikorita.png';
import cyndaquil from '../images/pokemones/cyndaquil.png';
import ditto from '../images/pokemones/ditto.png';
import evee from '../images/pokemones/evee.png';
import geodude from '../images/pokemones/geodude.png';
import jigglypuff from '../images/pokemones/jigglypuff.png';
import machop from '../images/pokemones/machop.png';
import magikarp from '../images/pokemones/magikarp.png';
import pikachu from '../images/pokemones/pikachu.png';
import porygon from '../images/pokemones/porygon.png';
import squirtle from '../images/pokemones/squirtle.png';
import totodile from '../images/pokemones/totodile.png';

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
// Mapea los nombres de tipo a las imágenes
const nombreToImage: Record<string, string> = {
  'Charmander': charmander,
  'Squirtle': squirtle,
  'Pikachu': pikachu,
  'Abra': abra,
  'Bulbasaur':bulbasaur,
  'Chikorita': chikorita,
  'Cyndaquil': cyndaquil,
  'Ditto': ditto,
  'Eevee': evee,
  'Geodude': geodude,
  'Jigglypuff': jigglypuff,
  'Machop': machop,
  'Magikarp': magikarp,
  'Porygon': porygon,
  'Totodile': totodile,
};

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
      location.reload();
    } catch (error) {
      console.error('Error al eliminar el Pokémon', error);
    }
  };

  // Renderiza la lista de pokémons con la Card y el botón de eliminación
  return (
   <div>
    <h1/>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {pokemons.map(pokemon => (
        <Card key={pokemon.id} sx={{ maxWidth: 345, margin: '16px' }}>
          <CardMedia
            component="img"
            height="340"
            image={nombreToImage[pokemon.nombre]} // Puedes cambiar esto con la lógica para obtener la imagen del Pokémon
            title={pokemon.nombre}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tipo: {pokemon.tipo}
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
    </div>
  );
}

export default PokemonListPage;