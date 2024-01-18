import React from 'react';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { LIST_TYPES } from '../apollo/api/List_type';

// Importa las imágenes
import Tipo_agua from '../images/Tipo/Tipo_agua.png';
import Tipo_acero from '../images/Tipo/Tipo_acero.png';
import Tipo_bicho from '../images/Tipo/Tipo_bicho.png';
import Tipo_dragon from '../images/Tipo/Tipo_dragon.png';
import Tipo_electrico from '../images/Tipo/Tipo_electrico.png';
import Tipo_fantasma from '../images/Tipo/Tipo_fantasma.png';
import Tipo_fuego from '../images/Tipo/Tipo_fuego.png';
import Tipo_hada from '../images/Tipo/Tipo_hada.png';
import Tipo_hielo from '../images/Tipo/Tipo_hielo.png';
import Tipo_lucha from '../images/Tipo/Tipo_lucha.png';
import Tipo_normal from '../images/Tipo/Tipo_normal.png';
import Tipo_planta from '../images/Tipo/Tipo_planta.png';
import Tipo_psiquico from '../images/Tipo/Tipo_psiquico.png';
import Tipo_roca from '../images/Tipo/Tipo_roca.png';
import Tipo_siniestro from '../images/Tipo/Tipo_siniestro.png';
import Tipo_tierra from '../images/Tipo/Tipo_tierra.png';
import Tipo_veneno from '../images/Tipo/Tipo_veneno.png';
import Tipo_volador from '../images/Tipo/Tipo_volador.png';

// Define la interfaz para el tipo de datos obtenidos de la consulta GraphQL
interface Type {
  id: string;
  nombre: string;
  descripcion: string;
}

// Define la interfaz para la respuesta de la consulta GraphQL
interface ListTypesResponse {
  listTypes: Type[];
}

// Mapea los nombres de tipo a las imágenes
const nombreToImage: Record<string, string> = {
  'Agua': Tipo_agua,
  'Acero': Tipo_acero,
  'Bicho': Tipo_bicho,
  'Dragon': Tipo_dragon,
  'Electrico': Tipo_electrico,
  'Fantasma': Tipo_fantasma,
  'Fuego': Tipo_fuego,
  'Hada': Tipo_hada,
  'Planta': Tipo_planta,
  'Hielo': Tipo_hielo,
  'Normal': Tipo_normal,
  'Lucha': Tipo_lucha,
  'Psiquico': Tipo_psiquico,
  'Roca': Tipo_roca,
  'Siniestro': Tipo_siniestro,
  'Tierra': Tipo_tierra,
  'Veneno': Tipo_veneno,
  'Volador': Tipo_volador,
};

// Define el componente TypeListPage
function TypeListPage() {
  // Realiza la consulta GraphQL
  const { loading, error, data } = useQuery<ListTypesResponse>(LIST_TYPES);

  // Maneja los estados de carga y error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extrae la lista de tipos desde los datos
  const types = data?.listTypes || [];

  // Renderiza la lista de tipos usando tarjetas de Material-UI
  return (
    <div>
      <h1></h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {types.map(type => (
          <Card key={type.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea>
              {/* Utiliza la URL de la imagen mapeada según el nombre del tipo */}
              <CardMedia
                component="img"
                height="340"
                image={nombreToImage[type.nombre]}
                alt={type.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {type.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {type.descripcion}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TypeListPage;