import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * @typedef {object} AuthContextType
 * @property {import('firebase/auth').User | null} user - El objeto de usuario de Firebase o null si no está autenticado.
 * @property {boolean} loading - True si está cargando el estado de autenticación inicial.
 * @property {(email, password) => Promise<void>} signup - Función para registrar un nuevo usuario.
 * @property {(email, password) => Promise<void>} login - Función para iniciar sesión.
 * @property {() => Promise<void>} logout - Función para cerrar sesión.
 */

/**
 * @type {React.Context<AuthContextType | undefined>}
 */
const AuthContext = createContext(undefined);

/**
 * Hook para usar el contexto de autenticación.
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    // Crear un documento en la colección 'users' para el nuevo usuario
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: name,
      role: 'customer', // Asignar rol por defecto
      createdAt: new Date(),
    });
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
