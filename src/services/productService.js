import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

/**
 * Obtiene todos los productos de Firestore.
 * Construye la URL de la imagen localmente.
 * @returns {Promise<Array>} - Un array con todos los productos.
 */
export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    // Si el producto tiene un nombre de archivo de imagen, construye la ruta local.
    // Los componentes usarán 'imageUrl' para mostrar la imagen.
    const imageUrl = data.imagen ? `/img/${data.imagen}` : null;
    
    return { 
      id: doc.id, 
      ...data,
      imageUrl // Añade o sobreescribe la propiedad imageUrl
    };
  });
};

/**
 * Crea un nuevo producto en Firestore.
 * El productData ya debe incluir el nombre del archivo de la imagen.
 * @param {object} productData - Los datos del producto (ej: { nombre, precio, imagen: 'nombre.jpg' }).
 */
export const createProduct = async (productData) => {
  // El 'productData' ya debe contener el campo 'imagen' con el nombre del archivo.
  return addDoc(productsCollection, productData);
};

/**
 * Actualiza un producto existente en Firestore.
 * @param {string} id - El ID del documento del producto.
 * @param {object} updatedData - Los datos a actualizar.
 */
export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, 'products', id);
  // 'updatedData' puede contener el campo 'imagen' con un nuevo nombre de archivo.
  return updateDoc(productRef, updatedData);
};

/**
 * Elimina un producto de Firestore.
 * @param {string} id - El ID del documento del producto a eliminar.
 */
export const deleteProduct = (id) => {
  const productRef = doc(db, 'products', id);
  return deleteDoc(productRef);
};
