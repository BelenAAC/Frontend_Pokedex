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
      <h1>Lista de Types</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {types.map(type => (
          <Card key={type.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea>
              {/* Utiliza la URL de la imagen mapeada según el nombre del tipo */}
              <CardMedia
                component="img"
                height="140"
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