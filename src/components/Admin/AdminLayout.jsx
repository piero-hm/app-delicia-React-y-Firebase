import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, List, PlusSquare } from 'lucide-react';

const AdminLayout = () => {
  const activeLinkClass = "bg-pink-100 text-pink-600";
  const defaultLinkClass = "hover:bg-gray-100";

  return (
    <div className="flex">
      <aside className="w-64 bg-white border-r h-screen sticky top-0">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-pink-500">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin/products"
            className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} flex items-center p-2 rounded-md transition-colors`}
          >
            <List className="mr-3" />
            Gestionar Productos
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} flex items-center p-2 rounded-md transition-colors`}
          >
            <PlusSquare className="mr-3" />
            Añadir Producto
          </NavLink>
          <div className="pt-4 mt-4 border-t">
            <NavLink
                to="/"
                className={`${defaultLinkClass} flex items-center p-2 rounded-md transition-colors w-full`}
            >
                <Home className="mr-3" />
                Volver a la Tienda
            </NavLink>
          </div>
        </nav>
      </aside>
      <main className="flex-grow p-8 bg-gray-50">
        <Outlet /> {/* Aquí se renderizarán las páginas anidadas */}
      </main>
    </div>
  );
};

export default AdminLayout;
