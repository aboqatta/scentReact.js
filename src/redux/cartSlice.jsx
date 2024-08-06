import { createSlice } from "@reduxjs/toolkit";

// Helper function to get cart from localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { products: [], totalQuantity: 0, totalPrice: 0 };
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image
        });
      }
      state.totalPrice += newItem.price;
      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);

      saveCartToLocalStorage(state); 
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter(item => item.id !== id);
        state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
        saveCartToLocalStorage(state); 
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalQuantity++;
        state.totalPrice += findItem.price;
        saveCartToLocalStorage(state);
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
        saveCartToLocalStorage(state); 
      }
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
