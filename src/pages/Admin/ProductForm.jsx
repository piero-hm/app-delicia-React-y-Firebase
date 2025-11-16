import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProducts } from '../../services/productService';
import { db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imagen: '', // Campo para el nombre del archivo de imagen
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, 'products', id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const data = productSnap.data();
            setProduct({
              name: data.name || '',
              description: data.description || '',
              price: data.price || '',
              stock: data.stock || '',
              imagen: data.imagen || '', // Cargar el nombre del archivo
            });
            // Construir la URL para la previsualización
            if (data.imagen) {
              setImageUrl(`/img/${data.imagen}`);
            }
          } else {
            setError('El producto no existe.');
          }
        } catch (err) {
          setError('Error al cargar el producto.');
          console.error(err);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));

    // Actualizar previsualización de imagen en tiempo real
    if (name === 'imagen') {
      setImageUrl(value ? `/img/${value}` : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      };

      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }
      navigate('/admin/products');
    } catch (err) {
      setError('Ocurrió un error al guardar el producto.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        {isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos de texto para nombre, descripción, etc. */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="description" value={product.description} onChange={handleChange} rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} required min="0" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
        </div>
        
        {/* Campo de texto para el nombre del archivo de la imagen */}
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Nombre del Archivo de Imagen</label>
          <input 
            type="text" 
            name="imagen" 
            value={product.imagen} 
            onChange={handleChange} 
            placeholder="ej: torta-chocolate.jpg"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Previsualización de la imagen */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Previsualización</label>
            <div className="mt-1 flex items-center space-x-4 h-24">
                {imageUrl ? (
                  <img src={imageUrl} alt="Previsualización" className="w-24 h-24 object-cover rounded-md" />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
            </div>
        </div>
        
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-center">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-400">
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
