import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MASTER } from '../apollo/api/Login_master';
import { LIST_MASTER } from '../apollo/api/List_master';
import { LOGOUT_MASTER } from '../apollo/api/Logout_master';
import { GET_MASTER } from '../apollo/api/get_master';
import { GET_POKEMON } from '../apollo/api/get_pokemon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
}


interface LoginMasterInput {
  correo: string;
  contrasena: string;
}

interface Master {
  id: string;
  nombre: string;
  correo: string;
  idCompanero: string;
}
interface ListPokemonsResponse {
  listPokemons: Pokemon[];
}

interface GetPokemonResponse {
  getPokemon: Pokemon;
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

const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [authenticatedUserId, setAuthenticatedUserId] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);

  const [loginMaster, { data: loginData }] = useMutation(LOGIN_MASTER);
  const { loading: masterListLoading, error: masterListError, data: masterListData } = useQuery(LIST_MASTER, {
    skip: !authenticatedUserId,
  });
  const [logoutMaster] = useMutation(LOGOUT_MASTER);


  const handleLogin = async () => {
    try {
      const response = await loginMaster({
        variables: { loginMasterInput: { correo, contrasena } as LoginMasterInput },
      });

      const token = response.data?.loginMaster?.token;

      if (token) {
        setAuthenticatedUserId(token);
        setSessionStarted(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const getUserIdFromList = (correo: string) => {
    const user = masterListData?.listMasters.find((master: any) => master.correo === correo);
    return user?.id || null;
  };
  const { loading: masterDetailsLoading, error: masterDetailsError, data: masterDetailsData } = useQuery(GET_MASTER, {
    variables: { id: getUserIdFromList(correo) },
    skip: !authenticatedUserId || !sessionStarted,
  });
  
  const [selectedPokemonId, setSelectedPokemonId] = useState<string>('');

  const { loading: pokemonDetailsLoading, error: pokemonDetailsError, data: pokemonDetailsData } = useQuery(GET_POKEMON, {
    variables: { id: masterDetailsData?.getMaster?.idCompanero || '' },
    skip: !masterDetailsData?.getMaster?.idCompanero || !sessionStarted,
  });


  const handleLogout = async () => {
    try {
      const userId = getUserIdFromList(correo);

      if (userId) {
        const response = await logoutMaster({ variables: { id: userId } });
        console.log('Logout:', response.data?.logoutMaster?.mensaje);

        // Actualizar el estado de autenticación
        setSessionStarted(false);
      } else {
        console.error('No se encontró el ID del usuario.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {sessionStarted ? (
        <div>
          <h2>Sesión Iniciada</h2>
          {/* Mostrar información adicional del usuario después del login */}
          <h1>Datos Perfil</h1>
          <p>Usuario autenticado con ID: {authenticatedUserId}</p>
          <p>Usuario PokemonCompañero</p>
           {/* Detalles del usuario */}
           {masterDetailsLoading ? (
            <p>Cargando detalles del usuario...</p>
          ) : masterDetailsError ? (
            <p>Error al cargar detalles del usuario: {masterDetailsError.message}</p>
          ) : (
            <div>
              <p>Nombre del usuario: {masterDetailsData?.getMaster?.nombre}</p>
              <p>Correo del usuario: {masterDetailsData?.getMaster?.correo}</p>
              <p>ID Compañero: {masterDetailsData?.getMaster?.idCompanero}</p>
              <h3>Pokemon Companero</h3>
           {/* Detalles del Pokémon */}
           {pokemonDetailsLoading ? (
                <p>Cargando detalles del Pokémon...</p>
              ) : pokemonDetailsError ? (
                <p>Error al cargar detalles del Pokémon: {pokemonDetailsError.message}</p>
              ) : (
                <Card style={{ maxWidth: '400px' }}>
                  <CardMedia
                    component="img"
                    alt={pokemonDetailsData?.getPokemon?.nombre || ''}
                    height="340"
                    image={nombreToImage[pokemonDetailsData?.getPokemon?.nombre || '']}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {pokemonDetailsData?.getPokemon?.nombre}
                    </Typography>
                    <Typography color="text.secondary">
                      Tipo: {pokemonDetailsData?.getPokemon?.tipo}
                    </Typography>
                    {/* Agrega aquí otros detalles del Pokémon */}
                  </CardContent>
                </Card>
               )}
               </div>
             )}
   


          {/* Botón de logout */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <div>
            <label>Correo:</label>
            <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div>
            <label>Contraseña:</label>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
