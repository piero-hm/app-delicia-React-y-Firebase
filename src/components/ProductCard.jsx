import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { PlusCircle } from 'lucide-react';

/**
 * @param {{product: {id: string, name: string, price: number, imageUrl: string, description: string}}} props
 */
const ProductCard = React.memo(function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1 mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
