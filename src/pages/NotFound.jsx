import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-16 w-16 text-yellow-500" />
      </div>
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Página No Encontrada</h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="inline-block bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
