import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_POKEMONS } from '../apollo/api/List_pokemon';
import { GET_POKEMON } from '../apollo/api/get_pokemon';
import { LIST_TYPES } from '../apollo/api/List_type';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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
}

interface Type {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
}

interface ListPokemonsResponse {
  listPokemons: Pokemon[];
}

interface GetPokemonResponse {
  getPokemon: Pokemon;
}

interface ListTypesResponse {
  listTypes: Type[];
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


function PokemonDropdown() {
  const { loading: loadingList, error: errorList, data: dataList } = useQuery<ListPokemonsResponse>(LIST_POKEMONS);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string>('');
  const [showTypeDetails, setShowTypeDetails] = useState<boolean>(false);

  const { loading: loadingDetails, error: errorDetails, data: dataDetails } = useQuery<GetPokemonResponse>(GET_POKEMON, {
    variables: { id: selectedPokemonId },
    skip: !selectedPokemonId,
  });

  const { loading: loadingTypes, error: errorTypes, data: dataTypes } = useQuery<ListTypesResponse>(LIST_TYPES);

  const handlePokemonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedPokemonId = event.target.value;
    setSelectedPokemonId(newSelectedPokemonId);
    setShowTypeDetails(false);
  };

  
  const getImageForPokemonType = (pokemonType: string) => {
    return nombreToImage[pokemonType] || '';
  };
  const getDescriptionForPokemonType = (pokemonType: string) => {
    const type = dataTypes?.listTypes.find((type) => type.nombre === pokemonType);
    return type?.descripcion || '';
  };

  const handleShowTypeDetails = () => {
    setShowTypeDetails(true);
  };

  const handleCloseTypeDetails = () => {
    setShowTypeDetails(false);
  };

  return (
    <div>
      <h1>Lista de Pokémons</h1>
      <select onChange={handlePokemonChange} value={selectedPokemonId}>
        <option value="">Selecciona un Pokémon</option>
        {dataList?.listPokemons.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.nombre}
          </option>
        ))}
      </select>

      {selectedPokemonId && (
        <div>
          <h2>Detalles del Pokémon</h2>
          <Card>
            <CardActionArea>
            <CardMedia
                component="img"
                height="340"
                image={getImageForPokemonType(dataDetails?.getPokemon.nombre)}
                alt={dataDetails?.getPokemon.nombre}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {dataDetails?.getPokemon.nombre}
                </Typography>
                <Typography color="textSecondary">
                  Tipo: {dataDetails?.getPokemon.tipo}
                </Typography>
                <Typography color="textSecondary">
                  Nivel: {dataDetails?.getPokemon.nivel}
                </Typography>
                <Typography color="textSecondary">
                  Salud: {dataDetails?.getPokemon.puntosSalud}
                </Typography>
                <Button onClick={handleShowTypeDetails} variant="contained" color="primary">
                  Ver Detalles del Tipo
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Modal para los detalles del tipo */}
          <Dialog open={showTypeDetails} onClose={handleCloseTypeDetails}>
            <DialogTitle>Detalles del Tipo</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Tipo: {dataDetails?.getPokemon.tipo}</Typography>
              <Typography color="textSecondary">
                Descripción: {getDescriptionForPokemonType(dataDetails?.getPokemon.tipo)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseTypeDetails} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default PokemonDropdown;
