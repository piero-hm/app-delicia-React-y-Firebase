import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center">
      <div 
        className="bg-pink-100 rounded-lg p-12 mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1964&auto=format&fit=crop')" }}
      >
        <div className="bg-white bg-opacity-70 rounded-lg p-8">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Bienvenido a <span className="text-pink-500">Delicia</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
            La pastelería artesanal que endulza tus momentos.
            </p>
            <Link
            to="/products"
            className="inline-flex items-center bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg"
            >
            Ver nuestro catálogo
            <ArrowRight className="ml-2" />
            </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2 text-pink-500">Ingredientes Frescos</h3>
          <p className="text-gray-600">Usamos solo los mejores ingredientes, seleccionados cada día para garantizar la máxima calidad y sabor.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2 text-pink-500">Hecho con Amor</h3>
          <p className="text-gray-600">Cada pastel, galleta y pan es horneado con dedicación y pasión por nuestros maestros pasteleros.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2 text-pink-500">Entrega a Domicilio</h3>
          <p className="text-gray-600">Disfruta de nuestros productos sin salir de casa. Haz tu pedido en línea y te lo llevamos.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
