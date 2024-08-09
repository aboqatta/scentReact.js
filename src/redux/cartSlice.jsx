import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { products: [], totalQuantity: 0, totalPrice: 0 };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.products.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.products.push({
          ...product,
          quantity: 1,
          totalPrice: product.price
        });
      }
      state.totalPrice += product.price;
      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find(item => item.id === id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter(item => item.id !== id);
        saveCartToLocalStorage(state);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find(item => item.id === id);
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
      const findItem = state.products.find(item => item.id === id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
        saveCartToLocalStorage(state);
      }
    },
    setCart(state, action) {
      return action.payload;
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } = cartSlice.actions;

export const asyncAddToCart = (product) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/addtocart?productId=${product.id}`);
    dispatch(addToCart(product));
  } catch (error) {
    console.error(`Failed to add to cart: ${error.message}`);
  }
};

export const asyncRemoveFromCart = (productId) => async (dispatch) => {
  try {
    await axios.delete(`https://localhost:7256/api/cart/removefromcart?productId=${productId}`);
    dispatch(removeFromCart(productId));
  } catch (error) {
    console.error(`Failed to remove from cart: ${error.message}`);
  }
};

export const asyncIncreaseQuantity = (productId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/increasequantity?productId=${productId}`);
    dispatch(increaseQuantity(productId));
  } catch (error) {
    console.error(`Failed to increase quantity: ${error.message}`);
  }
};

export const asyncDecreaseQuantity = (productId) => async (dispatch) => {
  try {
    await axios.post(`https://localhost:7256/api/cart/decreasequantity?productId=${productId}`);
    dispatch(decreaseQuantity(productId));
  } catch (error) {
    console.error(`Failed to decrease quantity: ${error.message}`);
  }
};

export const asyncSetCart = (cartData) => async (dispatch) => {
  dispatch(setCart(cartData));
};

export default cartSlice.reducer;
