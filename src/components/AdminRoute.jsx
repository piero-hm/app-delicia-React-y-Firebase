import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

/**
 * Un componente que renderiza sus hijos solo si el usuario es administrador.
 * Si no, redirige a la página de inicio.
 * @param {{children: React.ReactNode}} props
 */
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    // Redirige a la página de inicio si no es admin
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
