import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts'; // Importamos nuestro hook

const Products = () => {
  // Usamos el hook para obtener todo lo que necesitamos
  const { products, loading, error } = useProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Nuestro Catálogo</h1>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-6">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Skeleton loaders */}
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
