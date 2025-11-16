import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Package, User } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const orderSuccess = new URLSearchParams(location.search).get('order') === 'success';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(), // Convertir Timestamp a Date
        }));
        setOrders(userOrders);
      } catch (err) {
        console.error("Error al obtener los pedidos:", err);
        setError("No se pudieron cargar tus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="mr-3" />
        Panel de Cliente
      </h1>
      <p className="text-gray-600 mb-8">Hola, <span className="font-bold">{user?.email}</span>. Aquí puedes ver tus pedidos.</p>

      {orderSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p className="font-bold">¡Pedido realizado con éxito!</p>
          <p>Gracias por tu compra. Recibirás una confirmación por correo pronto.</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-6 flex items-center">
        <Package className="mr-3" />
        Mis Pedidos
      </h2>

      {loading && <p>Cargando pedidos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p>Aún no has realizado ningún pedido.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">Pedido #{order.id.substring(0, 7)}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-pink-500">${order.total.toFixed(2)}</p>
                </div>
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold mb-2">Artículos:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {order.items.map(item => (
                      <li key={item.productId}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
