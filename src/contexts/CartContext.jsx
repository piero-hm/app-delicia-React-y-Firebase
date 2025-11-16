import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * @typedef {object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {object} CartState
 * @property {Product[]} items
 */

/**
 * @typedef {object} CartContextType
 * @property {CartState} cartState
 * @property {(item: Omit<Product, 'quantity'>) => void} addToCart
 * @property {(itemId: string) => void} removeFromCart
 * @property {() => void} clearCart
 * @property {(itemId: string, quantity: number) => void} updateQuantity
 */

const CartContext = createContext(undefined);

/**
 * Hook para usar el contexto del carrito.
 * @returns {CartContextType}
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ).filter(item => item.quantity > 0), // Elimina si la cantidad es 0
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
        return action.payload;
    default:
      return state;
  }
};

const getInitialState = () => {
    try {
        const localCart = window.localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : { items: [] };
    } catch (error) {
        console.error("Error al leer el carrito del localStorage", error);
        return { items: [] };
    }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    try {
        window.localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
        console.error("Error al guardar el carrito en localStorage", error);
    }
  }, [cartState]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
