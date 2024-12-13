import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Chama o endpoint de logout no backend
      await axios.get('http://localhost:8080/api/usuarios/logout', {
        withCredentials: true,
      });

      // Remove cookies manualmente se necessário (opcional)
      document.cookie = "nomeDoCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redireciona para a página de login
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return <button onClick={handleLogout}>Sair</button>;
};

export default LogoutButton;
