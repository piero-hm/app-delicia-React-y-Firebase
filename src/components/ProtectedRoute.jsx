import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Un componente que renderiza sus hijos solo si el usuario está autenticado.
 * Si no, redirige a la página de login.
 * @param {{children: React.ReactNode}} props
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Muestra un spinner o nada mientras se verifica la autenticación
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
    );
  }

  if (!user) {
    // Redirige al login si no hay usuario
    return <Navigate to="/login" />;
  }

  // Muestra el contenido protegido si el usuario está autenticado
  return children;
};

export default ProtectedRoute;
