import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/api/usuarios/logout', {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return <button onClick={handleLogout}>Sair</button>;
};

export default LogoutButton;