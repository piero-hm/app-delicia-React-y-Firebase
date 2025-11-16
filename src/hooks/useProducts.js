import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService'; // Importar getProducts

// Datos de ejemplo para fallback
const mockProducts = [
  { id: '1', name: 'Tarta de Chocolate Intenso', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1987&auto=format&fit=crop', description: 'Deliciosa tarta con varias capas de chocolate.' },
  { id: '2', name: 'Croissant de Mantequilla', price: 2.50, imageUrl: 'https://images.unsplash.com/photo-1582219383375-10a07a7352d3?q=80&w=2070&auto=format&fit=crop', description: 'Hojaldrado y tierno, perfecto para el desayuno.' },
  { id: '3', name: 'Macarons Variados (Caja de 6)', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1965&auto=format&fit=crop', description: 'Una selección de nuestros mejores sabores.' },
  { id: '4', name: 'Pan de Masa Madre', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1533087353447-3a8827a21552?q=80&w=2070&auto=format&fit=crop', description: 'Pan rústico de fermentación lenta.' },
];

/**
 * Hook personalizado para obtener los productos de la tienda.
 * Maneja el estado de carga, los errores y los datos de los productos.
 * @returns {{products: Array, loading: boolean, error: string|null}}
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Usar la función del servicio que ya formatea la URL de la imagen
        const productsList = await getProducts();
        
        if (productsList.length > 0) {
            setProducts(productsList);
        } else {
            console.warn("No se encontraron productos en Firebase, usando datos de ejemplo.");
            setProducts(mockProducts);
        }

      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError('No se pudieron cargar los productos. Usando datos de ejemplo.');
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // El hook devuelve el estado que los componentes necesitan
  return { products, loading, error };
};
