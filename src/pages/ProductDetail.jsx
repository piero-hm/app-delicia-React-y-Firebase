import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../contexts/CartContext';
import { PlusCircle } from 'lucide-react';

// Datos de ejemplo por si no hay conexión a Firebase o el producto no se encuentra
const mockProducts = [
    { id: '1', name: 'Tarta de Chocolate Intenso', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1987&auto=format&fit=crop', description: 'Deliciosa tarta con varias capas de bizcocho de chocolate, relleno de ganache y cubierta con una capa brillante de chocolate puro. Perfecta para celebraciones.' },
    { id: '2', name: 'Croissant de Mantequilla', price: 2.50, imageUrl: 'https://images.unsplash.com/photo-1582219383375-10a07a7352d3?q=80&w=2070&auto=format&fit=crop', description: 'Nuestro croissant clásico, hojaldrado y tierno, hecho con mantequilla de alta calidad. Ideal para el desayuno o la merienda.' },
    { id: '3', name: 'Macarons Variados (Caja de 6)', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1965&auto=format&fit=crop', description: 'Una selección de 6 macarons con nuestros sabores más populares: frambuesa, pistacho, chocolate, vainilla, limón y caramelo salado.' },
    { id: '4', name: 'Pan de Masa Madre', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1533087353447-3a8827a21552?q=80&w=2070&auto=format&fit=crop', description: 'Pan rústico de fermentación lenta con una corteza crujiente y una miga suave y alveolada. Elaborado con harinas orgánicas.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          // Construir la URL local si existe el campo 'imagen'
          const imageUrl = data.imagen ? `/img/${data.imagen}` : data.imageUrl;
          setProduct({ id: productSnap.id, ...data, imageUrl });
        } else {
          setError('Producto no encontrado.');
          console.warn(`Producto con id '${id}' no encontrado en Firebase, intentando fallback a datos de ejemplo.`);
          const mockProduct = mockProducts.find(p => p.id === id);
          if (mockProduct) {
            setProduct(mockProduct);
          }
        }

      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError('No se pudo cargar el producto.');
        const mockProduct = mockProducts.find(p => p.id === id);
        setProduct(mockProduct); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
    );
  }

  if (error || !product) {
    return <div className="text-center text-red-500 text-xl">{error || 'El producto no existe.'}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-auto rounded-lg object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-light text-pink-500 mb-6">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            <PlusCircle className="mr-2" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
