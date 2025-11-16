import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
  const { cartState, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartState.items.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }
    if (!user) {
        setError("Debes iniciar sesión para realizar un pedido.");
        return;
    }

    setLoading(true);
    setError(null);

    const order = {
      userId: user.uid,
      createdAt: serverTimestamp(),
      status: 'pending',
      total: cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cartState.items,
      shippingAddress: shippingInfo,
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      clearCart();
      navigate('/dashboard?order=success'); // Redirige al panel con un mensaje
    } catch (err) {
      console.error("Error al crear el pedido:", err);
      setError("Hubo un problema al procesar tu pedido. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Información de Envío</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" name="name" id="name" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
            <input type="text" name="address" id="address" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input type="text" name="city" id="city" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
            <input type="text" name="zipCode" id="zipCode" required onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
          </div>
        </div>
        
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md my-4">{error}</p>}

        <div className="mt-8">
          <button 
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {loading ? 'Procesando...' : 'Realizar Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
