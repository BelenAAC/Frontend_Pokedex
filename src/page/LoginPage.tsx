// LoginPage.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MASTER } from '../apollo/api/Login_master'; // Ajusta la ruta a tu archivo de mutaciones

interface LoginMasterInput {
  correo: string;
  contrasena: string;
}

const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [loginMaster, { data }] = useMutation(LOGIN_MASTER);

  const handleLogin = async () => {
    try {
      const response = await loginMaster({
        variables: { loginMasterInput: { correo, contrasena } as LoginMasterInput },
      });

      const token = response.data?.loginMaster?.token;
      console.log('Token:', token);
      // Aquí podrías almacenar el token en el estado global, local storage, etc.
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
  );
};

export default LoginPage;
