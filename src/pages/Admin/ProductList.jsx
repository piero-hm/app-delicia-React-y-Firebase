import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsList = await getProducts();
      setProducts(productsList);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(id);
        // Volver a cargar los productos después de eliminar
        fetchProducts();
      } catch (err) {
        alert('Error al eliminar el producto.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestionar Productos</h1>
        <Link
          to="/admin/add-product"
          className="inline-flex items-center bg-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
        >
          <PlusCircle className="mr-2" />
          Añadir Producto
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Imagen</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Precio</th>
              <th className="py-2 px-4 border-b text-left">Stock</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">
                  <img src={product.imageUrl || 'https://via.placeholder.com/50'} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="py-2 px-4 border-b font-medium">{product.name}</td>
                <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <Link to={`/admin/edit-product/${product.id}`} className="text-blue-500 hover:text-blue-700 p-2">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
