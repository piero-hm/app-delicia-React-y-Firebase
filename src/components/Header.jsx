import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, User, LogOut, LogIn, CakeSlice } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartState } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const cartItemCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-50 rounded-2xl shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-500 flex items-center">
          <CakeSlice className="mr-2" />
          Delicia
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-pink-500 transition-colors">Inicio</Link>
          <Link to="/products" className="text-gray-600 hover:text-pink-500 transition-colors">Catálogo</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-pink-500 transition-colors">
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-pink-500 transition-colors">
                <User />
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-pink-500 transition-colors">
                <LogOut />
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-pink-500 transition-colors">
              <LogIn />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
