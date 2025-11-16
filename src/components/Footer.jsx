import React from 'react';
import { CakeSlice } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        <div className="flex justify-center items-center mb-2">
          <CakeSlice className="mr-2 text-pink-500" />
          <p className="font-bold text-lg">Delicia Pastelería</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <p className="text-sm text-gray-400 mt-2">Un mini proyecto de demostración con React y Firebase</p>
      </div>
    </footer>
  );
};

export default Footer;
