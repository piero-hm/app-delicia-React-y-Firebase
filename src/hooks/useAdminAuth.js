import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Hook para verificar si el usuario actual es un administrador.
 * @returns {{isAdmin: boolean, loading: boolean}}
 */
export const useAdminAuth = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) {
        // Si la autenticación aún está cargando, esperamos.
        return;
      }

      if (!user) {
        // Si no hay usuario, no es admin.
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Obtenemos el documento del usuario desde Firestore.
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al verificar el rol de administrador:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading]);

  return { isAdmin, loading: authLoading || loading };
};
