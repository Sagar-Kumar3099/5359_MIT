import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth(); 
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchCart = async () => {
        const db = getDatabase();
        const cartRef = ref(db, `carts/${currentUser.uid}`);
        const snapshot = await get(cartRef);
        if (snapshot.exists()) {
          setCart(snapshot.val());
        } else {
          setCart([]);
        }
      };

      fetchCart();
    } else {
      setCart([]); 
    }
  }, [currentUser]);

  const addToCart = (product) => {
    if (!currentUser) {
        return;
      }
    
      
      const productExists = cart.some((item) => item.id === product.id);
      if (productExists) {
        console.log("Product is already in the cart."); 
        return; 
      }
    
    
      const db = getDatabase();
      const cartRef = ref(db, `carts/${currentUser.uid}`);
      const newCart = [...cart, product];
    
      set(cartRef, newCart)
        .then(() => {
          setCart(newCart); 
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        }); 
  };

  const removeFromCart = (productId) => {
    if (!currentUser) {
      return; 
    }
    const newCart = cart.filter((product) => product.id !== productId);
    const db = getDatabase();
    const cartRef = ref(db, `carts/${currentUser.uid}`);
    set(cartRef, newCart); 
    setCart(newCart); 
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (!currentUser) {
      return; 
    }

    const newCart = cart.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );

    const db = getDatabase();
    const cartRef = ref(db, `carts/${currentUser.uid}`);
    set(cartRef, newCart) 
      .then(() => {
        setCart(newCart); 
      })
      .catch((error) => {
        console.error('Error updating cart quantity:', error);
      });
  };

  
  const emptyCart = () => {
    if (!currentUser) {
      return; 
    }
    
    const db = getDatabase();
    const cartRef = ref(db, `carts/${currentUser.uid}`);
    set(cartRef, []); 
    setCart([]); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
