import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const { items } = cartState;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <ShoppingCart className="mr-4" />
        Tu Carrito de Compras
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl mb-4">Tu carrito está vacío.</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-md"><Minus size={16} /></button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-md"><Plus size={16} /></button>
                </div>
                <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"><Trash2 /></button>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">
            <button onClick={clearCart} className="text-gray-500 hover:text-red-500 font-semibold">
              Vaciar Carrito
            </button>
            <div className="text-right">
              <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
              <Link
                to="/checkout"
                className="mt-4 inline-flex items-center bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
              >
                Proceder al Pago
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
