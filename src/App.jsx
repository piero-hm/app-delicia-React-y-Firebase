import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/Admin/AdminLayout';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Private Pages
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';

// Admin Pages
import ProductList from './pages/Admin/ProductList';
import ProductForm from './pages/Admin/ProductForm';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas con Layout Principal */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Rutas Privadas de Cliente */}
        <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Route>

      {/* Rutas de Administración */}
      <Route 
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<ProductList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="add-product" element={<ProductForm />} />
        <Route path="edit-product/:id" element={<ProductForm />} />
      </Route>

      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
