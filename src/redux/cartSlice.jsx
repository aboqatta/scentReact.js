import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      // Ensure you handle the full product object correctly
      const product = action.payload;
      const existingItem = state.products.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
          image: product.image
        });
      }

      state.totalPrice += product.price;
      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
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

// Async actions with Axios
export const addToCart = (product) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/addtocart?productId=${product.id}`);
    dispatch(cartSlice.actions.addToCart(product));
  } catch (error) {
    console.error('Failed to add product to cart:', error);
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/removefromcart?productId=${productId}`);
    dispatch(cartSlice.actions.removeFromCart(productId));
  } catch (error) {
    console.error('Failed to remove product from cart:', error);
  }
};

export const increaseQuantity = (productId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/increasequantity?productId=${productId}`);
    dispatch(cartSlice.actions.increaseQuantity(productId));
  } catch (error) {
    console.error('Failed to increase product quantity:', error);
  }
};

export const decreaseQuantity = (productId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/decreasequantity?productId=${productId}`);
    dispatch(cartSlice.actions.decreaseQuantity(productId));
  } catch (error) {
    console.error('Failed to decrease product quantity:', error);
  }
};

export default cartSlice.reducer;
